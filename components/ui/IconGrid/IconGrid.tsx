"use client";
import React from "react";
import Image from "next/image"; 

const icons : string[]= [
  "/foodicon/fries.png",
  "/foodicon/cheff.png",
  "/foodicon/cola.png",
  "/foodicon/chicken.png",
  "/foodicon/avo.png",
  "/foodicon/chef.png",
  "/foodicon/chicken.png",
  "/foodicon/donut.png",
];

const IconGrid: React.FC  = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 absolute inset-0">
    {icons.map((icon, index) => (
      <div
        key={index}
        className={`relative flex items-center justify-center transform ${
          index % 3 === 0
            ? "translate-x-5 translate-y-7"
            : index % 3 === 1
            ? "-translate-x-7 -translate-y-28"
            : "translate-x-10 -translate-y-35"
        }`}
      >
        <Image
          className="w-20 h-20"
          src={icon}
          alt={`food-icon-${index}`}
          width={80}
          height={80}
        />
      </div>
    ))}
  </div>
  )
}

export default IconGrid