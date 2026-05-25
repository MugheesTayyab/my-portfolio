(() => {
  const canvas = document.getElementById("neural-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const nodes = [];
  let width = 0;
  let height = 0;
  let last = 0;
  let pointer = { x: -9999, y: -9999 };

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    seed();
  }

  function seed() {
    nodes.length = 0;
    const count = Math.max(34, Math.floor((width * height) / 26000));
    for (let i = 0; i < count; i += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - .5) * .18,
        vy: (Math.random() - .5) * .18,
        r: Math.random() * 2 + 1
      });
    }
  }

  function draw(time) {
    const delta = Math.min(32, time - last || 16);
    last = time;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(3, 3, 5, .32)";
    ctx.fillRect(0, 0, width, height);

    nodes.forEach((node) => {
      node.x += node.vx * delta;
      node.y += node.vy * delta;
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const nearPointer = Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) < 180;
          ctx.strokeStyle = nearPointer
            ? `rgba(255, 184, 48, ${1 - dist / 170})`
            : `rgba(0, 255, 156, ${(1 - dist / 170) * .22})`;
          ctx.lineWidth = nearPointer ? 1.4 : .7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach((node) => {
      const pulse = Math.hypot(node.x - pointer.x, node.y - pointer.y) < 160;
      ctx.fillStyle = pulse ? "#ffb830" : "#00ff9c";
      ctx.globalAlpha = pulse ? .9 : .48;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r + (pulse ? 1.5 : 0), 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    pointer = { x: event.clientX, y: event.clientY };
  });

  resize();
  requestAnimationFrame(draw);
})();
