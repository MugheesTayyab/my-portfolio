(() => {
  const counters = document.querySelectorAll("[data-count]");
  const formatter = new Intl.NumberFormat("en-US");

  function animate(el) {
    const target = Number(el.dataset.count || "0");
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const duration = target > 1000 ? 1400 : 900;

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${formatter.format(value)}${suffix}`;
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.counted) return;
      entry.target.dataset.counted = "true";
      animate(entry.target);
    });
  }, { threshold: .55 });

  counters.forEach((counter) => observer.observe(counter));
})();
