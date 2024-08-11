"use client";
import React, { ReactNode } from "react";
import Image from "next/image"; 
import { Icon, BackgroundProps } from "../../types/types"

const icons = [
  "/foodicon/fries.png",
  "/foodicon/cheff.png",
  "/foodicon/cola.png",
  "/foodicon/chicken.png",
  "/foodicon/avo.png",
  "/foodicon/chef.png",
  "/foodicon/chicken.png",
  "/foodicon/donut.png",
];

const SqBackGrounds = ({ children }: BackgroundProps) => {
  return (
    <div className="h-[61rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center overflow-hidden">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="grid grid-cols-4 grid-rows-2 gap-4 absolute inset-0">
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-center transform ${
              index % 2 === 0 ? "translate-x-5 translate-y-7" : "-translate-x-5 -translate-y-7"
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
      
      {children}
    </div>
  );
};

export default SqBackGrounds;