import { gsap, SplitText, reducedMotion, finePointer } from "./motion";

/**
 * Declarative scroll reveals:
 *  data-reveal="lines"  → masked line-by-line rise (headings only: SplitText labels them for AT)
 *  data-reveal="fade"   → soft rise + fade
 *  data-reveal="stagger"→ children rise one after another
 *  data-reveal="clip"   → image wipe from bottom with a slow zoom-out
 * Optional data-delay="0.2".
 */
export function initReveals() {
  if (reducedMotion()) return;

  const delayOf = (el: HTMLElement) => Number(el.dataset.delay ?? 0);

  document.querySelectorAll<HTMLElement>("[data-reveal='lines']").forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 115,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.09,
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }),
    });
  });

  document.querySelectorAll<HTMLElement>("[data-reveal='fade']").forEach((el) => {
    gsap.from(el, {
      y: 48,
      autoAlpha: 0,
      duration: 1.3,
      ease: "expo.out",
      delay: delayOf(el),
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  document.querySelectorAll<HTMLElement>("[data-reveal='stagger']").forEach((el) => {
    gsap.from(el.children, {
      y: 40,
      autoAlpha: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.08,
      delay: delayOf(el),
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  document.querySelectorAll<HTMLElement>("[data-reveal='clip']").forEach((el) => {
    const media = el.querySelector("img, picture, canvas");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      delay: delayOf(el),
    });
    tl.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
    );
    if (media) tl.from(media, { scale: 1.25, duration: 2.2, ease: "expo.out" }, 0.2);
  });
}

/** Buttons that lean towards the cursor. */
export function initMagnetic() {
  if (reducedMotion() || !finePointer()) return;

  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const strength = Number(el.dataset.magnetic) || 0.3;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    el.addEventListener("pointerleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}
