"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Layers3, LockKeyhole, Network, Search, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConnectedProject } from "./ConnectedProject";
import { moduleGroups, storySteps } from "./content";
import { WorkflowNarrative } from "./WorkflowNarrative";
import styles from "./landing.module.css";

interface LandingPageProps {
  onEnterApp: () => void;
}

function PreviewButton({ onClick }: { onClick: () => void }) {
  return <Button onClick={onClick} className={styles.previewButton}>Explore the preview<ArrowUpRight aria-hidden="true" /></Button>;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  const landing = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const advance = useCallback(() => setActiveStep(step => (step + 1) % storySteps.length), []);
  const selectStep = useCallback((index: number) => { setActiveStep(index); setPlaying(false); }, []);

  useEffect(() => {
    const root = landing.current;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      if (!root || reduceMotion.matches) return;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", String(range > 0 ? window.scrollY / range : 0));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduceMotion.addEventListener("change", updateProgress);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduceMotion.removeEventListener("change", updateProgress);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const root = landing.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    root.dataset.motionReady = "true";
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 }
    );
    targets.forEach(target => observer.observe(target));
    return () => {
      observer.disconnect();
      delete root.dataset.motionReady;
    };
  }, []);

  return (
    <div className={styles.landing} ref={landing}>
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <div aria-hidden="true" className={styles.scrollProgress}><span /></div>
      <header className={styles.header}>
        <div className={styles.container + " " + styles.navbar}>
          <a className={styles.brand} href="#main" aria-label="amops home"><span className={styles.brandMark}><Layers3 size={21} /></span>amops<span className={styles.brandSuffix}>/ workspace</span></a>
          <nav aria-label="Main navigation" className={styles.navLinks}><a href="#product">Product</a><a href="#workflow">How it works</a><a href="#roadmap">Roadmap</a></nav>
          <div className={styles.navActions}><ThemeToggle /><PreviewButton onClick={onEnterApp} /></div>
        </div>
      </header>
      <main id="main">
        <section className={styles.container + " " + styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <a href="#roadmap" className={styles.announcement}><span className={styles.projectDot} />In development. Starting with projects.<ArrowUpRight size={13} /></a>
            <h1 id="hero-title">From first brief<br />to final delivery.<br /><span>One connected<br className={styles.desktopBreak} /> workspace.</span></h1>
            <p>amops is being built to connect projects, docs, conversations, code activity, and client work—so your team can follow the work without losing its context.</p>
            <div className={styles.heroActions}><PreviewButton onClick={onEnterApp} /><a href="#workflow" className={styles.textLink}>See how it connects <ArrowDown size={16} /></a></div>
            <div className={styles.previewNote}><span>Interactive product preview</span><span>No account required</span></div>
          </div>
          <div className={styles.heroVisual}>
            <ConnectedProject activeStep={activeStep} playing={playing} onSelectStep={selectStep} onAdvance={advance} onTogglePlay={() => setPlaying(value => !value)} onReplay={() => { setActiveStep(0); setPlaying(true); }} />
          </div>
        </section>

        <div className={styles.container + " " + styles.manifesto} data-reveal="manifesto"><span>THE IDEA IS SIMPLE</span><p>Your work is connected.<br className={styles.mobileBreak} /> Your tools should be, too.</p><a href="#product" aria-label="Explore the product"><ArrowDown size={20} /></a></div>

        <section id="workflow" className={styles.container + " " + styles.section} aria-labelledby="workflow-title" data-reveal="section">
          <div className={styles.sectionHeading} data-reveal="heading"><div><span className={styles.eyebrow}>01 / FOLLOW THE WORK</span><h2 id="workflow-title">One project.<br /><span>Every handoff, connected.</span></h2></div><p>A brief becomes a task. A conversation shapes the solution. Code delivers it. Follow one example through the amops vision.</p></div>
          <WorkflowNarrative activeStep={activeStep} onSelectStep={selectStep} />
        </section>

        <section id="product" className={styles.container + " " + styles.section} aria-labelledby="product-title" data-reveal="section">
          <div className={styles.sectionHeading} data-reveal="heading"><div><span className={styles.eyebrow}>02 / A WORKSPACE THAT GROWS WITH YOU</span><h2 id="product-title">Start with delivery.<br /><span>Grow into operations.</span></h2></div><p>Purpose-built modules. One shared foundation. A long-term home for the work of building software and running a team.</p></div>
          <div className={styles.moduleGrid}>{moduleGroups.map(group => <article data-reveal="card" key={group.number} className={styles.moduleCard}><div className={styles.moduleTop}><group.icon size={24} /><span>{group.number}</span></div><h3>{group.title}</h3><p>{group.description}</p><ul>{group.modules.map(module => <li key={module.name}><span>{module.name}</span><span className={module.status === "Preview" ? styles.status : styles.planned}>{module.status}</span></li>)}</ul></article>)}</div>
          <div className={styles.foundation} data-reveal="foundation"><div className={styles.foundationLabel}><Layers3 size={20} /><strong>One shared foundation</strong></div><div className={styles.foundationItems}>{[{ icon: Users, label: "Identity & teams" }, { icon: LockKeyhole, label: "Permissions" }, { icon: Search, label: "Search" }, { icon: Network, label: "Events & notifications" }].map(item => <span key={item.label}><item.icon size={15} />{item.label}</span>)}</div></div>
          <p className={styles.foundationNote}>Planned shared services keep context moving between modules, within your organization.</p>
        </section>

        <section className={styles.architectureSection} aria-labelledby="architecture-title" data-reveal="section"><div className={styles.container + " " + styles.architecture}>
          <div><span className={styles.eyebrow}>03 / THOUGHTFUL FOUNDATIONS</span><h2 id="architecture-title">Engineered for developers.<br /><span>Designed to grow<br />with your team.</span></h2><p>amops is built around a modular architecture. Domain-specific tools share a core platform, with clear boundaries between organizations and a consistent experience across the workspace.</p><a className={styles.textLink} href="#roadmap">Explore where we’re headed <ArrowRight size={16} /></a></div>
          <div className={styles.architectureList}>{[{ icon: Code2, title: "An API-first approach", text: "A Django API and typed frontend contracts form the foundation for connected workflows." }, { icon: ShieldCheck, title: "Organization-scoped data", text: "PostgreSQL schemas separate tenant data. Access controls and enterprise hardening remain part of the development roadmap." }, { icon: Network, title: "Modular by design", text: "A shared core supports focused modules. Event-driven connections are designed to carry context across the platform." }].map(item => <article key={item.title}><item.icon size={22} /><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </div></section>

        <section id="roadmap" className={styles.container + " " + styles.section} aria-labelledby="roadmap-title" data-reveal="section"><div className={styles.sectionHeading} data-reveal="heading"><div><span className={styles.eyebrow}>04 / THE ROAD AHEAD</span><h2 id="roadmap-title">A big vision.<br /><span>A focused starting point.</span></h2></div><p>amops is in active development. Explore the interface today, and see how the connected workspace is planned to take shape.</p></div>
          <div className={styles.roadmapGrid}>
            <article data-reveal="card"><span className={styles.status}>Explore now</span><h3>Project workspace preview</h3><p>Try the dashboard and Kanban interface with sample data. This is a local product preview, not a connected production workspace.</p><Button variant="link" onClick={onEnterApp} className={styles.inlineButton}>Open the preview <ArrowUpRight /></Button></article>
            <article data-reveal="card"><span className={styles.planned}>Next foundation</span><h3>Connected collaboration</h3><p>Persistent project workflows, documentation, conversations, notifications, and Git integrations.</p><span className={styles.roadmapFoot}>Build the daily workflow</span></article>
            <article data-reveal="card"><span className={styles.planned}>Long-term direction</span><h3>Business, in context</h3><p>Client relationships, time tracking, contextual AI, analytics, billing, automation, and extensions.</p><span className={styles.roadmapFoot}>Grow with the team</span></article>
          </div>
        </section>

        <section className={styles.container + " " + styles.closing} data-reveal="closing"><span className={styles.eyebrow}>LESS FRAGMENTATION. MORE FORWARD.</span><h2>Make room for<br /><span>the work that matters.</span></h2><p>Take a first look at the amops workspace.</p><PreviewButton onClick={onEnterApp} /><span className={styles.closingNote}>Sample data. No account required.</span></section>
      </main>
      <footer className={styles.container + " " + styles.footer}><a className={styles.brand} href="#main"><Layers3 size={21} />amops</a><span>A connected workspace, taking shape.</span><nav aria-label="Footer navigation"><a href="#product">Product</a><a href="#roadmap">Roadmap</a><a href="#main">Back to top ↑</a></nav></footer>
    </div>
  );
}
