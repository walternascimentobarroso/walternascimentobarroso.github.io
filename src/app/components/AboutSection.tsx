"use client";
import {
  BookOpenIcon,
  CodeBracketIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { Dictionary } from "../dictionaries";
import profile from "../profile.json";
import TabButton from "./TabButton";

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
type TabId = (typeof tabIds)[number];

const SWAP_MS = 150;

type Props = {
  dict: Dictionary["about"];
};

const AboutSection = ({ dict }: Props) => {
  const [tab, setTab] = useState<TabId>("skills");
  const [prevTab, setPrevTab] = useState<TabId | null>(null);
  const [swapping, setSwapping] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  const movePill = useCallback((animate: boolean) => {
    const pill = pillRef.current;
    const activeTab = tabsRef.current?.querySelector<HTMLElement>(
      '[aria-selected="true"]',
    );
    if (!pill || !activeTab) return;
    if (!animate) pill.style.transition = "none";
    pill.style.transform = `translateX(${activeTab.offsetLeft}px)`;
    pill.style.width = `${activeTab.offsetWidth}px`;
    if (animate) return;
    void pill.offsetWidth;
    pill.style.transition = "";
  }, []);

  const pilledTab = useRef<TabId | null>(null);
  useLayoutEffect(() => {
    movePill(pilledTab.current !== null);
    pilledTab.current = tab;
  }, [tab, movePill]);

  useEffect(() => {
    const snap = () => movePill(false);
    window.addEventListener("resize", snap);
    return () => window.removeEventListener("resize", snap);
  }, [movePill]);

  useEffect(() => {
    if (!prevTab) return;
    const frame = requestAnimationFrame(() => setSwapping(true));
    const timer = setTimeout(() => setPrevTab(null), SWAP_MS);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [prevTab]);

  const selectTab = (id: TabId) => {
    if (id === tab) return;
    setPrevTab(tab);
    setSwapping(false);
    setTab(id);
  };

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
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            {dict.title}
          </h2>
          <p className="text-base lg:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-[65ch] text-justify">
            {dict.text}
          </p>
          <div ref={tabsRef} className="t-tabs self-start mt-8" role="tablist">
            <span ref={pillRef} className="t-tabs-pill" aria-hidden="true" />
            {tabIds.map((id) => (
              <TabButton
                key={id}
                selectTab={() => selectTab(id)}
                active={tab === id}
              >
                {dict[id]}
              </TabButton>
            ))}
          </div>
          <div
            role="tabpanel"
            className={`t-text-soft w-full mt-8 ${swapping ? "is-swapping" : ""}`}
          >
            {prevTab && (
              <div className="t-text-soft-old" aria-hidden="true">
                {tabContent[prevTab]}
              </div>
            )}
            <div className={prevTab ? "t-text-soft-new" : undefined}>
              {tabContent[tab]}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
