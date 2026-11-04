"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

type Props = {
  label: string;
};

export function ModeToggle({ label }: Props) {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // next-themes só conhece o tema no cliente; evita mismatch de hidratação
  if (!mounted) return <div className="h-5 w-5" />;

  return (
    <button
      aria-label={label}
      aria-pressed={theme === "dark"}
      className="block py-2 pl-3 pr-4 text-zinc-600 dark:text-zinc-400 rounded-sm md:p-0 hover:text-zinc-900 dark:hover:text-white"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
      ) : (
        <SunIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
      )}
    </button>
  );
}
