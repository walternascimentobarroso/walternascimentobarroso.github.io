import { ModeToggle } from "./ModeToggle";
import NavLink from "./NavLink";
import type { NavLinkItem } from "./Navbar";

type Props = {
  links: NavLinkItem[];
  languageToggle: React.ReactNode;
  themeLabel: string;
  onNavigate: () => void;
};

const MenuOverlay = ({ links, languageToggle, themeLabel, onNavigate }: Props) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} onClick={onNavigate} />
        </li>
      ))}
      <li>{languageToggle}</li>
      <li><ModeToggle label={themeLabel} /></li>
    </ul>
  );
};

export default MenuOverlay;
