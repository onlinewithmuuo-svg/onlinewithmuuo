"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 1. Text Scrambler Animation (Matrix Decryptor)
export function TextScrambler({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let timeout = setTimeout(() => {
      let active = true;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@%&";
      let iterations = 0;

      const interval = setInterval(() => {
        if (!active) return;

        setDisplay(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iterations) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iterations >= text.length) {
          clearInterval(interval);
        }

        iterations += 1 / 3;
      }, 30);

      return () => {
        active = false;
        clearInterval(interval);
      };
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span className="font-black">{display || " "}</span>;
}

// 2. Number Ticker (Stat Roller)
export function NumberTicker({ value, suffix = "", decimal = false }: { value: number; suffix?: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500; // ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = duration / frameRate;
    const increment = end / totalFrames;
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      start += increment;
      
      if (currentFrame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(decimal ? Math.round(start * 10) / 10 : Math.floor(start));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [value, decimal]);

  return (
    <span>
      {decimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

// 3. Floating Ambient Particles (Cyber Drift)
export function FloatingParticles({ count = 8 }: { count?: number }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: string; y: string; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate particles client-side to prevent hydration mismatch
    const generated = Array.from({ length: count }).map((_, idx) => ({
      id: idx,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2, // 2px to 6px
      delay: Math.random() * 5,
      duration: Math.random() * 15 + 10 // 10s to 25s
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald-500/25 blur-[1px]"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0px", "-120px", "0px"],
            x: ["0px", "50px", "0px"],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
