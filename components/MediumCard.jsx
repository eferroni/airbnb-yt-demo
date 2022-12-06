import Image from "next/image";
import React from "react";

function MediumCard({ img, title }) {
  return (
    <div
      className="flex flex-col cursor-pointer hover:scale-105
    transition transform duration-300 ease-out"
    >
      <div className="relative h-80 w-80">
        <Image src={img} fill className="rounded-xl" alt="Medium Card" />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  );
}

export default MediumCard;
