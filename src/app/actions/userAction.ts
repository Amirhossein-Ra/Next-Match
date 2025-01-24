"use server";

import {
  MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/memberEditSchema";
import { ActionResult } from "@/types";
import { Member } from "@prisma/client";
import { AuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { log } from "console";

export async function UpdateMemberProfile(
  data: MemberEditSchema
): Promise<ActionResult<Member>> {
  try {
    const userId = await AuthUserId();

    const validated = memberEditSchema.safeParse(data);
    if (!validated.success)
      return { status: "error", error: validated.error.errors };

    const { name, decription, city, country } = validated.data;

    const member = await prisma.member.update({
      where: { userId },
      data: {
        name,
        decription,
        city,
        country,
      },
    });
    return { status: "success", data: member };
  } catch (error) {
    console.log(error);

    return { status: "error", error: "Something went wrong" };
  }
}
