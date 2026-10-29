"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type Mesh } from "three";

function Connection({ activeStep, color }: { activeStep: number; color: string }) {
  const { invalidate } = useThree();
  const tiles = useRef<(Mesh | null)[]>([]);
  const marker = useRef<Mesh>(null);
  const progress = useRef(0);
  const previous = useRef(activeStep);
  const source = useRef(activeStep);
  useEffect(() => {
    source.current = previous.current;
    previous.current = activeStep;
    progress.current = 0;
    invalidate();
  }, [activeStep, invalidate]);
  useFrame((_, delta) => {
    progress.current = Math.min(1, progress.current + Math.min(delta, 0.05));
    const eased = 1 - Math.pow(1 - progress.current, 3);
    tiles.current.forEach((tile, index) => {
      if (!tile) return;
      const target = index === activeStep ? 0.32 : 0;
      tile.position.y += (target - tile.position.y) * Math.min(delta * 10, 1);
      tile.rotation.z = index === activeStep ? Math.sin(progress.current * Math.PI) * 0.12 : 0;
    });
    if (marker.current) {
      marker.current.position.set(-2.7 + (source.current + (activeStep - source.current) * eased) * 1.8, 0.5 + Math.sin(eased * Math.PI) * 0.35, 0.15);
    }
    if (progress.current < 1) invalidate();
  });
  return <>
    <ambientLight intensity={2} />
    <directionalLight position={[2, 5, 4]} intensity={3} />
    <mesh position={[0, -0.15, 0]}><boxGeometry args={[6.4, 0.05, 0.04]} /><meshBasicMaterial color={color} transparent opacity={0.45} /></mesh>
    {[0, 1, 2, 3].map(index => <mesh key={index} ref={node => { tiles.current[index] = node; }} position={[-2.7 + index * 1.8, 0, 0]} rotation={[0, 0.15, 0]}>
      <boxGeometry args={[1.15, 0.18, 0.8]} />
      <meshStandardMaterial color={color} metalness={0.35} roughness={0.3} transparent opacity={index === activeStep ? 1 : 0.35} />
    </mesh>)}
    <mesh ref={marker}><octahedronGeometry args={[0.16]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} /></mesh>
  </>;
}

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
  return () => observer.disconnect();
}

function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);
  return null;
}

export default function ConnectedProjectScene({ activeStep, onFailure }: { activeStep: number; onFailure: () => void }) {
  const color = useSyncExternalStore(subscribeTheme, () => getComputedStyle(document.documentElement).getPropertyValue("--primary").trim(), () => "");
  if (!color) return null;
  return <Canvas frameloop="demand" dpr={[1, 1.5]} orthographic camera={{ position: [0, 3, 6], zoom: 65 }} gl={{ alpha: true, antialias: true }} fallback={null}><ContextGuard onFailure={onFailure} /><Connection activeStep={activeStep} color={color} /></Canvas>;
}
