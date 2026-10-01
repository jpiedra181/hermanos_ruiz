import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

export const reducedMotion = () => motionQuery.matches;

/** Fine pointer + hover: desktop-only flourishes (magnetic buttons, cursor previews). */
export const finePointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export { gsap, ScrollTrigger, SplitText };
