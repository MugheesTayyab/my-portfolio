(() => {
  const typedElements = document.querySelectorAll("[data-type-text]");

  typedElements.forEach((el) => {
    const text = el.getAttribute("data-type-text") || "";
    let index = 0;
    const write = () => {
      el.textContent = text.slice(0, index);
      index += 1;
      if (index <= text.length) setTimeout(write, 40);
    };
    setTimeout(write, 3900);
  });

  const onView = document.querySelectorAll(".typed-on-view");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      const text = entry.target.textContent || "";
      entry.target.textContent = "";
      entry.target.dataset.done = "true";
      let index = 0;
      const write = () => {
        entry.target.textContent = text.slice(0, index);
        index += 2;
        if (index <= text.length + 2) setTimeout(write, 12);
      };
      write();
    });
  }, { threshold: .45 });

  onView.forEach((el) => observer.observe(el));
})();
