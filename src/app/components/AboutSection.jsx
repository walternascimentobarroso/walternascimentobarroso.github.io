"use client";
import { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import {
  TrophyIcon,
  BookOpenIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/solid";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
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
    title: "Education",
    id: "education",
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
    title: "Certifications",
    id: "certifications",
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

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about-image.png"
          alt="About Image"
          width={500}
          height={500}
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with JavaScript, React, Redux, Node.js, Express, PostgreSQL,
            Sequelize, HTML, CSS, and Git. I am a quick learner and I am always
            looking to expand my knowledge and skill set. I am a team player and
            I am excited to work with others to create amazing applications.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
