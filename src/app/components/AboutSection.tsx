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
import profile from "../profile.json";

const listItems = (items: string[], Icon: typeof TrophyIcon) => (
  <ul className="pl-2">
    {items.map((item) => (
      <li key={item} className="flex">
        <Icon className="w-5 h-5 mr-2 shrink-0 text-secondary-500" />
        {item}
      </li>
    ))}
  </ul>
);

const tabIds = ["skills", "education", "certifications"] as const;

type Props = {
  dict: Dictionary["about"];
};

const AboutSection = ({ dict }: Props) => {
  const [tab, setTab] = useState<(typeof tabIds)[number]>("skills");
  const tabContent = {
    skills: listItems(profile.skills, CodeBracketIcon),
    education: listItems(dict.educationItems, BookOpenIcon),
    certifications: listItems(profile.certifications, TrophyIcon),
  };
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: (typeof tabIds)[number]) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-gray-900 dark:text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about-image.webp"
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
            {tabIds.map((id) => (
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
            {tabContent[tab]}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
