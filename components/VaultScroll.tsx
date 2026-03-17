"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 192;
const FRAME_PATH = (i: number) =>
  `/vault-frames/frame-${String(i + 1).padStart(4, "0")}.jpg`;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

interface VaultScrollProps {
  children?: ReactNode;
  onProgressChange?: (progress: number) => void;
  sectionClassName?: string;
}

export default function VaultScroll({
  children,
  onProgressChange,
  sectionClassName = "relative h-[400vh] bg-white",
}: VaultScrollProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(-1);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function preload() {
      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = FRAME_PATH(i);
          img.onload = () => {
            imagesRef.current[i] = img;
            resolve();
          };
          img.onerror = reject;
        });
      });

      await Promise.all(promises);
      if (!cancelled) setReady(true);
    }

    preload().catch(console.error);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const activeCanvas = canvas;
    const activeSection = section;

    const ctx = activeCanvas.getContext("2d");
    if (!ctx) return;
    const activeCtx = ctx;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      activeCanvas.width = w * dpr;
      activeCanvas.height = h * dpr;
      activeCanvas.style.width = `${w}px`;
      activeCanvas.style.height = `${h}px`;
      activeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawFrame(0);
    }

    function drawImageCover(img: HTMLImageElement) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const imgRatio = img.width / img.height;
      const viewRatio = vw / vh;

      let drawWidth = vw;
      let drawHeight = vh;
      let x = 0;
      let y = 0;

      if (imgRatio > viewRatio) {
        drawHeight = vh;
        drawWidth = vh * imgRatio;
        x = (vw - drawWidth) / 2;
      } else {
        drawWidth = vw;
        drawHeight = vw / imgRatio;
        y = (vh - drawHeight) / 2;
      }

      activeCtx.clearRect(0, 0, vw, vh);
      activeCtx.drawImage(img, x, y, drawWidth, drawHeight);
    }

    function drawFrame(index: number) {
      const img = imagesRef.current[index];
      if (!img) return;
      drawImageCover(img);
    }

    function update() {
      const rect = activeSection.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      const p = clamp(-rect.top / maxScroll, 0, 1);
      if (p !== lastProgressRef.current) {
        lastProgressRef.current = p;
        onProgressChange?.(p);
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(p * (TOTAL_FRAMES - 1))
      );

      drawFrame(frameIndex);
    }

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    resize();
    update();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onProgressChange, ready]);

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {children}

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">
              Loading vault
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
