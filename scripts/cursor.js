(() => {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  let lastParticle = 0;

  window.addEventListener("pointermove", (event) => {
    cursor.style.transform = `translate(${event.clientX + 8}px, ${event.clientY + 8}px)`;

    const now = performance.now();
    if (now - lastParticle < 38 || window.innerWidth < 1200) return;
    lastParticle = now;

    const particle = document.createElement("span");
    particle.className = "cursor-particle";
    particle.style.left = `${event.clientX}px`;
    particle.style.top = `${event.clientY}px`;
    document.body.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove(), { once: true });
  });
})();
