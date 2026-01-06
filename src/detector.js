import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export class HandDetector {
  constructor() {
    this.video = document.getElementById("webcam");
    // src/detector.js update
     this.hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${Hands.VERSION}/${file}`;
      },
    });

    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });
  }

  async init(onResults) {
    this.hands.onResults(onResults);
    const camera = new Camera(this.video, {
      onFrame: async () => {
        await this.hands.send({ image: this.video });
      },
      width: 640,
      height: 480,
    });
    return camera.start();
  }
}
