import { ModeToggle } from "./ModeToggle";
import NavLink from "./NavLink";

const MenuOverlay = ({ links }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
      <li><ModeToggle /></li>
    </ul>
  );
};

export default MenuOverlay;
