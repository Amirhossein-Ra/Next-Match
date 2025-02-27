import React from "react";
import MessagesSidebar from "./MessagesSidebar";
import { getMessagesByContainer } from "../actions/messageActions";
import MessageTable from "./MessageTable";

export const dynamic = 'force-dynamic';

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: { container: string };
}) {
  const { messages, nextCursor } = await getMessagesByContainer(
    searchParams.container
  );

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessagesSidebar />
      </div>
      <div className="col-span-10 ">
        <MessageTable initialMessages={messages} nextCursor={nextCursor} />
      </div>
    </div>
  );
}
