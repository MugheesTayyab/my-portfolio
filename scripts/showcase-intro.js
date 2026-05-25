import * as THREE from 'three';

class ShowcaseIntro {
  constructor() {
    this.introDuration = 12000;
    this.visualizationTime = 1800;
    this.introTargets = ['home', 'projects', 'skills', 'achievements', 'contact'];
    this.currentIndex = 0;
    this.isShowingBox = false;
    this.init();
  }
  
  init() {
    this.createElements();
    this.setupThreeJS();
    this.initParticles();
    
    document.fonts.ready.then(() => {
      this.startSequence();
    });
    
    this.animate();
  }
  
  startSequence() {
    setTimeout(() => this.showName(), 500);
    setTimeout(() => this.showBadges(), 1500);
    
    this.showNextVisualization();
  }
  
  showNextVisualization() {
    if (this.currentIndex >= this.introTargets.length) {
      setTimeout(() => this.endIntro(), 1500);
      return;
    }
    
    const section = this.introTargets[this.currentIndex];
    this.morphToSection(section);
    
    this.currentIndex++;
    setTimeout(() => this.showNextVisualization(), this.visualizationTime);
  }
  
  createElements() {
    if (document.getElementById('showcase-intro')) return;
    
    const html = `
      <div class="showcase-intro" id="showcase-intro">
        <canvas id="showcase-canvas"></canvas>
        <div class="showcase-header">
          <div class="showcase-logo">MUGHEES</div>
          <nav class="showcase-nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div class="showcase-overlay">
          <div class="showcase-name" id="showcase-name">MUGHEES</div>
          <div class="showcase-subtitle" id="showcase-subtitle">AI ENGINEER</div>
          <div class="showcase-badges" id="showcase-badges">
            <div class="showcase-badge">
              <span class="badge-num">30M+</span>
              <span class="badge-label">VIEWS REACHED</span>
            </div>
            <div class="showcase-badge">
              <span class="badge-num">GENAI</span>
              <span class="badge-label">CERTIFIED</span>
            </div>
          </div>
        </div>
        <div class="showcase-progress" id="progress-dots">
          ${this.introTargets.map((_, i) => `<div class="progress-dot${i === 0 ? ' active' : ''}"></div>`).join('')}
        </div>
        <div class="showcase-info">
          <div class="showcase-hint"><span>▼</span> watch particles assemble</div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
    `;
    document.head.appendChild(style);
  }
  
