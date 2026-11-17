import { useEffect, useRef, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import type { NavLinkItem } from "./Navbar";
import NavLink from "./NavLink";

type Props = {
  id: string;
  open: boolean;
  links: NavLinkItem[];
  languageToggle: React.ReactNode;
  themeLabel: string;
  onNavigate: () => void;
};

const MenuOverlay = ({
  id,
  open,
  links,
  languageToggle,
  themeLabel,
  onNavigate,
}: Props) => {
  const panelRef = useRef<HTMLUListElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Forces the closed style to be computed on mount so the open state transitions instead of snapping.
    void panelRef.current?.offsetHeight;
    setShown(open);
  }, [open]);

  return (
    <ul
      ref={panelRef}
      id={id}
      data-open={shown}
      className="t-panel-slide flex flex-col py-4 items-center"
    >
      {links.map((link) => (
        <li key={link.path}>
          <NavLink href={link.path} title={link.title} onClick={onNavigate} />
        </li>
      ))}
      <li>{languageToggle}</li>
      <li>
        <ModeToggle label={themeLabel} />
      </li>
    </ul>
  );
};

export default MenuOverlay;
