import React from "react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="
        bottom-5 left-5 flex w-max items-center border-l-2 border-red-800
        bg-red-200 pl-2 pr-2 text-xs dark:bg-white-950 md:fixed md:text-sm
        "
    >
      <p>Made with sarah © {year}</p>
    </footer>
  );
}
