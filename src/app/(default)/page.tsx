"use client";
import { useEffect } from "react";
import { detectLocale } from "../components/LanguageToggle";

export default function RootRedirect() {
  // Full load, not router.replace: [lang] has its own root layout, and rendering it client-side makes React warn about next-themes' inline script
  useEffect(() => {
    window.location.replace(`/${detectLocale()}`);
  }, []);

  return null;
}
