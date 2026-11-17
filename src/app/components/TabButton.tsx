type Props = {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
};

const TabButton = ({ active, selectTab, children }: Props) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    onClick={selectTab}
    className="t-tab font-semibold"
  >
    {children}
  </button>
);

export default TabButton;
