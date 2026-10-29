---
name: rocket-saas-motion-design
description: >-
  Motion design, micro-animations, and high-converting visual techniques reverse-engineered
  from Rocket SaaS (rocket-saas.io). Includes scroll-triggered stagger reveals, cinematic
  intro-to-loop video playback, continuous infinite marquees, parallax depth layers,
  and container squeeze effects adapted for Next.js, React, and Tailwind CSS.
---

# Rocket SaaS Motion Design & High-Converting UI Engine

This skill documents the complete visual architecture, animation systems, and styling patterns reverse-engineered from **Rocket SaaS** (`https://rocket-saas.io/`). It translates legacy WordPress/jQuery techniques into production-grade **Next.js 16 (React 19) + Tailwind CSS + Framer Motion / CSS primitives**.

---

## 1. Core Architectural Pillars (What Rocket SaaS Uses)

| Technique | Rocket SaaS Implementation | Modern Next.js / Tailwind Equivalent |
| :--- | :--- | :--- |
| **Scroll Reveals** | `IntersectionObserver` observing `.os-animation` with `dataset.osAnimationDelay` | Framer Motion `whileInView` or CSS `IntersectionObserver` hook with Tailwind stagger utilities |
| **Infinite Marquee** | Splide AutoScroll & `infiniteslidev2.js` | CSS `@keyframes marquee` ticker with `pause-on-hover` and `will-change: transform` |
| **Hero Video** | Dual video elements (`video1` intro $\to$ `video2` seamless loop) | React `<video>` component with `onEnded` crossfade or unified loop state |
| **Container Pinch** | Scroll listener computing margin compression (`0%` $\to$ `1.5%`) | Framer Motion `useScroll()` $\to$ `useTransform(scrollYProgress, [0, 0.3], ["0%", "1.5%"])` |
| **Parallax Depth** | `jquery.paroller.js` translating foreground illustrations | CSS `transform: translateY(calc(var(--scroll) * factor))` or Framer Motion parallax |
| **Lottie Vectors** | Bodymovin JSON animations with segment looping | `@lottiefiles/dotlottie-react` or lightweight SVG keyframe animations |
| **Grid Lines** | Dotted lines with drop shadow overlays (`.line-vertical`) | Tailwind SVG background grid with CSS radial-gradient mask |

---

## 2. Animation Systems & Code Recipes

### 2.1 Staggered Scroll-Triggered Reveal System

Rocket SaaS uses a 20% viewport threshold (`threshold: 0.2`) to trigger entrance animations early, staggering elements by `0.1s` intervals across grid columns.

```tsx
// frontend/src/components/motion/ScrollReveal.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fadeInUp" | "fadeIn" | "scaleUp";
  delayMs?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  animation = "fadeInUp",
  delayMs = 0,
  className = "",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animationClass = {
    fadeInUp: isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-6",
    fadeIn: isVisible ? "opacity-100" : "opacity-0",
    scaleUp: isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
  }[animation];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${animationClass} ${className}`}
    >
      {children}
    </div>
  );
}
```

---

### 2.2 Continuous Infinite Marquee / Logo Ribbon

Rocket SaaS uses an uninterrupted linear ticker for client badges, logos, and testimonials:

```tsx
// frontend/src/components/motion/InfiniteMarquee.tsx
"use client";

import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speedSec?: number;
  pauseOnHover?: boolean;
}

export function InfiniteMarquee({
  children,
  speedSec = 30,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] ${
        pauseOnHover ? "hover:[&_.marquee-track]:[animation-play-state:paused]" : ""
      }`}
    >
      <div
        className="marquee-track flex w-max gap-8 animate-marquee"
        style={{ animationDuration: `${speedSec}s` }}
      >
        {children}
        {/* Cloned set for zero-gap seamless infinite loop */}
        <div aria-hidden="true" className="flex gap-8">
          {children}
        </div>
      </div>
    </div>
  );
}
```

**Tailwind Animation Token (add to `globals.css` or Tailwind theme):**
```css
@keyframes marquee {
  from { transform: translateX(0%); }
  to { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee linear infinite;
}
```

---

### 2.3 Cinematic Intro-to-Loop Video Transition

Rocket SaaS plays an impactful 3-5 second introduction video once, then silently switches to a looping idle video with zero buffering or jump-cuts:

```tsx
// frontend/src/components/motion/HeroCinematicVideo.tsx
"use client";

import React, { useRef, useState } from "react";

interface HeroVideoProps {
  introSrc: string;
  loopSrc: string;
  poster?: string;
}

export function HeroCinematicVideo({ introSrc, loopSrc, poster }: HeroVideoProps) {
  const [hasIntroFinished, setHasIntroFinished] = useState(false);
  const loopVideoRef = useRef<HTMLVideoElement>(null);

  const handleIntroEnded = () => {
    setHasIntroFinished(true);
    loopVideoRef.current?.play().catch(() => {});
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/60 shadow-2xl bg-card">
      {/* Intro Video (Plays Once) */}
      {!hasIntroFinished && (
        <video
          autoPlay
          muted
          playsInline
          poster={poster}
          onEnded={handleIntroEnded}
          className="w-full h-full object-cover transition-opacity duration-500"
        >
          <source src={introSrc} type="video/mp4" />
        </video>
      )}

      {/* Looping Ambient Video */}
      <video
        ref={loopVideoRef}
        muted
        loop
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          hasIntroFinished ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      >
        <source src={loopSrc} type="video/mp4" />
      </video>
    </div>
  );
}
```

---

### 2.4 Scroll-Driven Viewport Container Pinch ("Card Elevation")

Rocket SaaS compresses the outer hero section margins from `0%` to `1.5%` as the user scrolls, creating the psychological perception that the page is elevating into a physical container card:

```tsx
// In React / Next.js with Framer Motion:
import { motion, useScroll, useTransform } from "framer-motion";

export function PinchingContainer({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const marginX = useTransform(scrollYProgress, [0, 0.25], ["0%", "1.5%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.25], ["0px", "24px"]);

  return (
    <motion.div
      style={{ marginLeft: marginX, marginRight: marginX, borderRadius }}
      className="overflow-hidden transition-shadow duration-300"
    >
      {children}
    </motion.div>
  );
}
```

---

## 3. Visual Styling & Color System Rules

1. **Deep Cosmic Canvases:**
   - Rocket SaaS uses deep obsidian / indigo violet (`#0B0C1E`, `#110D26`) rather than generic neutral gray `#111827`.
   - Cards are elevated with subtle border hairlines (`rgba(255, 255, 255, 0.08)`) and ambient backdrop blurs (`backdrop-blur-xl`).
2. **Vibrant Highlight Spans:**
   - Headlines always incorporate a `<span className="color">` accent that turns key value propositions into radiant colored text (e.g., gradient coral or soft electric indigo).
3. **Architectural Grid Guides:**
   - Subtle vertical background lines give interfaces the visual structure of a CAD or engineering dashboard.
4. **Interactive Hover Cards:**
   - Interactive cards use subtle translateY lifts (`hover:-translate-y-1.5 transition-transform duration-300`) and soft ambient glow borders (`hover:border-primary/40`).

---

## 4. Application to NEXUS DevOS

When crafting pages, dashboards, modals, or features in NEXUS:
- Use **staggered scroll reveals** for dashboard widget grids.
- Use **continuous infinite marquees** for integrated tool ribbons (e.g. GitHub, Docker, Kubernetes, Jira, Slack integrations).
- Apply **subtle container elevation and scale-ins** when modals and drawers open.
- Maintain **100% Lucide icon consistency** and **shadcn/ui accessibility standards**.
