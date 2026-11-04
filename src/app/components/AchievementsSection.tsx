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
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-gray-300 dark:sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {profile.achievements.map((achievement) => {
          return (
            <div
              key={achievement.metric}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
            >
              <span className="sr-only">
                {"prefix" in achievement && achievement.prefix}
                {achievement.value.toLocaleString(dict.locale)}
                {"postfix" in achievement && achievement.postfix}
              </span>
              <div aria-hidden="true" className="text-gray-900 dark:text-white text-4xl font-bold flex flex-row tabular-nums">
                {"prefix" in achievement && achievement.prefix}
                <AnimatedNumbers
                  useThousandsSeparator
                  animateToNumber={achievement.value}
                  locale={dict.locale}
                  className="text-gray-900 dark:text-white text-4xl font-bold"
                  transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.3,
                  })}
                />
                {"postfix" in achievement && achievement.postfix}
              </div>
              <p className="text-gray-600 dark:text-[#ADB7BE] text-base">{dict[achievement.metric as keyof typeof dict]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
