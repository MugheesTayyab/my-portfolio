(() => {
  const flash = document.getElementById("glitch-flash");
  const toast = document.getElementById("compute-toast");
  const matrix = document.getElementById("matrix-rain");
  let idleTimer = 0;

  function glitch() {
    if (!flash) return;
    flash.classList.remove("active");
    void flash.offsetWidth;
    flash.classList.add("active");
  }

  function compute() {
    if (!toast) return;
    toast.classList.remove("active");
    void toast.offsetWidth;
    toast.classList.add("active");
  }

  function resetIdle() {
    clearTimeout(idleTimer);
    matrix?.classList.remove("active");
    idleTimer = window.setTimeout(() => matrix?.classList.add("active"), 30000);
  }

  document.addEventListener("portfolio:glitch", glitch);
  window.setInterval(glitch, 15000);
  window.addEventListener("pointermove", resetIdle);
  window.addEventListener("keydown", resetIdle);
  resetIdle();

  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      glitch();
      compute();
    });
  });

  document.querySelectorAll(".source-link").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = `> ${button.dataset.source}`;
      compute();
      setTimeout(() => {
        button.textContent = "> view_source()";
      }, 1700);
    });
  });
})();
