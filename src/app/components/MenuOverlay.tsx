import { ModeToggle } from "./ModeToggle";
import NavLink from "./NavLink";
import type { NavLinkItem } from "./Navbar";

type Props = {
  links: NavLinkItem[];
  languageToggle: React.ReactNode;
};

const MenuOverlay = ({ links, languageToggle }: Props) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
      <li>{languageToggle}</li>
      <li><ModeToggle /></li>
    </ul>
  );
};

export default MenuOverlay;
