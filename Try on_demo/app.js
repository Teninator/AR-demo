// DOM Elements
const video = document.getElementById('cameraCanvas');
const backButton = document.getElementById('backButton');
const recordButton = document.getElementById('recordButton');
const addToCartButton = document.getElementById('addToCartButton');
const saveForLaterButton = document.getElementById('saveForLaterButton');

// Back Button Functionality
backButton.addEventListener('click', () => {
  window.location.href = 'store.html'; // Navigate back to the store
});

// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1); // Ambient light
scene.add(light);

// Models
let ringModel, skirtModel;
const loader = new THREE.FBXLoader();

// Load Ring Model
loader.load('assets/models/ring_model.fbx', (fbx) => {
  ringModel = fbx;
  ringModel.scale.set(0.02, 0.02, 0.02); // Adjust size
  scene.add(ringModel);
});

// Load Skirt Model
loader.load('assets/models/skirt_model.fbx', (fbx) => {
  skirtModel = fbx;
  skirtModel.scale.set(0.5, 0.5, 0.5); // Adjust size
  scene.add(skirtModel);
});

// Camera Position
camera.position.z = 5;

// MediaPipe Setup
const holistic = new Holistic({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`
});

holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  refineFaceLandmarks: false,
});

// Camera Feed
async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  video.play();
}

setupCamera();

// Handle MediaPipe Results
holistic.onResults((results) => {
  if (results.poseLandmarks) {
    const landmarks = results.poseLandmarks;

    // Ring Placement (Left Wrist - Landmark 15)
    if (ringModel) {
      const leftWrist = landmarks[15];
      ringModel.position.set(
        (leftWrist.x - 0.5) * 2, // Adjust x-coordinates
        -(leftWrist.y - 0.5) * 2, // Adjust y-coordinates
        0
      );
    }

    // Skirt Placement (Waist - Landmark 23)
    if (skirtModel) {
      const waist = landmarks[23];
      skirtModel.position.set(
        (waist.x - 0.5) * 2, // Adjust x-coordinates
        -(waist.y - 0.5) * 2, // Adjust y-coordinates
        0
      );
    }
  }
});

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Start Holistic
holistic.send({ image: video });

// Button Functionality
recordButton.addEventListener('click', () => {
  console.log('Record button clicked!'); // Implement recording functionality
});

addToCartButton.addEventListener('click', () => {
  console.log('Item added to cart!'); // Implement add-to-cart functionality
});

saveForLaterButton.addEventListener('click', () => {
  console.log('Item saved for later!'); // Implement save-for-later functionality
});
