"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Dictionary, Locale } from "../dictionaries";
import { LanguageToggle } from "./LanguageToggle";
import MenuOverlay from "./MenuOverlay";
import { ModeToggle } from "./ModeToggle";
import NavLink from "./NavLink";

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
  const [menuMounted, setMenuMounted] = useState(false);
  const unmountTimer = useRef<number>(undefined);

  const openMenu = () => {
    window.clearTimeout(unmountTimer.current);
    setMenuMounted(true);
    setNavbarOpen(true);
  };

  // Keeps the panel mounted until its close transition finishes.
  const closeMenu = () => {
    setNavbarOpen(false);
    const closeDuration = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--panel-close-dur",
      ),
    );
    unmountTimer.current = window.setTimeout(
      () => setMenuMounted(false),
      closeDuration,
    );
  };
  const navLinks: NavLinkItem[] = [
    { title: dict.nav.about, path: "#about" },
    { title: dict.nav.projects, path: "#projects" },
    { title: dict.nav.contact, path: "#contact" },
  ];
  const languageToggle = <LanguageToggle lang={lang} labels={dict.language} />;

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur">
      <div className="flex max-w-6xl min-h-16 flex-wrap items-center justify-between mx-auto px-6">
        <Link href={`/${lang}`} aria-label="Home">
          <Image
            src="/logo-light.svg"
            alt=""
            width={40}
            height={40}
            loading="eager"
            className="dark:hidden"
          />
          <Image
            src="/logo-dark.svg"
            alt=""
            width={40}
            height={40}
            loading="eager"
            className="hidden dark:block"
          />
        </Link>
        <div className="mobile-menu block md:hidden">
          <button
            type="button"
            onClick={navbarOpen ? closeMenu : openMenu}
            aria-label={navbarOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={navbarOpen}
            aria-controls="mobile-menu"
            className="flex items-center px-3 py-2 border rounded-lg border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:border-black dark:hover:border-white"
          >
            <span className="t-icon-swap" data-state={navbarOpen ? "b" : "a"}>
              <Bars3Icon className="t-icon h-5 w-5" data-icon="a" />
              <XMarkIcon className="t-icon h-5 w-5" data-icon="b" />
            </span>
          </button>
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex items-center p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            <li>{languageToggle}</li>
            <li>
              <ModeToggle label={dict.nav.toggleTheme} />
            </li>
          </ul>
        </div>
      </div>
      {menuMounted ? (
        <MenuOverlay
          id="mobile-menu"
          open={navbarOpen}
          links={navLinks}
          languageToggle={languageToggle}
          themeLabel={dict.nav.toggleTheme}
          onNavigate={closeMenu}
        />
      ) : null}
    </nav>
  );
};

export default Navbar;
