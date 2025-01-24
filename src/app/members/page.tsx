import React, { useEffect } from "react";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./memberCard";
import { fetchCurrtenUserLikeId } from "../actions/LikeActions";
import PaginationComponent from "@/components/PaginationComponent";
import { GetMemberParams } from "@/types";
import EmptyState from "@/components/EmptyState";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: GetMemberParams;
}) {
  const { items: members, totalCount } = await getMembers(searchParams);
  const likeIds = await fetchCurrtenUserLikeId();

  return (
    <>
      {!members || members.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
            {members &&
              members.map((member) => (
                <MemberCard member={member} key={member.id} likeIds={likeIds} />
              ))}
          </div>
          <PaginationComponent totalCount={totalCount} />
        </>
      )}
    </>
  );
}
