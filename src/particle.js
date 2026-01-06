import * as THREE from 'three';
import { generateShape } from './shapes';

export class ParticleSystem {
  constructor(scene, count = 20000) {
    this.count = count;
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for(let i=0; i<count*3; i++) colors[i] = Math.random();

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    this.mesh = new THREE.Points(this.geometry, this.material);
    scene.add(this.mesh);

    this.targetPositions = generateShape('heart', count);
  }

  setShape(type) {
    this.targetPositions = generateShape(type, this.count);
  }

  // Update position and scale based on hand gestures
  handleGestures(landmarks) {
    const index = landmarks[8];
    const thumb = landmarks[4];

    // 1. Move System: Map landmarks (0-1) to Three.js coordinates
    const tx = (index.x - 0.5) * -15; // Inverted for natural mirror movement
    const ty = -(index.y - 0.5) * 10;
    this.mesh.position.lerp(new THREE.Vector3(tx, ty, 0), 0.1);

    // 2. Pinch to Scale: Calculate distance between thumb and index
    const dist = Math.sqrt(Math.pow(index.x-thumb.x,2) + Math.pow(index.y-thumb.y,2));
    const s = 0.5 + dist * 5;
    this.mesh.scale.lerp(new THREE.Vector3(s, s, s), 0.1);

    // 3. Dynamic Color based on position
    this.material.color.setHSL(index.x, 0.8, 0.6);
  }

  update() {
    const pos = this.geometry.attributes.position.array;
    const target = this.targetPositions;
    for (let i = 0; i < pos.length; i++) {
      // Morph effect: particles split and fly to new shape
      pos[i] += (target[i] - pos[i]) * 0.1;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.mesh.rotation.y += 0.002;
  }
}