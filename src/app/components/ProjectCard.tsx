"use client";

import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { type CSSProperties, useEffect, useState } from "react";
import SpotlightCard from "./SpotlightCard/SpotlightCard";

type Props = {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl?: string;
  previewUrl: string;
  codeLabel: string;
  previewLabel: string;
};

const linkClass =
  "h-12 w-12 mr-2 border flex items-center justify-center rounded-lg border-zinc-500 dark:border-zinc-400 text-zinc-600 dark:text-zinc-400 hover:border-black dark:hover:border-white hover:text-zinc-900 dark:hover:text-white";

const ProjectCard = ({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
  codeLabel,
  previewLabel,
}: Props) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // resolvedTheme is unknown in the static HTML; reading it before mount breaks hydration.
  const theme = mounted && resolvedTheme === "dark" ? "dark" : "light";

  return (
    <SpotlightCard
      theme={theme}
      spotlightColor="var(--color-primary-500)"
      intensity={0.12}
      borderGlow={0.4}
      style={{ "--spotlight-card-surface": "transparent" } as CSSProperties}
      className="project-card h-full p-3! rounded-xl!"
    >
      <div className="aspect-4/3 rounded-lg border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group">
        <Image
          src={imgUrl}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
        {/* Hidden only where hover exists; touch screens always show the links */}
        <div className="overlay flex items-center justify-center absolute inset-0 bg-zinc-100/80 dark:bg-zinc-900/80 transition-opacity [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
          {gitUrl && (
            <Link
              href={gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${codeLabel}: ${title}`}
              className={linkClass}
            >
              <CodeBracketIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
          )}
          <Link
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${previewLabel}: ${title}`}
            className={linkClass}
          >
            <EyeIcon className="h-6 w-6" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="text-zinc-900 dark:text-zinc-50 pt-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </SpotlightCard>
  );
};

export default ProjectCard;
