import { AuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import EditForm from "./EditForm";
import { notFound } from "next/navigation";

export default async function MemberEditPage() {
  const userId = await AuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </>
  );
}
