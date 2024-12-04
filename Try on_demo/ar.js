// DOM Elements
const video = document.createElement('video'); 
const canvas = document.getElementById('cameraCanvas');
const backButton = document.getElementById('backButton');
const recordButton = document.getElementById('recordButton');
const addToCartButton = document.getElementById('addToCartButton');
const saveForLaterButton = document.getElementById('saveForLaterButton');

// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1); // Ambient light
scene.add(light);

// Models
let model;
const loader = new THREE.FBXLoader();

// Load Model based on the item in the URL query string
const urlParams = new URLSearchParams(window.location.search);
const item = urlParams.get('item');
let modelPath = '';

if (item === 'ring') {
  modelPath = 'assets/models/ring_model.fbx'; // Path for the ring model
} else if (item === 'skirt') {
  modelPath = 'assets/models/skirt_model.fbx'; // Path for the skirt model
}

loader.load(modelPath, (fbx) => {
  model = fbx;
  model.scale.set(0.02, 0.02, 0.02); // Adjust scale based on the item
  scene.add(model);
});

// Camera Position
camera.position.z = 5;

// MediaPipe Setup (Holistic)
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
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();
    video.width = window.innerWidth;
    video.height = window.innerHeight;
    document.body.appendChild(video); 
  } catch (error) {
    alert('Camera permission denied or unavailable.');
  }
}

setupCamera();

// Handle MediaPipe Results
holistic.onResults((results) => {
  if (results.poseLandmarks) {
    const landmarks = results.poseLandmarks;
    if (model) {
      const wrist = landmarks[15]; // Left wrist
      model.position.set(
        (wrist.x - 0.5) * 2, // Adjust position
        -(wrist.y - 0.5) * 2, // Adjust position
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

// Toast Function
function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerText = message;
  document.getElementById('toastContainer').appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// Button Functionality
recordButton.addEventListener('click', () => {
  console.log('Record button clicked!');
});

addToCartButton.addEventListener('click', () => {
  showToast('Item added to cart!');
});

saveForLaterButton.addEventListener('click', () => {
  showToast('Item saved for later!');
});

backButton.addEventListener('click', () => {
  window.location.href = 'store.html'; // Navigate back to the store
});
