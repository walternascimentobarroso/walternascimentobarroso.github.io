type Props = {
  name: string;
  onClick: (name: string) => void;
  isSelected: boolean;
};

const ProjectTag = ({ name, onClick, isSelected }: Props) => {
  const buttonStyles = isSelected
    ? "text-gray-900 dark:text-white border-primary-500"
    : "text-gray-600 dark:text-[#ADB7BE] border-slate-600 hover:border-black dark:hover:border-white";
  return (
    <button
      aria-pressed={isSelected}
      className={`${buttonStyles} rounded-full border-2 px-6 py-3 text-xl cursor-pointer`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
