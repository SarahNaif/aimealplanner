"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

const SqBackground: React.FC<BackgroundProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <div
      className={`relative h-[64rem] overflow-hidden w-full dark:bg-zinc-950 dark:bg-grid-white/[0.1] ${
        pathname === "/meal-details" ? "bg-black/[0.1]" : "bg-grid-black/[0.2]"
      } flex items-center justify-center`}
    >
      <div
        className={`absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}
      ></div>
      {children}
    </div>
  );
};

export default SqBackground;