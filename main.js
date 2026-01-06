import * as THREE from 'three';
import { HandDetector } from './src/detector';
import { ParticleSystem } from './src/particle';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
  canvas: document.getElementById('app-canvas'), 
  alpha: true, 
  antialias: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 12;

const particles = new ParticleSystem(scene, 25000);
const detector = new HandDetector();
const uiShape = document.getElementById('shape-display');
const uiStatus = document.getElementById('gesture-status');

detector.init((results) => {
  if (results.multiHandLandmarks && results.multiHandLandmarks[0]) {
    const hand = results.multiHandLandmarks[0];
    particles.handleGestures(hand);
    uiStatus.innerText = "Tracking Hand...";

    // Zone-based shape switching
    const x = hand[8].x;
    if (x > 0.75 && uiShape.innerText !== 'HEART') {
      particles.setShape('heart'); uiShape.innerText = 'HEART';
    } else if (x <= 0.75 && x > 0.5 && uiShape.innerText !== 'FLOWER') {
      particles.setShape('flower'); uiShape.innerText = 'FLOWER';
    } else if (x <= 0.5 && x > 0.25 && uiShape.innerText !== 'SATURN') {
      particles.setShape('saturn'); uiShape.innerText = 'SATURN';
    } else if (x <= 0.25 && uiShape.innerText !== 'FIREWORKS') {
      particles.setShape('fireworks'); uiShape.innerText = 'FIREWORKS';
    }
  } else {
    uiStatus.innerText = "No Hand Detected";
  }
});

function animate() {
  requestAnimationFrame(animate);
  particles.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});