  setupThreeJS() {
    this.canvas = document.getElementById('showcase-canvas');
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 2;
    this.camera.position.y = -0.45; // Shift particles to the top half of the screen

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.1;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.1;
      this.camera.position.x += (x - this.camera.position.x) * 0.05;
      this.camera.position.y += (-0.45 - y - this.camera.position.y) * 0.05; // Preserve the Y-offset during mouse sways
    });
  }
  
  initParticles() {
    this.count = window.innerWidth < 768 ? 5000 : 12000;
    
    this.geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.count * 3);
    this.targets = new Float32Array(this.count * 3);
    
    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;
      this.positions[i3] = (Math.random() - 0.5) * 4;
      this.positions[i3 + 1] = (Math.random() - 0.5) * 4;
      this.positions[i3 + 2] = (Math.random() - 0.5) * 2;
      
      this.targets[i3] = (Math.random() - 0.5) * 3;
      this.targets[i3 + 1] = (Math.random() - 0.5) * 3;
      this.targets[i3 + 2] = (Math.random() - 0.5) * 1;
    }
    
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x8EB8E8,
      size: 0.015,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    this.particles = new THREE.Points(this.geometry, material);
    this.scene.add(this.particles);
  }
  
  morphToSection(section) {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
    
    this.targets = this.getSectionTargets(section);
  }
  
  getSectionTargets(section) {
    const patterns = {
      home: () => {
        const targets = new Float32Array(this.count * 3);
        for (let i = 0; i < this.count; i++) {
          const i3 = i * 3;
          const x = (Math.random() - 0.5) * 2;
          const y = (Math.random() - 0.5) * 1.5;
          const z = (Math.random() - 0.5) * 0.5;
          targets[i3] = x;
          targets[i3 + 1] = y;
          targets[i3 + 2] = z;
        }
        return targets;
      },
      projects: () => {
        const targets = new Float32Array(this.count * 3);
        for (let i = 0; i < this.count; i++) {
          const i3 = i * 3;
          const col = i % 4;
          const row = Math.floor(i / 4) % 3;
          const x = (col - 1.5) * 0.8 + (Math.random() - 0.5) * 0.3;
          const y = (row - 1) * 0.6 + (Math.random() - 0.5) * 0.2;
          const z = (Math.random() - 0.5) * 0.3;
          targets[i3] = x;
          targets[i3 + 1] = y;
          targets[i3 + 2] = z;
        }
        return targets;
      },
      skills: () => {
        const targets = new Float32Array(this.count * 3);
        for (let i = 0; i < this.count; i++) {
          const i3 = i * 3;
          const angle = (i / this.count) * Math.PI * 8;
          const radius = 0.5 + Math.random() * 0.5;
          targets[i3] = Math.cos(angle) * radius;
          targets[i3 + 1] = Math.sin(angle) * radius;
          targets[i3 + 2] = (Math.random() - 0.5) * 0.4;
        }
        return targets;
      },
      achievements: () => {
        const targets = new Float32Array(this.count * 3);
        for (let i = 0; i < this.count; i++) {
          const i3 = i * 3;
          targets[i3] = (Math.random() - 0.5) * 1.5;
          targets[i3 + 1] = (Math.random() - 0.5) * 2;
          targets[i3 + 2] = (Math.random() - 0.5) * 0.3;
        }
        return targets;
      },
      contact: () => {
        const targets = new Float32Array(this.count * 3);
        for (let i = 0; i < this.count; i++) {
          const i3 = i * 3;
          const x = (Math.random() - 0.5) * 0.5;
          const y = -0.5 + (Math.random() - 0.5) * 0.3;
          const z = (Math.random() - 0.5) * 0.2;
          targets[i3] = x;
          targets[i3 + 1] = y;
          targets[i3 + 2] = z;
        }
        return targets;
      }
    };
    
    return patterns[section] ? patterns[section]() : patterns.home();
  }
  
  showName() {
    const el = document.getElementById('showcase-name');
    if (el) el.classList.add('visible');
  }
  
  showBadges() {
    const subtitle = document.getElementById('showcase-subtitle');
    const badges = document.getElementById('showcase-badges');
    if (subtitle) subtitle.classList.add('visible');
    setTimeout(() => {
      if (badges) badges.classList.add('visible');
    }, 300);
  }
  
  endIntro() {
    const intro = document.getElementById('showcase-intro');
    if (intro) {
      intro.classList.add('hidden');
      
      setTimeout(() => {
        intro.remove();
        
        const particleWrapper = document.getElementById('particle-universe');
        if (particleWrapper) particleWrapper.classList.add('is-active');
        
        const homeSection = document.getElementById('home');
        if (homeSection) homeSection.classList.add('is-visible');
        
        document.querySelectorAll('[hidden]').forEach(el => {
          if (el.removeAttribute) el.removeAttribute('hidden');
        });
        
        document.dispatchEvent(new CustomEvent('portfolio:glitch'));
      }, 800);
    }
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    const positions = this.geometry.attributes.position.array;
    const ease = 0.08;
    
    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;
      
      positions[i3] += (this.targets[i3] - positions[i3]) * ease;
      positions[i3 + 1] += (this.targets[i3 + 1] - positions[i3 + 1]) * ease;
      positions[i3 + 2] += (this.targets[i3 + 2] - positions[i3 + 2]) * ease;
      
      positions[i3] += (Math.random() - 0.5) * 0.002;
      positions[i3 + 1] += (Math.random() - 0.5) * 0.002;
    }
    
    this.geometry.attributes.position.needsUpdate = true;
    
    const time = performance.now() * 0.001;
    this.particles.rotation.y = Math.sin(time * 0.1) * 0.1;
    
    this.renderer.render(this.scene, this.camera);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ShowcaseIntro();
});