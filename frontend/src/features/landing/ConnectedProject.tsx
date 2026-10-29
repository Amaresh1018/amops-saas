"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Link2, Layers3, Pause, Play, RotateCcw } from "lucide-react";
import { project, storySteps } from "./content";
import styles from "./landing.module.css";

const Scene = dynamic(() => import("./ConnectedProjectScene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function ConnectedProject({ activeStep, playing, onSelectStep, onAdvance, onTogglePlay, onReplay }: { activeStep: number; playing: boolean; onSelectStep: (index: number) => void; onAdvance: () => void; onTogglePlay: () => void; onReplay: () => void }) {
  const step = storySteps[activeStep];
  const container = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 768px)");
    let inView = false;
    const update = () => {
      setVisible(inView && !document.hidden && !motion.matches);
      setEnhanced(desktop.matches && !motion.matches);
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(element);
    motion.addEventListener("change", update);
    desktop.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); motion.removeEventListener("change", update); desktop.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);

  useEffect(() => {
    if (!visible || !playing) return;
    const timer = setTimeout(onAdvance, 5000);
    return () => clearTimeout(timer);
  }, [visible, playing, activeStep, onAdvance]);

  return (
    <div ref={container} className={styles.projectGraphic} data-step={activeStep}>
      <div className={styles.graphicHeading}><span><Layers3 size={14} /> ONE CONNECTED PROJECT</span><span>Illustrative workflow</span></div>
      <div className={styles.graphicStage}>
        <div className={styles.connectionLines} aria-hidden="true" />
        {enhanced && visible && !failed && <div className={styles.scene} aria-hidden="true"><SceneBoundary><Scene activeStep={activeStep} onFailure={() => setFailed(true)} /></SceneBoundary></div>}
        <div className={styles.projectLabel}><span className={styles.projectDot} />{project.name}<ArrowUpRight size={14} /></div>
        <article className={styles.artifactCard} key={step.id}>
          <div className={styles.artifactType}><step.icon size={16} /><span>{step.artifact}</span><span className={styles.miniNumber}>0{activeStep + 1}</span></div>
          <h3>{step.artifactTitle}</h3>
          <p>{step.detail}</p>
          <div className={styles.artifactLines}>{step.lines.map(line => <div key={line}><Check size={13} /><span>{line}</span></div>)}</div>
          <div className={styles.artifactFooter}><Link2 size={13} />Linked to {project.task}<span className={styles.avatar}>JD</span></div>
        </article>
        <div className={styles.taskCard}><div><span className={styles.ticketId}>{project.task}</span><span className={styles.status}>{step.status}</span></div><h3>{project.taskTitle}</h3><div className={styles.taskBottom}><span><Layers3 size={13} /> Customer portal</span><span className={styles.avatar}>AK</span></div></div>
        <div className={styles.connectionTag}><Link2 size={14} /><span>{step.result}</span></div>
        <div className={styles.stageLabels} role="group" aria-label="Explore the project journey">{storySteps.map((item, index) => <button type="button" key={item.id} aria-pressed={index === activeStep} onClick={() => onSelectStep(index)}><item.icon size={14} aria-hidden="true" />{item.label}</button>)}</div>
      </div>
      <div className={styles.graphicFooter}><span>0{activeStep + 1} / 04 · {step.context}</span><div className={styles.playbackControls}><button onClick={onTogglePlay} aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}>{playing ? <Pause size={14} /> : <Play size={14} />}<span>{playing ? "Pause" : "Play"}</span></button><button onClick={onReplay} aria-label="Replay walkthrough"><RotateCcw size={14} /></button></div></div>
    </div>
  );
}
