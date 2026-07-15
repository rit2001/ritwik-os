"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

import { motionEase } from "./motionTokens";

export function MotionProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: motionEase }}>
      {children}
    </MotionConfig>
  );
}
