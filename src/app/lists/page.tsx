import React from "react";
import ListsTaps from "./ListsTaps";
import {
  fetchCurrtenUserLikeId,
  fetchLikedMembers,
} from "../actions/LikeActions";

export default async function ListsPage({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const LikeIds = await fetchCurrtenUserLikeId();
  const members = await fetchLikedMembers(searchParams.type);

  return (
    <div>
      <ListsTaps members={members} likeIds={LikeIds} />
    </div>
  );
}
