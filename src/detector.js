import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export class HandDetector {
  constructor() {
    this.video = document.getElementById("webcam");
    // src/detector.js update
    this.hands = new Hands({
  locateFile: (file) => {
    // This forces the use of the official CDN
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});

    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });
  }
async init(callback) {
  this.hands.onResults(callback);

  // 1. Explicitly request the stream first
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { width: 1280, height: 720 } 
    });
    
    this.videoElement.srcObject = stream;
    
    // 2. Wait for the video to actually be ready
    await new Promise((resolve) => {
      this.videoElement.onloadedmetadata = () => {
        this.videoElement.play();
        resolve();
      };
    });

    const camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.hands.send({ image: this.videoElement });
      },
      width: 1280,
      height: 720
    });
    
    await camera.start();
    console.log("Camera and MediaPipe started!");
  } catch (err) {
    console.error("Camera Error: ", err);
    alert("Camera access is required for hand tracking.");
  }
}
}
