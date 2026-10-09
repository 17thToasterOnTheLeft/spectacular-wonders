(() => {
  const hero = document.querySelector(".home-hero");
  if (!hero || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let scheduled = false;

  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;

    requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, 500);
      hero.style.setProperty("--scroll-shift", `${y * 0.12}px`);
      scheduled = false;
    });
  }, { passive: true });
})();
