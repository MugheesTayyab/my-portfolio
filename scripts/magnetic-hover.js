(() => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 899px)");
  if (mq.matches) return;

  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  let rafId = null;
  const elements = [];

  function collectElements() {
    elements.length = 0;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      elements.push({ el, strength: el.dataset.magnetic || "medium" });
    });
  }

  collectElements();

  const strengthMap = {
    light: { radius: 80, max: 5 },
    medium: { radius: 120, max: 12 },
    strong: { radius: 140, max: 20 },
  };

  function onPointerMove(e) {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const px = e.clientX;
      const py = e.clientY;

      for (let i = 0; i < elements.length; i++) {
        const { el, strength } = elements[i];
        const { radius, max } = strengthMap[strength] || strengthMap.medium;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          const force = 1 - dist / radius;
          const mx = (dx / dist) * max * force;
          const my = (dy / dist) * max * force;
          const tiltX = (dy / dist) * force * 4;
          const tiltY = -(dx / dist) * force * 4;
          el.style.setProperty("--magnet-x", `${mx}px`);
          el.style.setProperty("--magnet-y", `${my}px`);
          el.style.setProperty("--tilt-x", `${tiltX}deg`);
          el.style.setProperty("--tilt-y", `${tiltY}deg`);
        } else {
          el.style.setProperty("--magnet-x", "0");
          el.style.setProperty("--magnet-y", "0");
          el.style.setProperty("--tilt-x", "0");
          el.style.setProperty("--tilt-y", "0");
        }
      }
    });
  }

  let active = true;
  document.addEventListener("pointermove", onPointerMove);

  mq.addEventListener("change", (e) => {
    if (e.matches) {
      active = false;
      document.removeEventListener("pointermove", onPointerMove);
    } else if (!active) {
      active = true;
      collectElements();
      document.addEventListener("pointermove", onPointerMove);
    }
  });
})();
