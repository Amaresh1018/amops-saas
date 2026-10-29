"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, Link2, Network } from "lucide-react";
import { project, storySteps } from "./content";
import styles from "./landing.module.css";

interface WorkflowNarrativeProps {
  activeStep: number;
  onSelectStep: (index: number) => void;
}

export function WorkflowNarrative({ activeStep, onSelectStep }: WorkflowNarrativeProps) {
  const steps = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const visibleSteps = new Map<number, number>();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute("data-story-step"));
          if (entry.isIntersecting) visibleSteps.set(index, entry.intersectionRatio);
          else visibleSteps.delete(index);
        });

        const current = [...visibleSteps.entries()].sort((a, b) => b[1] - a[1])[0];
        if (current) onSelectStep(current[0]);
      },
      { rootMargin: "-28% 0px -36%", threshold: [0, 0.25, 0.5, 0.75] }
    );

    steps.current.forEach(step => step && observer.observe(step));
    return () => observer.disconnect();
  }, [onSelectStep]);

  const step = storySteps[activeStep];

  return (
    <div className={styles.workflowNarrative}>
      <aside className={styles.workflowScene} aria-label="Illustrative project workflow">
        <div className={styles.sceneMeta}>
          <span>Customer portal launch</span>
          <span>0{activeStep + 1} / 04</span>
        </div>
        <div className={styles.sceneProgress} aria-hidden="true">
          {storySteps.map((item, index) => <span key={item.id} data-active={index <= activeStep} />)}
        </div>
        <div className={styles.sceneTabs} role="group" aria-label="Workflow steps">
          {storySteps.map((item, index) => (
            <button
              aria-controls="workflow-detail"
              aria-pressed={index === activeStep}
              key={item.id}
              onClick={() => onSelectStep(index)}
              type="button"
            >
              <item.icon aria-hidden="true" size={15} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.sceneCanvas} data-story-state={activeStep}>
          <div className={styles.sceneNode} data-kind="brief"><span>Brief</span><strong>Client overview</strong></div>
          <div className={styles.sceneLink} aria-hidden="true"><Link2 size={17} /></div>
          <div className={styles.sceneNode} data-kind="task"><span>{project.task}</span><strong>Build the view</strong></div>
          <div className={styles.sceneCurrent} key={step.id}>
            <div><step.icon aria-hidden="true" size={18} /><span>{step.artifact}</span></div>
            <strong>{step.artifactTitle}</strong>
            <span>{step.result}</span>
          </div>
        </div>
        <div className={styles.sceneCaption} id="workflow-detail" aria-live="polite">
          <Network aria-hidden="true" size={15} />
          <span>{step.title}</span>
        </div>
      </aside>

      <div className={styles.storySteps}>
        {storySteps.map((item, index) => (
          <article
            className={styles.storyStep}
            data-active={index === activeStep}
            data-story-step={index}
            key={item.id}
            ref={element => { steps.current[index] = element; }}
          >
            <span className={styles.storyIndex}>0{index + 1} / {item.label}</span>
            <item.icon aria-hidden="true" size={21} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className={styles.storyEvidence}>
              <div><span>{item.artifact}</span><span>{project.task}</span></div>
              {item.lines.map(line => <p key={line}><Check aria-hidden="true" size={14} />{line}</p>)}
              <span><Link2 aria-hidden="true" size={14} />{item.context}</span>
            </div>
            <button onClick={() => onSelectStep(index)} type="button">Show this connection <ArrowUpRight aria-hidden="true" size={15} /></button>
          </article>
        ))}
      </div>
    </div>
  );
}
