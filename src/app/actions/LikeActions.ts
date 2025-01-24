"use server";

import { prisma } from "@/lib/prisma";
import { AuthUserId } from "./authActions";
import { pusherServer } from "@/lib/pusher";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
  try {
    const userId = await AuthUserId();

    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
    } else {
      const like = await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId,
        },
        select: {
          sourceMember: {
            select: {
              name: true,
              image: true,
              userId: true,
            },
          },
        },
      });
      await pusherServer.trigger(`private-${targetUserId}`, "like:new", {
        name: like.sourceMember.name,
        image: like.sourceMember.image,
        userId: like.sourceMember.userId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchCurrtenUserLikeId() {
  try {
    const userId = await AuthUserId();

    const LikeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });
    return LikeIds.map((Like) => Like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchLikedMembers(type = "source") {
  try {
    const userId = await AuthUserId();

    switch (type) {
      case "source":
        return await fetchSourceLikes(userId);
      case "target":
        return await fetchTargetLikes(userId);
      case "mutual":
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchSourceLikes(userId: string) {
  const sourceList = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetMember: true },
  });
  return sourceList.map((x) => x.targetMember);
}

async function fetchTargetLikes(userId: string) {
  const targetList = await prisma.like.findMany({
    where: { targetUserId: userId },
    select: { sourceMember: true },
  });
  return targetList.map((x) => x.sourceMember);
}

async function fetchMutualLikes(userId: string) {
  const likedUsers = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });
  const likedIds = likedUsers.map((x) => x.targetUserId);

  const mutualList = await prisma.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: { sourceMember: true },
  });
  return mutualList.map((x) => x.sourceMember);
}
