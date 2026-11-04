"use client";
import { useState } from "react";
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
  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
    {items.map((item) => (
      <li key={item} className="flex">
        <Icon className="w-5 h-5 mr-2 shrink-0 text-primary-600 dark:text-primary-400" />
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
  return (
    <section className="text-zinc-900 dark:text-white scroll-mt-28" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-16 xl:gap-16">
        <Image
          src="/images/about-image.webp"
          alt={dict.imageAlt}
          className="rounded-lg"
          width={500}
          height={500}
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">{dict.title}</h2>
          <p className="text-base lg:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-[65ch] text-justify">
            {dict.text}
          </p>
          <div className="flex flex-row justify-start mt-8">
            {tabIds.map((id) => (
              <TabButton
                key={id}
                selectTab={() => setTab(id)}
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
