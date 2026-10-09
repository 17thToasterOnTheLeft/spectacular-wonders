(() => {
  const canvas = document.querySelector("#water-particles");
  const hero = document.querySelector("#water-hero");
  if (!canvas || !hero) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = { x: -1000, y: -1000 };
  let particles = [];
  let width = 0;
  let height = 0;
  let frame = 0;

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(150, Math.floor(width * height / 8000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + .5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * .45 + .1
    }));
    draw(0);
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      if (!reduceMotion) {
        p.y -= p.speed * .35;
        p.x += Math.sin(time * .0004 + p.phase) * .22;
        if (p.y < -5) p.y = height + 5;
      }

      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const glow = Math.max(0, 1 - distance / 180);
      const alpha = .15 + (Math.sin(time * .001 + p.phase) + 1) * .2 + glow * .65;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + glow * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(93,239,255,${Math.min(alpha, .95)})`;
      ctx.shadowBlur = 8 + glow * 18;
      ctx.shadowColor = "#22dfff";
      ctx.fill();
    });

    ctx.shadowBlur = 0;
    if (!reduceMotion) frame = requestAnimationFrame(draw);
  }

  hero.addEventListener("pointermove", event => {
    const rect = hero.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  });

  hero.addEventListener("pointerleave", () => {
    pointer.x = -1000;
    pointer.y = -1000;
  });

  window.addEventListener("resize", resize);
  resize();

  if (!reduceMotion) frame = requestAnimationFrame(draw);
  window.addEventListener("pagehide", () => cancelAnimationFrame(frame), { once: true });
})();
