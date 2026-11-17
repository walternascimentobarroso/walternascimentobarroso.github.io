"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Dictionary } from "../dictionaries";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";

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

function movePill(
  tabs: HTMLElement | null,
  pill: HTMLElement | null,
  animate: boolean,
) {
  const activeTab = tabs?.querySelector<HTMLElement>('[aria-selected="true"]');
  if (!pill || !activeTab) return;
  // Snap without tweening on first paint and resize, as the snippet requires.
  if (!animate) pill.style.transition = "none";
  pill.style.transform = `translateX(${activeTab.offsetLeft}px)`;
  pill.style.width = `${activeTab.offsetWidth}px`;
  if (animate) return;
  void pill.offsetWidth;
  pill.style.transition = "";
}

type Props = {
  dict: Dictionary["projects"];
};

const ProjectsSection = ({ dict }: Props) => {
  const [tag, setTag] = useState<string>("All");
  const [isShown, setIsShown] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const hasPlacedPill = useRef(false);

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag),
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsShown(true);
      observer.disconnect();
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    movePill(tabsRef.current, pillRef.current, hasPlacedPill.current);
    hasPlacedPill.current = true;
  });

  useEffect(() => {
    const snapPill = () => movePill(tabsRef.current, pillRef.current, false);
    window.addEventListener("resize", snapPill);
    return () => window.removeEventListener("resize", snapPill);
  }, []);

  return (
    <section id="projects" className="scroll-mt-28 py-16">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
        {dict.title}
      </h2>
      <div className="pb-8">
        <div ref={tabsRef} className="t-tabs" role="tablist">
          <span ref={pillRef} className="t-tabs-pill" aria-hidden="true" />
          {PROJECT_TAGS.map((projectTag) => (
            <ProjectTag
              key={projectTag}
              onClick={() => setTag(projectTag)}
              name={dict.tags[projectTag]}
              isSelected={tag === projectTag}
            />
          ))}
        </div>
      </div>
      <ul
        ref={listRef}
        className={`t-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-8${isShown ? " is-shown" : ""}`}
      >
        {filteredProjects.map((project, index) => (
          <li
            key={project.id}
            className="t-stagger-line"
            style={{ "--stagger-index": index } as React.CSSProperties}
          >
            <ProjectCard
              title={project.title}
              description={
                dict.descriptions[
                  String(project.id) as keyof typeof dict.descriptions
                ]
              }
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              codeLabel={dict.codeLabel}
              previewLabel={dict.previewLabel}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
