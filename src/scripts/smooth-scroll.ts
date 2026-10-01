import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "./motion";

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (lenis || reducedMotion()) return lenis;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    autoRaf: false,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export const getLenis = () => lenis;

export function scrollToTarget(target: HTMLElement | number) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6 });
    return;
  }
  const top =
    typeof target === "number"
      ? target
      : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: reducedMotion() ? "auto" : "smooth" });
}

export function lockScroll(locked: boolean) {
  if (lenis) locked ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/** Same-page anchors: smooth scroll + move focus to the target for keyboard/AT users. */
export function initAnchorLinks() {
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = (event.target as Element).closest<HTMLAnchorElement>("a[href*='#']");
    if (!link) return;

    const url = new URL(link.href);
    if (url.pathname !== location.pathname || !url.hash) return;

    const target =
      url.hash === "#top"
        ? document.body
        : document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    scrollToTarget(url.hash === "#top" ? 0 : target);
    history.pushState(null, "", url.hash);

    const focusable = url.hash === "#top" ? document.getElementById("main") : target;
    if (focusable) {
      if (!focusable.hasAttribute("tabindex")) focusable.setAttribute("tabindex", "-1");
      focusable.focus({ preventScroll: true });
    }
  });
}
