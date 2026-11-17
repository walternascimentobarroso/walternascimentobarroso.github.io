"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary } from "../dictionaries";

type Props = {
  dict: Dictionary["hero"];
};

const TYPE_MS = 60;
const DELETE_MS = 30;
const HOLD_MS = 1200;

const Typewriter = ({ words }: { words: string[] }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const word = words[wordIndex];
    const typed = !deleting && length === word.length;
    const erased = deleting && length === 0;
    const delay = typed ? HOLD_MS : deleting ? DELETE_MS : TYPE_MS;
    const timer = setTimeout(() => {
      if (typed) return setDeleting(true);
      if (erased) {
        setDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
        return;
      }
      setLength(length + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [words, wordIndex, length, deleting, reduceMotion]);

  if (reduceMotion) return <>{words[0]}</>;
  return (
    <span className="hero-caret">{words[wordIndex].slice(0, length)}</span>
  );
};

const HeroSection = ({ dict }: Props) => {
  const [shown, setShown] = useState(false);
  useEffect(() => setShown(true), []);
  return (
    <section
      className={`t-stagger ${shown ? "is-shown" : ""} grid grid-cols-1 md:grid-cols-12 gap-10 items-center py-12 lg:py-20`}
    >
      <div className="md:col-span-7">
        <h1 className="t-stagger-line t-stagger-line--1 text-zinc-900 dark:text-zinc-50 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
          {dict.greeting}
          <br />
          <span className="sr-only">{dict.roles.join(", ")}</span>
          <span
            aria-hidden="true"
            className="text-primary-600 dark:text-primary-400"
          >
            <Typewriter words={dict.roles} />
          </span>
        </h1>
        <p className="t-stagger-line t-stagger-line--2 text-zinc-600 dark:text-zinc-400 text-base lg:text-lg leading-relaxed max-w-[55ch] mb-8 text-justify">
          {dict.intro}
        </p>
        <div className="t-stagger-line t-stagger-line--3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#contact"
              className="px-5 py-3 rounded-lg text-center font-medium bg-primary-700 hover:bg-primary-800 text-white active:scale-[0.98] transition-transform"
            >
              {dict.hireMe}
            </Link>
            <a
              href="/cv.pdf"
              download
              className="px-5 py-3 rounded-lg text-center font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-[0.98] transition-transform"
            >
              {dict.downloadCv}
            </a>
          </div>
        </div>
      </div>
      <div className="t-stagger-line t-stagger-line--4 md:col-span-5 justify-self-center md:justify-self-end">
        <div className="rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
          <Image
            src="/images/hero-image.png"
            alt={dict.imageAlt}
            priority
            width={320}
            height={320}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
