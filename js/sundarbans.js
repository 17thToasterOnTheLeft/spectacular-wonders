(() => {
  const layers = document.querySelectorAll(".sundar-layer");
  if (!layers.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("layer-in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  layers.forEach(layer => observer.observe(layer));
})();
