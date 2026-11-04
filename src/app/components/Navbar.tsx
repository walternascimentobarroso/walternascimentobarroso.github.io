"use client";
import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import { ModeToggle } from "./ModeToggle";
import { LanguageToggle } from "./LanguageToggle";
import type { Dictionary, Locale } from "../dictionaries";

export type NavLinkItem = {
  title: string;
  path: string;
};

type Props = {
  lang: Locale;
  dict: Dictionary;
};

const Navbar = ({ lang, dict }: Props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navLinks: NavLinkItem[] = [
    { title: dict.nav.about, path: "#about" },
    { title: dict.nav.projects, path: "#projects" },
    { title: dict.nav.contact, path: "#contact" },
  ];
  const languageToggle = <LanguageToggle lang={lang} labels={dict.language} />;

  return (
    <nav className="fixed mx-auto border border-gray-300 dark:border-[#33353F] top-0 left-0 right-0 z-10 bg-white dark:bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={`/${lang}`}
          className="text-2xl md:text-5xl text-gray-900 dark:text-white font-semibold"
        >
          {"<W />"}
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded-sm border-slate-600 dark:border-slate-200 text-slate-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:border-black dark:hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded-sm border-slate-600 dark:border-slate-200 text-slate-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:border-black dark:hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            <li>{languageToggle}</li>
            <li><ModeToggle /></li>
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} languageToggle={languageToggle} /> : null}
    </nav>
  );
};

export default Navbar;
