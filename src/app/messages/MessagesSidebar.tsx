"use client";

import useMessageStore from "@/hooks/useMessageStore";
import { Chip } from "@nextui-org/react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { GoInbox } from "react-icons/go";
import { MdOutlineOutbox } from "react-icons/md";

export default function MessagesSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string>(
    searchParams.get("container") || "inbox"
  );

  const items = [
    { key: "inbox", label: "Inbox", Icon: GoInbox, chip: true },
    { key: "outbox", label: "Outbox", Icon: MdOutlineOutbox, chip: false },
  ];

  const handleSelect = (key: string) => {
    setSelected(key);
    const params = new URLSearchParams();
    params.set("container", key);

    router.replace(`${pathname}?${params}`);
  };

  const { unreadCount } = useMessageStore((state) => ({
    unreadCount: state.unreadCount,
  }));
  return (
    <div className="flex  flex-col cursor-pointer shadow-md rounded-lg">
      {items.map(({ key, Icon, label, chip }) => (
        <div
          key={key}
          className={clsx("flex flex-row items-center rounded-t-lg gap-2 p-3", {
            "text-secondary font-semibold": selected === key,
            "text-black hover:text-secondary/70": selected !== key,
          })}
          onClick={() => {
            handleSelect(key);
          }}
        >
          <Icon size={24} />
          <div className="flex justify-between flex-grow">
            <span>{label}</span>
            {chip && <Chip>{unreadCount}</Chip>}
          </div>
        </div>
      ))}
    </div>
  );
}
