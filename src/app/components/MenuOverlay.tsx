import { ModeToggle } from "./ModeToggle";
import NavLink from "./NavLink";
import type { NavLinkItem } from "./Navbar";

type Props = {
  id: string;
  links: NavLinkItem[];
  languageToggle: React.ReactNode;
  themeLabel: string;
  onNavigate: () => void;
};

const MenuOverlay = ({ id, links, languageToggle, themeLabel, onNavigate }: Props) => {
  return (
    <ul id={id} className="flex flex-col py-4 items-center">
      {links.map((link) => (
        <li key={link.path}>
          <NavLink href={link.path} title={link.title} onClick={onNavigate} />
        </li>
      ))}
      <li>{languageToggle}</li>
      <li><ModeToggle label={themeLabel} /></li>
    </ul>
  );
};

export default MenuOverlay;
