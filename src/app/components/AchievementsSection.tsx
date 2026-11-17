"use client";
import { useEffect, useRef } from "react";
import type { Dictionary } from "../dictionaries";
import profile from "../profile.json";

type Props = {
  dict: Dictionary["achievements"];
};

type Tokens = {
  stepDur: number;
  stagger: number;
  ease: (x: number) => number;
  offset: number;
  sideScale: number;
  sideBlur: number;
  sideOpacity: number;
  centerScale: number;
  centerBlur: number;
  anticDur: number;
  anticScale: number;
  anticLift: number;
  landDur: number;
  landPeak: number;
};

type Look = { angle: number; scale: number; back: number };

type Column = {
  cells: HTMLSpanElement[];
  digit: number;
  from: number;
  done?: boolean;
  landAt?: number;
  landFrom?: Look;
};

type Land = { scale: number; lift: number; opacity: number; arrive: number };

const STEP = (50 * Math.PI) / 180;
const ENTER_MS = 120;
const FADE_END = 1.8;
const LAND_AT = 0.6;
const ARRIVE_AT = 0.29;
const CLEAR_MS = 200;

function token(name: string, fallback: number) {
  const value = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(name),
  );
  return Number.isNaN(value) ? fallback : value;
}

// Lengths are em-based, so they are measured in px on the drum itself.
function length(el: HTMLElement, name: string, fallbackEm: number) {
  const probe = document.createElement("span");
  probe.style.cssText = `position:absolute;visibility:hidden;width:var(${name})`;
  el.appendChild(probe);
  const px = probe.getBoundingClientRect().width;
  probe.remove();
  return px || fallbackEm * (parseFloat(getComputedStyle(el).fontSize) || 24);
}

function bezier([x1, y1, x2, y2]: number[]) {
  const at = (a: number, b: number, t: number) =>
    3 * a * t * (1 - t) * (1 - t) + 3 * b * t * t * (1 - t) + t * t * t;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 20; i++) {
      if (at(x1, x2, t) < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return at(y1, y2, t);
  };
}

function readTokens(el: HTMLElement): Tokens {
  const ease = getComputedStyle(document.documentElement)
    .getPropertyValue("--reel-ease")
    .match(/cubic-bezier\(([^)]+)\)/);
  return {
    stepDur: token("--reel-step-dur", 130),
    stagger: token("--reel-stagger", 90),
    ease: bezier(
      ease ? ease[1].split(",").map(parseFloat) : [0.35, -0.02, 0.43, 1],
    ),
    offset: length(el, "--reel-side-offset", 0.52),
    sideScale: token("--reel-side-scale", 0.7),
    sideBlur: length(el, "--reel-side-blur", 0.083),
    sideOpacity: token("--reel-side-opacity", 0.17),
    centerScale: token("--reel-center-scale", 0.9),
    centerBlur: length(el, "--reel-center-blur", 0.042),
    anticDur: token("--reel-antic-dur", 100),
    anticScale: token("--reel-antic-scale", 0.94),
    anticLift: length(el, "--reel-antic-lift", 0.125),
    landDur: token("--reel-land-dur", 740),
    landPeak: token("--reel-land-peak", 1.03),
  };
}

function smooth(x: number) {
  const clamped = Math.max(0, Math.min(1, x));
  return clamped * clamped * (3 - 2 * clamped);
}

// Damped wave: starts at 1, crosses 0, swings negative (the bounce), ends at 0.
function wave(s: number) {
  return s >= 1 ? 0 : Math.exp(-3 * s) * Math.cos(3 * Math.PI * s) * (1 - s);
}

const WAVE_TROUGH = (() => {
  let low = 0;
  for (let i = 1; i < 400; i++) low = Math.min(low, wave(i / 400));
  return -low;
})();

function buildColumns(el: HTMLElement, text: string) {
  el.replaceChildren();
  const cols: Column[] = [];
  for (const ch of text) {
    if (ch < "0" || ch > "9") {
      const sep = document.createElement("span");
      sep.className = "t-reel-sep";
      sep.textContent = ch;
      el.appendChild(sep);
      continue;
    }
    const col = document.createElement("span");
    col.className = "t-reel-col";
    const sizer = document.createElement("span");
    sizer.className = "t-reel-sizer";
    sizer.textContent = "0";
    col.appendChild(sizer);
    const cells: HTMLSpanElement[] = [];
    for (let d = 0; d < 10; d++) {
      const cell = document.createElement("span");
      cell.className = "t-reel-digit";
      cell.textContent = String(d);
      col.appendChild(cell);
      cells.push(cell);
    }
    el.appendChild(col);
    cols.push({ cells, digit: +ch, from: 0 });
  }
  return cols;
}

function rest(col: Column, digit: number) {
  col.cells.forEach((cell, d) => {
    cell.style.transform = "none";
    cell.style.filter = "none";
    cell.style.zIndex = "";
    cell.style.opacity = d === digit ? "1" : "0";
  });
}

