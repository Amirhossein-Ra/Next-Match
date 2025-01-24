"use client";

import CardWrapper from "@/components/CardWrapper";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
export default function RegisterSuccessPage() {
  const router = useRouter();
  return (
    <CardWrapper
      headerText="You have Successfully registered"
      subHeaderText="you can login to app"
      action={() => router.push("/login")}
      actionLabel="Go to login"
      headerIcon={FaCheckCircle}
    />
  );
}
