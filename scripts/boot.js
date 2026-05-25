(() => {
  const screen = document.getElementById("boot-screen");
  const output = document.getElementById("boot-output");
  if (!screen || !output) return;

  const lines = [
    "> INITIALIZING MUGHEES_OS v2026...",
    "> LOADING AI_MODULES............[OK]",
    "> MOUNTING ALGORITHMS...........[OK]",
    "> CONNECTING NEURAL_NET.........[OK]",
    "> HELLO, WORLD."
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function tick() {
    if (lineIndex >= lines.length) {
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent("portfolio:glitch"));
        screen.classList.add("done");
      }, 520);
      return;
    }

    const current = lines[lineIndex];
    output.textContent += current[charIndex] || "";
    charIndex += 1;

    if (charIndex > current.length) {
      output.textContent += "\n";
      charIndex = 0;
      lineIndex += 1;
      setTimeout(tick, 220);
      return;
    }

    setTimeout(tick, 22);
  }

  setTimeout(tick, 200);
})();
