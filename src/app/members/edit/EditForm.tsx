"use client";
import { UpdateMemberProfile } from "@/app/actions/userAction";
import {
  MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/memberEditSchema";
import { handleFormServerError } from "@/lib/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  member: Member;
};

export default function EditForm({ member }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isDirty, isSubmitting, isValid, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
  });

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        decription: member.decription,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  const router = useRouter();

  const onSubmit = async (data: MemberEditSchema) => {
    const result = await UpdateMemberProfile(data);
    if (result.status === "success") {
      toast.success("profile updated");
      router.refresh();
      reset({ ...data });
    } else {
      handleFormServerError(result, setError);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col space-y-4 "
    >
      <Input
        label="Name"
        variant="bordered"
        {...register("name")}
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        label="Description"
        variant="bordered"
        {...register("decription")}
        defaultValue={member.decription}
        isInvalid={!!errors.decription}
        errorMessage={errors.decription?.message}
        minRows={6}
      />
      <div className=" flex flex-row gap-3">
        <Input
          label="city"
          variant="bordered"
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          label="country"
          variant="bordered"
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      {errors.root?.serverError && (
        <p className="text-danger text-sm">{errors.root.serverError.message}</p>
      )}
      <Button
        type="submit"
        className="flex self-end "
        variant="solid"
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
        color="secondary"
      >
        Update Profile
      </Button>
    </form>
  );
}
