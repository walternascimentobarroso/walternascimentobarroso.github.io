import type { Dictionary } from "../dictionaries";

type Props = {
  dict: Dictionary["footer"];
};

const Footer = ({ dict }: Props) => {
  return (
    <footer className="footer border z-10 border-t-gray-300 dark:border-t-[#33353F] border-l-transparent border-r-transparent text-gray-900 dark:text-white">
      <div className="container p-12 flex justify-between">
        <span>{"<W />"}</span>
        <p className="text-slate-600">{dict.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
