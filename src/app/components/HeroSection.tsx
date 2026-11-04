"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import type { Dictionary } from "../dictionaries";

type Props = {
  dict: Dictionary["hero"];
};

const enter = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const HeroSection = ({ dict }: Props) => {
  const reduceMotion = useReducedMotion();
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center py-12 lg:py-20">
      <motion.div
        {...enter}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="md:col-span-7"
      >
        <h1 className="text-zinc-900 dark:text-zinc-50 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
          {dict.greeting}
          <br />
          <span className="sr-only">{dict.roles.join(", ")}</span>
          <span aria-hidden="true" className="text-primary-600 dark:text-primary-400">
            {reduceMotion ? (
              dict.roles[0]
            ) : (
              <TypeAnimation
                sequence={dict.roles.flatMap((role) => [role, 1000])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            )}
          </span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-base lg:text-lg leading-relaxed max-w-[55ch] mb-8">
          {dict.intro}
        </p>
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
      </motion.div>
      <motion.div
        {...enter}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="md:col-span-5 justify-self-center md:justify-self-end"
      >
        <div className="rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
          <Image
            src="/images/hero-image.png"
            alt={dict.imageAlt}
            priority
            width={320}
            height={320}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
