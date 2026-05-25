import * as THREE from 'three';

export class ParticleTargets {
  constructor(count) {
    this.count = count;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.canvas.width = 1000;
    this.canvas.height = 1000;
  }

  /**
   * Generates a set of points from text using a hidden canvas.
   * Proportional scaling and perfect centering.
   */
  getTextTargets(text, fontSize = 120, fontFace = 'Fragment Mono, monospace') {
    const { canvas, ctx, count } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = `bold ${fontSize}px ${fontFace}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const rawPoints = [];

    let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;

    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 4) {
        const index = (y * canvas.width + x) * 4;
        if (pixels[index] > 128) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          rawPoints.push({ x, y });
        }
      }
    }

    if (rawPoints.length === 0) return this.fillToCount([]);

    const textWidth = maxX - minX;
    const textHeight = maxY - minY;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    
    // Scale factor to normalize text height to approx 1.0 world unit
    const worldScale = 1.2;
    const normFactor = Math.max(textWidth, textHeight);

    const points = rawPoints.map(p => new THREE.Vector3(
      ((p.x - centerX) / normFactor) * worldScale * 2,
      -(((p.y - centerY) / normFactor) * worldScale * 2),
      (Math.random() - 0.5) * 0.1
    ));

    return this.fillToCount(points);
  }

  /**
   * Neural network diagram target (Projects section)
   */
  getNeuralTargets() {
    const points = [];
    const layers = [3, 5, 4, 2];
    const layerSpacing = 0.5;
    const nodeSpacing = 0.3;

    // Nodes
    const nodes = [];
    layers.forEach((nodeCount, i) => {
      const x = (i - (layers.length - 1) / 2) * layerSpacing;
      for (let j = 0; j < nodeCount; j++) {
        const y = (j - (nodeCount - 1) / 2) * nodeSpacing;
        const nodePos = new THREE.Vector3(x, y, 0);
        nodes.push({ pos: nodePos, layer: i });
        
        // Add many particles around the node
        for (let k = 0; k < 200; k++) {
          const r = Math.random() * 0.05;
          const theta = Math.random() * Math.PI * 2;
          points.push(new THREE.Vector3(
            x + Math.cos(theta) * r,
            y + Math.sin(theta) * r,
            (Math.random() - 0.5) * 0.05
          ));
        }
      }
    });

    // Connections (lines)
    nodes.forEach((nodeA, i) => {
      nodes.slice(i + 1).forEach(nodeB => {
        if (nodeB.layer === nodeA.layer + 1) {
          // Add particles along the line
          const dist = nodeA.pos.distanceTo(nodeB.pos);
          const steps = Math.floor(dist * 500);
          for (let s = 0; s < steps; s++) {
            const t = s / steps;
            const p = new THREE.Vector3().lerpVectors(nodeA.pos, nodeB.pos, t);
            p.x += (Math.random() - 0.5) * 0.01;
            p.y += (Math.random() - 0.5) * 0.01;
            p.z += (Math.random() - 0.5) * 0.01;
            points.push(p);
          }
        }
      });
    });

    return this.fillToCount(points);
  }

  /**
   * Binary tree / graph target (Skills section)
   */
  getTreeTargets() {
    const points = [];
    
    const generateBranch = (start, angle, length, depth) => {
      if (depth === 0) return;
      
      const end = new THREE.Vector3(
        start.x + Math.cos(angle) * length,
        start.y + Math.sin(angle) * length,
        0
      );
      
      // Add particles along branch
      const steps = Math.floor(length * 800);
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const p = new THREE.Vector3().lerpVectors(start, end, t);
        p.x += (Math.random() - 0.5) * 0.015;
        p.y += (Math.random() - 0.5) * 0.015;
        points.push(p);
      }
      
      const nextLength = length * 0.75;
      generateBranch(end, angle - 0.5, nextLength, depth - 1);
      generateBranch(end, angle + 0.5, nextLength, depth - 1);
    };
    
    generateBranch(new THREE.Vector3(0, -0.6, 0), Math.PI / 2, 0.4, 6);
    
    return this.fillToCount(points);
  }

  /**
   * Bar chart target (Metrics section)
   */
  getBarTargets() {
    const points = [];
    const bars = [0.16, 0.24, 0.38, 0.54, 0.72, 0.88, 0.98];
    const barWidth = 0.15;
    const spacing = 0.2;
    const totalWidth = (bars.length - 1) * spacing;

    bars.forEach((h, i) => {
      const xStart = (i * spacing) - totalWidth / 2 - barWidth / 2;
      const xEnd = xStart + barWidth;
      const yStart = -0.5;
      const yEnd = -0.5 + h;
      
      // Fill the rectangle with points
      const density = 2000;
      const count = Math.floor(h * density);
      for (let j = 0; j < count; j++) {
        points.push(new THREE.Vector3(
          xStart + Math.random() * barWidth,
          yStart + Math.random() * h,
          (Math.random() - 0.5) * 0.05
        ));
      }
    });
    
    return this.fillToCount(points);
  }

  /**
   * Helper to ensure we have exactly this.count points.
   */
  fillToCount(points) {
    const result = new Float32Array(this.count * 3);
    if (points.length === 0) return result;

    for (let i = 0; i < this.count; i++) {
      const p = points[i % points.length];
      result[i * 3] = p.x;
      result[i * 3 + 1] = p.y;
      result[i * 3 + 2] = p.z;
    }
    return result;
  }
}
