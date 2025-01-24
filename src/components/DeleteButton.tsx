import React from "react";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

type Props = {
  selected: boolean;
  loading: boolean;
};

export default function DeleteButton({ selected, loading }: Props) {
  return (
    <div className="relarive hover:opacity-80 transition cursor-pointer">
      {!loading ? (
        <>
          <AiOutlineDelete
            size={32}
            className="fill-white
        absolute -top-[2px] -right-[2px]"
          />
          <AiFillDelete
            size={28}
            className={selected ? "fill-red-500 " : "fill-neutral-500/70"}
          />
        </>
      ) : (
        <PiSpinnerGap size={32} className="fill-white animate-spin" />
      )}
    </div>
  );
}
