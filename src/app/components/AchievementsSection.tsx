"use client";
import dynamic from "next/dynamic";
import type { Dictionary } from "../dictionaries";
import profile from "../profile.json";

const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false }
);


type Props = {
  dict: Dictionary["achievements"];
};

const AchievementsSection = ({ dict }: Props) => {
  return (
    <div className="border-y border-zinc-200 dark:border-zinc-800">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
        {profile.achievements.map((achievement) => {
          return (
            <div
              key={achievement.metric}
              className="flex flex-col"
            >
              <span className="sr-only">
                {"prefix" in achievement && achievement.prefix}
                {achievement.value.toLocaleString(dict.locale)}
                {"postfix" in achievement && achievement.postfix}
              </span>
              <div aria-hidden="true" className="text-zinc-900 dark:text-zinc-50 text-3xl md:text-4xl font-semibold flex flex-row tabular-nums">
                {"prefix" in achievement && achievement.prefix}
                <AnimatedNumbers
                  useThousandsSeparator
                  animateToNumber={achievement.value}
                  locale={dict.locale}
                  className="text-zinc-900 dark:text-zinc-50 text-3xl md:text-4xl font-semibold"
                  transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.3,
                  })}
                />
                {"postfix" in achievement && achievement.postfix}
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">{dict[achievement.metric as keyof typeof dict]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
