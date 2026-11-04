import Link from "next/link";
import Image from "next/image";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

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
  "h-14 w-14 mr-2 border-2 flex items-center justify-center rounded-full border-gray-500 dark:border-[#ADB7BE] text-gray-600 dark:text-[#ADB7BE] hover:border-black dark:hover:border-white hover:text-gray-900 dark:hover:text-white";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, codeLabel, previewLabel }: Props) => {
  return (
    <div>
      <div className="h-52 md:h-72 rounded-t-xl relative overflow-hidden group">
        <Image src={imgUrl} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        {/* Hidden only where hover exists; touch screens always show the links */}
        <div className="overlay flex items-center justify-center absolute inset-0 bg-gray-100/80 dark:bg-[#181818]/80 transition-opacity duration-500 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
          <Link href={gitUrl} aria-label={`${codeLabel}: ${title}`} className={linkClass}>
            <CodeBracketIcon className="h-10 w-10" aria-hidden="true" />
          </Link>
          <Link href={previewUrl} aria-label={`${previewLabel}: ${title}`} className={linkClass}>
            <EyeIcon className="h-10 w-10" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="text-gray-900 dark:text-white rounded-b-xl mt-3 dark:bg-[#181818] py-6 px-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
