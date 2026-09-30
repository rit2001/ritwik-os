export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionTiming = {
  sectionReveal: 0.62,
  itemReveal: 0.58,
  quick: 0.22,
  stagger: 0.085,
} as const;

export const motionTravel = {
  section: 28,
  item: 22,
  compact: 14,
} as const;

export const motionViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const;
