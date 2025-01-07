"use client";

import { useState, useRef, useEffect, RefObject } from "react";
import { ResizeObserver } from "@juggle/resize-observer";

interface ElementSize {
  width: number;
  height: number;
}

export function useElementSize<T extends HTMLElement>(): [
  RefObject<T>,
  ElementSize
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  return [ref as RefObject<T>, size];
}
