"use client";
import React, { useState } from "react";
import Image from "next/image"; 
import { Skeleton } from "@/components/ui/skeleton";

const icons : string[]= [
  "https://res.cloudinary.com/dvukj9sqf/image/upload/v1736273878/icon/fries_wfexya.png",
  "https://res.cloudinary.com/dvukj9sqf/image/upload/v1736273870/icon/cheff_yvpuib.png",
  "https://res.cloudinary.com/dvukj9sqf/image/upload/v1736273879/icon/cola_w5grmf.png",
  "https://res.cloudinary.com/dvukj9sqf/image/upload/v1736273885/icon/chicken_uafjfs.png",
  "https://res.cloudinary.com/dvukj9sqf/image/upload/v1736273879/icon/avo_qwbggg.png",
  "https://res.cloudinary.com/dvukj9sqf/image/upload/v1736273879/icon/chef_ismygr.png",
  "https://res.cloudinary.com/dvukj9sqf/image/upload/v1736273885/icon/chicken_uafjfs.png",
  "https://res.cloudinary.com/dvukj9sqf/image/upload/v1736273881/icon/donut_rbiaq2.png",
];

const IconGrid: React.FC  = () => {

   const [imageLoaded, setImageLoaded] = useState(false);
   
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

<div>
{!imageLoaded && (
            <Skeleton className="w-20 h-20 rounded-md" />
          )}
<Image
          className={`w-20 h-20  ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={icon}
          alt={`food-icon-${index}`}
          width={80}
          height={80}
          onLoad={() => setImageLoaded(true)}
        />

</div>
       
      </div>
      
    ))}
  </div>
  )
}

export default IconGrid