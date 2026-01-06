export class GestureHandler {
  static getPinchDistance(landmarks) {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    // Calculate 3D Euclidean distance
    return Math.sqrt(
      Math.pow(thumbTip.x - indexTip.x, 2) +
      Math.pow(thumbTip.y - indexTip.y, 2) +
      Math.pow(thumbTip.z - indexTip.z, 2)
    );
  }

  static getHandCenter(landmarks) {
    // Landmark 9 is the middle finger MCP (base), usually the stable center
    return {
      x: (landmarks[9].x - 0.5) * 20, // Map to Three.js scale
      y: -(landmarks[9].y - 0.5) * 12,
      rawX: landmarks[9].x // Used for zone detection
    };
  }

  static getShapeZone(x) {
    if (x < 0.25) return 'HEART';
    if (x < 0.50) return 'FLOWER';
    if (x < 0.75) return 'SATURN';
    return 'FIREWORKS';
  }
} 