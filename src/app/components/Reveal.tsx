"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const Reveal = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`t-reveal ${shown ? "is-shown" : ""}`}>
      {children}
    </div>
  );
};

export default Reveal;
