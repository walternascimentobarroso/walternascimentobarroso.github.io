"use client";
import Link from "next/link";
import { locales, type Dictionary, type Locale } from "../dictionaries";

const STORAGE_KEY = "lang";

export function detectLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (locales.includes(saved as Locale)) return saved as Locale;
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
}

const BrazilFlag = () => (
  <svg viewBox="0 0 28 20" className="h-5 w-7 rounded-sm" aria-hidden="true">
    <rect width="28" height="20" fill="#009C3B" />
    <path d="M14 2.5 25.5 10 14 17.5 2.5 10z" fill="#FFDF00" />
    <circle cx="14" cy="10" r="4.2" fill="#002776" />
    <path d="M9.9 9.2a8 8 0 0 1 8.2 2" stroke="#fff" strokeWidth="0.8" fill="none" />
  </svg>
);

const UsaFlag = () => (
  <svg viewBox="0 0 28 20" className="h-5 w-7 rounded-sm" aria-hidden="true">
    <rect width="28" height="20" fill="#B22234" />
    {[1, 3, 5, 7, 9, 11].map((stripe) => (
      <rect key={stripe} y={(stripe * 20) / 13} width="28" height={20 / 13} fill="#fff" />
    ))}
    <rect width="12" height={(7 * 20) / 13} fill="#3C3B6E" />
  </svg>
);

const flags: Record<Locale, () => React.JSX.Element> = { pt: BrazilFlag, en: UsaFlag };

type Props = {
  lang: Locale;
  labels: Dictionary["language"];
};

export function LanguageToggle({ lang, labels }: Props) {
  return (
    <div className="flex items-center gap-2 py-2 pl-3 pr-4 md:p-0">
      {locales.map((locale) => {
        const Flag = flags[locale];
        const isActive = locale === lang;
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            aria-label={labels[locale]}
            aria-current={isActive ? "true" : undefined}
            title={labels[locale]}
            onClick={() => localStorage.setItem(STORAGE_KEY, locale)}
            className={isActive ? "opacity-100" : "opacity-40 hover:opacity-100 transition-opacity"}
          >
            <Flag />
          </Link>
        );
      })}
    </div>
  );
}
