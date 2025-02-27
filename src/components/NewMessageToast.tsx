import { MessageDto } from "@/types";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  message: MessageDto;
};

export default function NewMessageToast({ message }: Props) {
  return (
    <Link
      href={`/members/${message.senderId}/chat`}
      className="flex items-center"
    >
      <div className="mr-2">
        <Image
          src={message.senderImage || "/images/user.png"}
          height={50}
          width={50}
          alt="sender Image"
        />
      </div>
      <div className="flex flex-grow flex-col justify-center">
        <div className="font-semibold">
          {message.senderName} send you a message
        </div>
        <div className="text-sm">click to view</div>
      </div>
    </Link>
  );
}

export const newMessageToast = (message: MessageDto) => {
  toast(<NewMessageToast message={message} />);
};
