(() => {
  const overlay = document.getElementById('game-overlay');
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas?.getContext('2d');
  const closeBtn = document.querySelector('.game-close');
  const joystickBtn = document.getElementById('game-mode-toggle');
  const statCollected = document.getElementById('collect-count');

  if (!canvas || !ctx) return;

  // Game State
  let isActive = false;
  let animationId = null;
  const player = {
    x: 100,
    y: 100,
    w: 24,
    h: 32,
    speed: 4,
    vx: 0,
    vy: 0,
    color: '#00ff9c',
    collected: new Set(JSON.parse(localStorage.getItem('mughees_collectibles') || '[]'))
  };

  const rooms = [
    { id: 'home', label: 'HOME', x: 50, y: 150, w: 150, h: 100, target: '#home', color: 'rgba(0, 255, 156, 0.1)' },
    { id: 'about', label: 'ABOUT', x: 250, y: 350, w: 150, h: 100, target: '#about', color: 'rgba(157, 0, 255, 0.1)' },
    { id: 'projects', label: 'PROJECTS', x: 450, y: 150, w: 180, h: 120, target: '#projects', color: 'rgba(255, 184, 48, 0.1)' },
    { id: 'skills', label: 'SKILLS', x: 700, y: 350, w: 150, h: 100, target: '#skills', color: 'rgba(0, 200, 255, 0.1)' },
    { id: 'contact', label: 'CONTACT', x: 700, y: 100, w: 150, h: 80, target: '#contact', color: 'rgba(255, 45, 85, 0.1)' }
  ];

  const collectibles = [
    { id: 'transformer', label: 'Transformer', x: 125, y: 200 },
    { id: 'cpp', label: 'main.cpp', x: 325, y: 400 },
    { id: 'rag', label: 'RAG Shard', x: 540, y: 210 },
    { id: 'growth', label: '30M Pulse', x: 775, y: 400 },
    { id: 'asm', label: 'x86 Reg', x: 775, y: 140 }
  ];

  const keys = {};

  function updateCollectCount() {
    if (statCollected) statCollected.textContent = player.collected.size;
    localStorage.setItem('mughees_collectibles', JSON.stringify([...player.collected]));
    
    if (player.collected.size === collectibles.length) {
      document.dispatchEvent(new CustomEvent('portfolio:hire_unlocked'));
    }
  }

  function toggleGame(force) {
    isActive = force !== undefined ? force : !isActive;
    overlay.classList.toggle('is-active', isActive);
    
    if (isActive) {
      document.body.style.overflow = 'hidden';
      resize();
      updateCollectCount();
      loop();
    } else {
      document.body.style.overflow = '';
      if (animationId) cancelAnimationFrame(animationId);
    }
    
    document.dispatchEvent(new CustomEvent('portfolio:glitch'));
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.w &&
           rect1.x + rect1.w > rect2.x &&
           rect1.y < rect2.y + rect2.h &&
           rect1.y + rect1.h > rect2.y;
  }

  function update() {
    player.vx = 0;
    player.vy = 0;

    if (keys['ArrowUp'] || keys['w']) player.vy = -player.speed;
    if (keys['ArrowDown'] || keys['s']) player.vy = player.speed;
    if (keys['ArrowLeft'] || keys['a']) player.vx = -player.speed;
    if (keys['ArrowRight'] || keys['d']) player.vx = player.speed;

    player.x += player.vx;
    player.y += player.vy;

    // Boundary check
    player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.h, player.y));

    // Room collision (Interaction)
    rooms.forEach(room => {
      if (checkCollision(player, room)) {
        if (keys[' '] || keys['Enter']) {
          toggleGame(false);
          const target = document.querySelector(room.target);
          if (target) {
            const track = document.getElementById('site-track');
            if (window.innerWidth >= 1200 && track) {
              track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    });

    // Collectibles collision
    collectibles.forEach(item => {
      if (!player.collected.has(item.id)) {
        const dist = Math.hypot(player.x + player.w/2 - item.x, player.y + player.h/2 - item.y);
        if (dist < 20) {
          player.collected.add(item.id);
          updateCollectCount();
          document.dispatchEvent(new CustomEvent('portfolio:glitch'));
        }
      }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid
    ctx.strokeStyle = 'rgba(0, 255, 156, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Draw Rooms
    rooms.forEach(room => {
      ctx.fillStyle = room.color;
      ctx.fillRect(room.x, room.y, room.w, room.h);
      ctx.strokeStyle = 'rgba(0, 255, 156, 0.3)';
      ctx.strokeRect(room.x, room.y, room.w, room.h);
      
      ctx.fillStyle = '#00ff9c';
      ctx.font = '10px "JetBrains Mono"';
      ctx.fillText(room.label, room.x + 5, room.y + 15);
      
      if (checkCollision(player, room)) {
        ctx.fillText('[SPACE] TO ENTER', room.x + 5, room.y + room.h - 10);
      }
    });

    // Draw Collectibles
    collectibles.forEach(item => {
      if (!player.collected.has(item.id)) {
        ctx.fillStyle = '#ffb830';
        ctx.beginPath();
        ctx.arc(item.x, item.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.font = '8px "JetBrains Mono"';
        ctx.fillText(item.label, item.x - 10, item.y - 10);
      }
    });

    // Draw Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(player.x, player.y, player.w, player.h);
    
    // Player Face
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x + 4, player.y + 8, 4, 4);
    ctx.fillRect(player.x + 16, player.y + 8, 4, 4);
  }

  function loop() {
    update();
    draw();
    animationId = requestAnimationFrame(loop);
  }

  // Events
  window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === 'Escape' && isActive) toggleGame(false);
  });
  window.addEventListener('keyup', e => keys[e.key] = false);
  
  joystickBtn?.addEventListener('click', () => toggleGame());
  closeBtn?.addEventListener('click', () => toggleGame(false));
  window.addEventListener('resize', resize);

  // Secret command listener
  document.addEventListener('portfolio:sudo_game', () => toggleGame(true));
  
  // Expose toggle for other scripts
  window.toggleGameMode = toggleGame;

})();
