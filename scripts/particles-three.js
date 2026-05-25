import * as THREE from 'three';
import { ParticleTargets } from './particle-targets.js';

class ParticleUniverse {
  constructor() {
    this.canvas = document.getElementById('particle-canvas');
    this.container = document.getElementById('particle-universe');
    this.introOverlay = document.getElementById('particle-intro-overlay');
    this.introLabel = document.getElementById('particle-intro-label');
    this.introProgress = document.getElementById('particle-intro-progress');
    if (!this.canvas) return;

    this.count = window.innerWidth < 768 ? 6000 : 15000;
    this.targets = new ParticleTargets(this.count);
    this.targetCache = new Map();
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.scene = new THREE.Scene();
    const initW = this.container ? this.container.clientWidth : window.innerWidth;
    const initH = this.container ? this.container.clientHeight : window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, initW / initH, 0.1, 1000);
    this.camera.position.z = 2;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(initW, initH);

    this.isIntroMode = true;
    this.introDuration = 6500;
    this.introStartTime = null;
    this.introTargets = ['home', 'projects', 'skills', 'achievements', 'contact'];
    this.introTargetDuration = this.introDuration / this.introTargets.length;
    this.currentIntroIndex = 0;

    document.fonts.ready.then(() => {
      this.initParticles();
      this.setupEvents();
      this.animate();

      this.introStartTime = performance.now();
      this.morphToSection(this.introTargets[0]);

      setTimeout(() => {
        this.exitIntroMode();
      }, this.introDuration);
    });
  }

  initParticles() {
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(this.count * 3);
    const targetPositions = this.getTargetsForSection('home');
    const velocities = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);
    const sizes = new Float32Array(this.count);

    const colorA = new THREE.Color('#00ff9c');
    const colorB = new THREE.Color('#9d00ff');
    const colorC = new THREE.Color('#ffb830');

    for (let i = 0; i < this.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const r = Math.random();
      const color = r > 0.8 ? colorB : (r > 0.6 ? colorC : colorA);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    this.velocities = velocities;
    this.targetPositions = targetPositions;
    
    const material = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);
  }

  setupEvents() {
    this.mouse = new THREE.Vector2(-9999, -9999);
    this.raycaster = new THREE.Raycaster();
    this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    this.mouseWorld = new THREE.Vector3(0, 0, 0);

    window.addEventListener('resize', () => {
      const w = this.container ? this.container.clientWidth : window.innerWidth;
      const h = this.container ? this.container.clientHeight : window.innerHeight;
      this.camera.aspect = w / h;
      
      // Move camera back to scale down particles inside the narrow desktop sidebar!
      if (document.body.classList.contains('split-view') && window.innerWidth >= 1200) {
        this.camera.position.z = 3.6;
      } else {
        this.camera.position.z = 2.0;
      }
      
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });

    window.addEventListener('pointermove', (e) => {
      if (this.container) {
        const rect = this.container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        this.mouse.x = (mouseX / rect.width) * 2 - 1;
        this.mouse.y = -(mouseY / rect.height) * 2 + 1;
      } else {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }
      
      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.raycaster.ray.intersectPlane(this.plane, this.mouseWorld);
    });

    window.addEventListener('click', () => {
      if (!this.reduceMotion) this.triggerShockwave();
    });
  }

  triggerShockwave() {
    if (!this.points) return;
    const positions = this.points.geometry.attributes.position.array;
    for (let i = 0; i < this.count; i++) {
      const idx = i * 3;
      const dx = positions[idx] - this.mouseWorld.x;
      const dy = positions[idx + 1] - this.mouseWorld.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const force = 0.5 / (dist + 0.1);
      this.velocities[idx] += (dx / dist) * force;
      this.velocities[idx + 1] += (dy / dist) * force;
    }

    const flash = document.getElementById('glitch-flash');
    if (flash) {
      flash.classList.add('shockwave');
      flash.style.opacity = '0.3';
      setTimeout(() => {
        flash.style.opacity = '0';
        flash.classList.remove('shockwave');
      }, 100);
    }
  }

  setupSectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find(e => e.isIntersecting);
      if (visible) {
        this.morphToSection(visible.target.id);
      }
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-section]').forEach(s => observer.observe(s));
  }

  getTargetsForSection(sectionId) {
    if (this.targetCache.has(sectionId)) {
      return this.targetCache.get(sectionId);
    }

    let targets;
    switch (sectionId) {
      case 'home':
        targets = this.targets.getTextTargets('MUGHEES');
        break;
      case 'projects':
        targets = this.targets.getNeuralTargets();
        break;
      case 'skills':
        targets = this.targets.getTreeTargets();
        break;
      case 'achievements':
        targets = this.targets.getBarTargets();
        break;
      case 'contact':
        targets = this.targets.getTextTargets('@', 200);
        break;
      default:
        return this.targetCache.get('home');
    }

    if (targets) {
      this.targetCache.set(sectionId, targets);
    }
    return targets;
  }

  morphToSection(sectionId) {
    const newTargets = this.getTargetsForSection(sectionId);
    if (newTargets) {
      this.targetPositions = newTargets;
    }

    // Toggle active section indicator on body to manage vertical separation line display
    document.body.classList.toggle('on-home', sectionId === 'home');

    // Hide particles on Home section when not in intro loading mode
    if (this.container && !this.isIntroMode) {
      if (sectionId === 'home') {
        this.container.style.opacity = '0';
        this.container.style.pointerEvents = 'none';
      } else {
        this.container.style.opacity = '1';
        this.container.style.pointerEvents = 'all';
      }
    }
  }

  exitIntroMode() {
    this.isIntroMode = false;
    
    if (this.introOverlay) {
      this.introOverlay.classList.add('is-done');
    }
    document.body.classList.add('split-view');
    document.body.classList.add('on-home'); // Immediately hide vertical divider on initial load

    // Instantly recalculate canvas dimensions for the split-pane layout
    const w = this.container ? this.container.clientWidth : window.innerWidth;
    const h = this.container ? this.container.clientHeight : window.innerHeight;
    this.camera.aspect = w / h;
    
    // Zoom out particles to fit the narrow desktop sidebar completely!
    if (window.innerWidth >= 1200) {
      this.camera.position.z = 3.6;
    }
    
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    window.dispatchEvent(new Event('resize'));

    setTimeout(() => {
      if (this.introOverlay) {
        this.introOverlay.style.display = 'none';
      }

      this.setupSectionObserver();
      
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.classList.add('is-visible');
      }

      ['neural-bg', 'scanlines', 'glitch-flash', 'custom-cursor', 'matrix-rain'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.removeAttribute('hidden');
      });

      document.querySelector('.topbar')?.removeAttribute('hidden');
      document.querySelector('.github-ticker')?.removeAttribute('hidden');
      document.querySelector('.site-track')?.removeAttribute('hidden');
      document.querySelector('.mobile-nav')?.removeAttribute('hidden');
      document.querySelector('.ai-agent')?.removeAttribute('hidden');
      document.querySelector('.game-overlay')?.removeAttribute('hidden');
      document.querySelector('.compute-toast')?.removeAttribute('hidden');
    }, 800);
  }

  updateIntroUI() {
    if (!this.isIntroMode || !this.introStartTime) return;

    const elapsed = performance.now() - this.introStartTime;
    const progress = Math.min(elapsed / this.introDuration, 1);
    
    const currentTargetIndex = Math.min(
      Math.floor(elapsed / this.introTargetDuration),
      this.introTargets.length - 1
    );

    if (currentTargetIndex !== this.currentIntroIndex) {
      this.currentIntroIndex = currentTargetIndex;
      this.morphToSection(this.introTargets[currentTargetIndex]);
    }

    const labels = ['MUGHEES', 'NEURAL NET', 'TREE', 'METRICS', 'CONNECT'];
    if (this.introLabel) {
      this.introLabel.textContent = labels[currentTargetIndex] || 'INITIALIZING';
    }

    if (this.introProgress) {
      let styleEl = document.getElementById('intro-progress-style');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'intro-progress-style';
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = `.particle-intro-progress::after { width: ${progress * 100}% !important; }`;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (!this.points) return;

    if (this.isIntroMode) {
      this.updateIntroUI();
    }

    const positions = this.points.geometry.attributes.position.array;
    const time = performance.now() * 0.001;
    const moveFactor = this.reduceMotion ? 0.2 : 1.0;

    for (let i = 0; i < this.count; i++) {
      const idx = i * 3;
      
      const tx = this.targetPositions[idx];
      const ty = this.targetPositions[idx + 1];
      const tz = this.targetPositions[idx + 2];

      const dx = tx - positions[idx];
      const dy = ty - positions[idx + 1];
      const dz = tz - positions[idx + 2];

      this.velocities[idx] += dx * 0.02 * moveFactor;
      this.velocities[idx + 1] += dy * 0.02 * moveFactor;
      this.velocities[idx + 2] += dz * 0.02 * moveFactor;

      if (!this.reduceMotion) {
        const mdx = positions[idx] - this.mouseWorld.x;
        const mdy = positions[idx + 1] - this.mouseWorld.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 0.3) {
          const force = (1 - mdist / 0.3) * 0.02;
          this.velocities[idx] += (mdx / mdist) * force;
          this.velocities[idx + 1] += (mdy / mdist) * force;
        }
      }

      if (!this.reduceMotion) {
        this.velocities[idx] += Math.sin(time + i) * 0.001;
        this.velocities[idx + 1] += Math.cos(time + i) * 0.001;
      }

      positions[idx] += this.velocities[idx];
      positions[idx + 1] += this.velocities[idx + 1];
      positions[idx + 2] += this.velocities[idx + 2];

      this.velocities[idx] *= 0.9;
      this.velocities[idx + 1] *= 0.9;
      this.velocities[idx + 2] *= 0.9;
    }

    this.points.geometry.attributes.position.needsUpdate = true;
    
    if (!this.reduceMotion) {
      this.points.rotation.y = Math.sin(time * 0.2) * 0.1;
      this.points.rotation.x = Math.cos(time * 0.1) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

if (hasWebGL()) {
  new ParticleUniverse();
}
