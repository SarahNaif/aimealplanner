"use client";
import React, { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

const SqBackground: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className=" h-[64rem] w-full dark:bg-zinc-950 bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.2] relative flex items-center justify-center overflow-hidden">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
};

export default SqBackground;