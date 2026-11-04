import type { Dictionary } from "../dictionaries";

type Props = {
  dict: Dictionary["footer"];
};

const Footer = ({ dict }: Props) => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50">
      <div className="max-w-6xl mx-auto px-6 py-10 flex justify-between text-sm">
        <span>{"<W />"}</span>
        <p className="text-zinc-600 dark:text-zinc-400">{dict.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
