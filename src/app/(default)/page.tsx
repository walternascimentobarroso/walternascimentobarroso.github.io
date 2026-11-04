"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { detectLocale } from "../components/LanguageToggle";

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${detectLocale()}`);
  }, [router]);

  return null;
}
