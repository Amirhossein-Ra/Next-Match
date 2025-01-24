"use client";
import { MessageDto } from "@/types";
import {
  Avatar,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import React from "react";

import MessageTableCell from "./MessageTableCell";
import { useMessages } from "@/hooks/useMessages";

type Props = {
  initialMessages: MessageDto[];
  nextCursor?: string;
};

export default function MessageTable({ initialMessages, nextCursor }: Props) {
  const {
    columns,
    isDeleting,
    isOutbox,
    deleteMessage,
    selectRow,
    messages,
    loadMore,
    loadingMore,
    hasMore,
  } = useMessages(initialMessages, nextCursor);
  return (
    <div className="flex flex-col h-[80vh]">
      <Card>
        <Table
          aria-label="Table with message"
          selectionMode="single"
          onRowAction={(key) => selectRow(key)}
          className="flex flex-col gap-3 h-[80vh] overflow-auto"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                width={column.key === "text" ? "50%" : undefined}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={messages}
            emptyContent="no messages for this container"
          >
            {(item) => (
              <TableRow key={item.id} className="cursor-pointer">
                {(columnKey) => (
                  <TableCell
                    className={`${
                      !item.dateRead && !isOutbox ? "font-semibold" : ""
                    } `}
                  >
                    <MessageTableCell
                      item={item}
                      isOutbox={isOutbox}
                      columnKey={columnKey as string}
                      deleteMessage={deleteMessage}
                      isDeleting={
                        isDeleting.loading && isDeleting.id === item.id
                      }
                    />
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="sticky bottom-0 pb-3 text-right">
          <Button
            color="secondary"
            isLoading={loadingMore}
            isDisabled={!hasMore}
            onClick={loadMore}
          >
            {hasMore ? "load More " : "no More Messages"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
