"use client";
import { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import {
  TrophyIcon,
  BookOpenIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/solid";
import type { Dictionary } from "../dictionaries";

const TAB_DATA = [
  {
    id: "skills" as const,
    content: (
      <ul className="pl-2">
        <li className="flex">
          <CodeBracketIcon className="w-5 h-5 mr-2 text-secondary-500" />
          Node.js
        </li>
        <li className="flex">
          <CodeBracketIcon className="w-5 h-5 mr-2 text-secondary-500" />
          Express
        </li>
        <li className="flex">
          <CodeBracketIcon className="w-5 h-5 mr-2 text-secondary-500" />
          PostgreSQL
        </li>
        <li className="flex">
          <CodeBracketIcon className="w-5 h-5 mr-2 text-secondary-500" />
          Sequelize
        </li>
        <li className="flex">
          <CodeBracketIcon className="w-5 h-5 mr-2 text-secondary-500" />
          JavaScript
        </li>
        <li className="flex">
          <CodeBracketIcon className="w-5 h-5 mr-2 text-secondary-500" />
          React
        </li>
      </ul>
    ),
  },
  {
    id: "education" as const,
    content: (
      <ul className="pl-2">
        <li className="flex">
          <BookOpenIcon className="w-5 h-5 mr-2 text-secondary-500" />
          Fullstack Academy of Code
        </li>
        <li className="flex">
          <BookOpenIcon className="w-5 h-5 mr-2 text-secondary-500" />
          University of California, Santa Cruz
        </li>
      </ul>
    ),
  },
  {
    id: "certifications" as const,
    content: (
      <ul className=" pl-2">
        <li className="flex">
          <TrophyIcon className="w-5 h-5 mr-2 text-secondary-500" />
          AWS Cloud Practitioner
        </li>
        <li className="flex">
          <TrophyIcon className="w-5 h-5 mr-2 text-secondary-500" />
          LE-1: Linux Essentials
        </li>
      </ul>
    ),
  },
];

type Props = {
  dict: Dictionary["about"];
};

const AboutSection = ({ dict }: Props) => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-gray-900 dark:text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about-image.png"
          alt={dict.imageAlt}
          width={500}
          height={500}
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{dict.title}</h2>
          <p className="text-base lg:text-lg">
            {dict.text}
          </p>
          <div className="flex flex-row justify-start mt-8">
            {TAB_DATA.map(({ id }) => (
              <TabButton
                key={id}
                selectTab={() => handleTabChange(id)}
                active={tab === id}
              >
                {dict[id]}
              </TabButton>
            ))}
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
