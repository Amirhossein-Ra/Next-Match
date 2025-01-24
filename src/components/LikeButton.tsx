"use client";
import { toggleLikeMember } from "@/app/actions/LikeActions";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  targetId: string;
  hasLiked: boolean;
};

export default function LikeButton({ targetId, hasLiked }: Props) {
  const router = useRouter();

  async function toggleLike() {
    await toggleLikeMember(targetId, hasLiked);
    router.refresh();
  }

  return (
    <div
      onClick={toggleLike}
      className="relative hover:opacity-80 transition cursor-pointer top-0"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasLiked ? "fill-red-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}
