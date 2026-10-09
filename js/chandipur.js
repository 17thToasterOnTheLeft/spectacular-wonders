(() => {
  const water = document.querySelector("#tide-water");
  const message = document.querySelector("#tide-message");
  const status = document.querySelector("#tide-status-text");
  const toggle = document.querySelector("#tide-toggle");

  if (!water || !message || !status || !toggle) return;

  const messages = [
    "A shoreline that changes dramatically.",
    "Chandipur is known for the large distance the sea can retreat during low tide.",
    "This exposes a broad intertidal area before the water returns with the rising tide.",
    "Balasore district, Odisha",
    "Always check local conditions and follow beach safety guidance before approaching the water."
  ];

  let index = 0;
  let paused = false;
  let timers = [];
  let phase = 0;

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function schedule(callback, delay) {
    timers.push(setTimeout(callback, delay));
  }

  function runCycle() {
    clearTimers();
    if (paused) return;

    phase = 0;
    status.textContent = "THE TIDE IS COMING IN";
    water.classList.remove("retreat");
    water.classList.add("returning");
    message.style.opacity = "0";

    schedule(() => {
      if (paused) return;
      phase = 1;
      status.textContent = "THE TIDE IS RETREATING";
      water.classList.remove("returning");
      water.classList.add("retreat");
    }, 5200);

    schedule(() => {
      if (paused) return;
      phase = 2;
      index = (index + 1) % messages.length;
      message.textContent = messages[index];
      message.style.opacity = "1";
      status.textContent = "MESSAGE REVEALED";
    }, 10500);

    schedule(() => {
      if (paused) return;
      phase = 3;
      status.textContent = "THE SEA RETURNS";
      water.classList.remove("retreat");
      water.classList.add("returning");
      message.style.opacity = "0";
    }, 14500);

    schedule(() => {
      if (paused) return;
      runCycle();
    }, 19800);
  }

  toggle.addEventListener("click", () => {
    paused = !paused;
    toggle.textContent = paused ? "Resume animation ▶" : "Pause animation Ⅱ";

    if (paused) {
      clearTimers();
      water.style.transition = "none";
      status.textContent = "ANIMATION PAUSED";
    } else {
      water.style.transition = "";
      runCycle();
    }
  });

  runCycle();
})();