function look(dist: number, middle: number, o: Tokens): Look {
  const angle = Math.min(dist * STEP, Math.PI / 2);
  const face = (Math.cos(angle) - Math.cos(STEP)) / (1 - Math.cos(STEP));
  return {
    angle,
    scale: o.sideScale + (middle - o.sideScale) * face,
    back:
      dist <= 1
        ? 1 + (o.sideOpacity - 1) * dist
        : o.sideOpacity * (1 - (dist - 1) / (FADE_END - 1)),
  };
}

function place(
  col: Column,
  pos: number,
  spread: number,
  middle: number,
  o: Tokens,
  land: Land | null,
) {
  const radius = o.offset / Math.sin(STEP);
  col.cells.forEach((cell, d) => {
    let p = (((d - pos) % 10) + 10) % 10;
    if (p > 5) p -= 10;
    const dist = Math.abs(p);
    if (dist >= FADE_END) {
      cell.style.opacity = "0";
      return;
    }
    const l = look(dist, middle, o);
    // Upcoming digits sit above the middle, so the drum turns downward.
    let y = (p < 0 ? 1 : -1) * radius * Math.sin(l.angle);
    const blur =
      (o.centerBlur + (o.sideBlur - o.centerBlur) * Math.min(dist, 1)) * spread;
    const away = Math.max(0, Math.min(1, (dist - 0.3) / 0.5));
    let opacity = l.back * (1 - (1 - spread) * away);
    let scale = l.scale;
    let z = 100 - Math.round(dist * 10);
    if (land && d === col.digit) {
      y = y * land.arrive + land.lift;
      scale = land.scale;
      opacity = land.opacity;
      z = 200;
    }
    cell.style.transform = `translateY(${y.toFixed(2)}px) scale(${scale.toFixed(4)})`;
    cell.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "none";
    cell.style.opacity = opacity.toFixed(3);
    cell.style.zIndex = String(z);
  });
}

function roll(el: HTMLElement, text: string) {
  const cols = buildColumns(el, text);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (const c of cols) rest(c, c.digit);
    return () => {};
  }
  const o = readTokens(el);
  for (const c of cols) {
    rest(c, c.from);
    if (c.from === c.digit) c.done = true;
  }
  const t0 = performance.now();
  let raf = 0;
  const tick = () => {
    const t = performance.now() - t0;
    let running = false;
    cols.forEach((c, i) => {
      if (c.done) return;
      const local = t - i * o.stagger;
      if (local <= 0) {
        running = true;
        return;
      }
      const total = (c.digit - c.from + 10) % 10;
      const pos = c.from + total * o.ease(local / (total * o.stepDur));
      const enter = Math.min(1, local / ENTER_MS);
      if (c.landAt === undefined && c.from + total - pos < LAND_AT)
        c.landAt = t;
      const since = c.landAt === undefined ? -1 : t - c.landAt;
      if (since >= o.anticDur + o.landDur) {
        rest(c, c.digit);
        c.done = true;
        return;
      }
      running = true;
      const middle = 1 + (o.centerScale - 1) * enter;
      let spread = enter;
      let land: Land | null = null;
      if (since >= 0) {
        if (!c.landFrom) c.landFrom = look(c.from + total - pos, middle, o);
        const arrive = 1 - smooth(since / (o.anticDur + o.landDur * ARRIVE_AT));
        if (since < o.anticDur) {
          const a = smooth(since / o.anticDur);
          land = {
            scale: c.landFrom.scale + (o.anticScale - c.landFrom.scale) * a,
            lift: -o.anticLift * a,
            opacity: c.landFrom.back + (1 - c.landFrom.back) * a,
            arrive,
          };
        } else {
          const sp = since - o.anticDur;
          const sn = sp / o.landDur;
          const w = wave(sn);
          land = {
            scale:
              sn < 1 / 6
                ? 1 + (o.anticScale - 1) * w
                : 1 - ((o.landPeak - 1) * w) / WAVE_TROUGH,
            lift: -o.anticLift * w,
            opacity: 1,
            arrive,
          };
          spread = 1 - Math.min(1, sp / CLEAR_MS);
        }
      }
      place(c, pos, spread, middle, o, land);
    });
    if (running) raf = requestAnimationFrame(tick);
  };
  tick();
  return () => cancelAnimationFrame(raf);
}

const AchievementsSection = ({ dict }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cancels: (() => void)[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        for (const reel of section.querySelectorAll<HTMLElement>(".t-reel")) {
          cancels.push(roll(reel, reel.dataset.value ?? ""));
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      for (const cancel of cancels) cancel();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="border-y border-zinc-200 dark:border-zinc-800"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
        {profile.achievements.map((achievement) => {
          const value = achievement.value.toLocaleString(dict.locale);
          return (
            <div key={achievement.metric} className="flex flex-col">
              <span className="sr-only">
                {"prefix" in achievement && achievement.prefix}
                {value}
                {"postfix" in achievement && achievement.postfix}
              </span>
              <div
                aria-hidden="true"
                className="text-zinc-900 dark:text-zinc-50 text-3xl md:text-4xl font-semibold flex flex-row items-center tabular-nums"
              >
                {"prefix" in achievement && achievement.prefix}
                <span className="t-reel" data-value={value}>
                  {value}
                </span>
                {"postfix" in achievement && achievement.postfix}
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
                {dict[achievement.metric as keyof typeof dict]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
