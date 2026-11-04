"use client";
import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "../dictionaries";
import profile from "../profile.json";

// Web3Forms access keys are public by design: they only allow sending to the owner's inbox.
const WEB3FORMS_ACCESS_KEY = "c00ebeb4-4265-4e46-9d61-b94b8ced78ea";

type Props = {
  dict: Dictionary["contact"];
};

const EmailSection = ({ dict }: Props) => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendFailed(false);
    setSending(true);
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const { success } = await response.json();
      success ? setEmailSubmitted(true) : setSendFailed(true);
    } catch {
      setSendFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 py-16 gap-12 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-28"
    >
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          {dict.title}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md leading-relaxed text-justify hyphens-auto">
          {dict.text}
        </p>
        <div className="socials flex flex-row gap-4">
          <Link href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label={dict.githubAlt} className="text-zinc-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8" aria-hidden="true"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
          </Link>
          <Link href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={dict.linkedinAlt} className="text-zinc-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8" aria-hidden="true"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/></svg>
          </Link>
        </div>
      </div>
      <div aria-live="polite">
        {emailSubmitted ? (
          <p className="text-primary-700 dark:text-primary-400 text-sm mt-2">
            {dict.success}
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-zinc-900 dark:text-white block mb-2 text-sm font-medium"
              >
                {dict.emailLabel}
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                autoComplete="email"
                spellCheck={false}
                className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 placeholder-zinc-500 text-zinc-900 dark:text-zinc-100 text-sm rounded-lg block w-full p-2.5"
                placeholder={dict.emailPlaceholder}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-zinc-900 dark:text-white block text-sm mb-2 font-medium"
              >
                {dict.subjectLabel}
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 placeholder-zinc-500 text-zinc-900 dark:text-zinc-100 text-sm rounded-lg block w-full p-2.5"
                placeholder={dict.subjectPlaceholder}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-zinc-900 dark:text-white block text-sm mb-2 font-medium"
              >
                {dict.messageLabel}
              </label>
              <textarea
                name="message"
                id="message"
                required
                className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 placeholder-zinc-500 text-zinc-900 dark:text-zinc-100 text-sm rounded-lg block w-full p-2.5"
                placeholder={dict.messagePlaceholder}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="bg-primary-700 hover:bg-primary-800 text-white active:scale-[0.98] transition-transform font-medium py-2.5 px-5 rounded-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? dict.sending : dict.send}
            </button>
            {sendFailed && (
              <p role="alert" className="text-red-600 dark:text-red-400 text-sm mt-2">
                {dict.failure}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
