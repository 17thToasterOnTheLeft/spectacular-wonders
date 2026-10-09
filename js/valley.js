(() => {
  const track = document.querySelector(".flower-track");
  const prev = document.querySelector("#flower-prev");
  const next = document.querySelector("#flower-next");

  if (!track) return;

  const step = () => {
    const card = track.querySelector(".flower-specimen");
    return card ? card.getBoundingClientRect().width + 20 : 310;
  };

  prev?.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });

  next?.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });
})();
