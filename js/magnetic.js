(() => {
  const section = document.querySelector(".magnetic-scroll");
  const chapters = [...document.querySelectorAll(".magnetic-chapter")];
  const car = document.querySelector(".road-car");
  if (!section || !chapters.length) return;

  const update = () => {
    const rect = section.getBoundingClientRect();
    const available = Math.max(1, rect.height - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / available));
    const activeIndex = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));

    chapters.forEach((chapter, index) => {
      chapter.classList.toggle("active", index === activeIndex);
    });

    if (car) car.style.top = `${38 + progress * 28}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
