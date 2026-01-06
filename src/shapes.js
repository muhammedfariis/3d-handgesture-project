export function generateShape(type, count) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x, y, z;
    const t = (i / count) * Math.PI * 2;

    if (type === 'heart') {
      x = 16 * Math.pow(Math.sin(t), 3);
      y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
      z = (Math.random() - 0.5) * 5;
      const s = 0.15; x *= s; y *= s; z *= s;
    } 
    else if (type === 'flower') {
      const angle = i * 0.1375; // Golden angle
      const r = 0.12 * Math.sqrt(i);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      z = Math.sin(i * 0.1) * 0.5;
    } 
    else if (type === 'saturn') {
      if (i < count * 0.6) { // Planet
        const phi = Math.acos(-1 + (2 * i) / (count * 0.6));
        const theta = Math.sqrt(count * 0.6 * Math.PI) * phi;
        x = Math.cos(theta) * Math.sin(phi) * 2;
        y = Math.sin(theta) * Math.sin(phi) * 2;
        z = Math.cos(phi) * 2;
      } else { // Rings
        const r = 3.5 + Math.random() * 1.2;
        const ang = Math.random() * Math.PI * 2;
        x = Math.cos(ang) * r;
        y = (Math.random() - 0.5) * 0.2;
        z = Math.sin(ang) * r;
      }
    } 
    else { // Fireworks
      const r = 7 * Math.pow(Math.random(), 0.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      x = r * Math.sin(phi) * Math.cos(theta);
      y = r * Math.sin(phi) * Math.sin(theta);
      z = r * Math.cos(phi);
    }
    positions.set([x, y, z], i * 3);
  }
  return positions;
}