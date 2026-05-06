"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const onMouseEnterLink = () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.opacity = "0.6";
    };

    const onMouseLeaveLink = () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.opacity = "0.3";
    };

    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      rafId = requestAnimationFrame(animate);
    };

    animate();
    document.addEventListener("mousemove", onMouseMove);

    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-foreground pointer-events-none z-[99999] will-change-transform"
        style={{ transition: "width 0.2s, height 0.2s" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-foreground pointer-events-none z-[99998] opacity-30 will-change-transform"
        style={{ transition: "width 0.3s, height 0.3s, opacity 0.3s" }}
      />
    </>
  );
}
