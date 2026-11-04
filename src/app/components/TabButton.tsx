import { motion } from "motion/react";

const variants = {
  default: { scaleX: 0 },
  active: { scaleX: 1 },
};

type Props = {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
};

const TabButton = ({ active, selectTab, children }: Props) => {
  const buttonClasses = active ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400";

  return (
    <button type="button" aria-pressed={active} onClick={selectTab}>
      <span className={`block mr-3 font-semibold hover:text-zinc-900 dark:hover:text-white ${buttonClasses}`}>
        {children}
      </span>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 bg-primary-500 mt-2 mr-3 origin-left"
      ></motion.div>
    </button>
  );
};

export default TabButton;
