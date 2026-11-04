"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
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
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative scroll-mt-28"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2" aria-hidden="true"></div>
      <div className="z-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white my-2">
          {dict.title}
        </h2>
        <p className="text-gray-600 dark:text-[#ADB7BE] mb-4 max-w-md">
          {dict.text}
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href={profile.social.github} target="_blank" rel="noopener noreferrer">
            <Image src={GithubIcon} alt={dict.githubAlt} />
          </Link>
          <Link href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
            <Image src={LinkedinIcon} alt={dict.linkedinAlt} />
          </Link>
        </div>
      </div>
      <div aria-live="polite">
        {emailSubmitted ? (
          <p className="text-green-500 text-sm mt-2">
            {dict.success}
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-gray-900 dark:text-white block mb-2 text-sm font-medium"
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
                className="bg-gray-50 dark:bg-[#18191E] border border-gray-300 dark:border-[#33353F] placeholder-[#9CA2A9] text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder={dict.emailPlaceholder}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-gray-900 dark:text-white block text-sm mb-2 font-medium"
              >
                {dict.subjectLabel}
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-gray-50 dark:bg-[#18191E] border border-gray-300 dark:border-[#33353F] placeholder-[#9CA2A9] text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder={dict.subjectPlaceholder}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-gray-900 dark:text-white block text-sm mb-2 font-medium"
              >
                {dict.messageLabel}
              </label>
              <textarea
                name="message"
                id="message"
                required
                className="bg-gray-50 dark:bg-[#18191E] border border-gray-300 dark:border-[#33353F] placeholder-[#9CA2A9] text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder={dict.messagePlaceholder}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? dict.sending : dict.send}
            </button>
            {sendFailed && (
              <p role="alert" className="text-red-500 text-sm mt-2">
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
