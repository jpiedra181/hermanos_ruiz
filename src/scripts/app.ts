import { ScrollTrigger } from "./motion";
import { initSmoothScroll, initAnchorLinks } from "./smooth-scroll";
import { initReveals, initMagnetic } from "./reveal";

initSmoothScroll();
initAnchorLinks();
initReveals();
initMagnetic();

// Layout can shift once web fonts and lazy images settle.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
