"use client";
import { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "motion/react";
import type { Dictionary } from "../dictionaries";

const projectsData = [
  {
    id: 1,
    title: "React Portfolio Website",
    image: "/images/projects/1.webp",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Potography Portfolio Website",
    image: "/images/projects/2.webp",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "E-commerce Application",
    image: "/images/projects/3.webp",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Food Ordering Application",
    image: "/images/projects/4.webp",
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "React Firebase Template",
    image: "/images/projects/5.webp",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Full-stack Roadmap",
    image: "/images/projects/6.webp",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const PROJECT_TAGS = ["All", "Web", "Mobile"] as const;

type Props = {
  dict: Dictionary["projects"];
};

const ProjectsSection = ({ dict }: Props) => {
  const [tag, setTag] = useState<string>("All");
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref, { once: true });

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="scroll-mt-28 py-16">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
        {dict.title}
      </h2>
      <div className="text-zinc-900 dark:text-white flex flex-wrap gap-2 pb-8">
        {PROJECT_TAGS.map((projectTag) => (
          <ProjectTag
            key={projectTag}
            onClick={() => setTag(projectTag)}
            name={dict.tags[projectTag]}
            isSelected={tag === projectTag}
          />
        ))}
      </div>
      <ul ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard
              title={project.title}
              description={dict.descriptions[String(project.id) as keyof typeof dict.descriptions]}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              codeLabel={dict.codeLabel}
              previewLabel={dict.previewLabel}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
