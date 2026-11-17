type Props = {
  name: string;
  onClick: (name: string) => void;
  isSelected: boolean;
};

const ProjectTag = ({ name, onClick, isSelected }: Props) => (
  <button
    type="button"
    role="tab"
    aria-selected={isSelected}
    className="t-tab text-sm font-medium"
    onClick={() => onClick(name)}
  >
    {name}
  </button>
);

export default ProjectTag;
