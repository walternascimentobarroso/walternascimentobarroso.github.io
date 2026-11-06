import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type Props = {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
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
  return (
    <div>
      <div className="aspect-[4/3] rounded-lg border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group">
        <Image
          src={imgUrl}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
        {/* Hidden only where hover exists; touch screens always show the links */}
        <div className="overlay flex items-center justify-center absolute inset-0 bg-zinc-100/80 dark:bg-zinc-900/80 transition-opacity duration-500 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
          <Link
            href={gitUrl}
            aria-label={`${codeLabel}: ${title}`}
            className={linkClass}
          >
            <CodeBracketIcon className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link
            href={previewUrl}
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
    </div>
  );
};

export default ProjectCard;
