import Link from "next/link";

type Props = {
  href: string;
  title: string;
  onClick?: () => void;
};

const NavLink = ({ href, title, onClick }: Props) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-2 pl-3 pr-4 text-gray-600 dark:text-[#ADB7BE] sm:text-xl rounded-sm md:p-0 hover:text-gray-900 dark:hover:text-white"
    >
      {title}
    </Link>
  );
};

export default NavLink;
