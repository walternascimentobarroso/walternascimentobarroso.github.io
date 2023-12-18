"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "light" ? (
        <MoonIcon className="h-8 w-8 text-[#ADB7BE]" />
      ) : (
        <SunIcon className="h-8 w-8 text-[#ADB7BE]" />
      )}
    </button>
  );
}
