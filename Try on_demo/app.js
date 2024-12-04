function getQueryParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const selectedItem = getQueryParameter('item');
const cameraContainer = document.getElementById('cameraContainer');
const videoElement = document.getElementById('camera');

async function initializeCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
  } catch (error) {
    console.error('Error accessing the camera:', error);
    cameraContainer.innerHTML = `<p>Error accessing camera: ${error.message}</p>`;
  }
}

function loadARModel(item) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, cameraContainer.clientWidth / cameraContainer.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(cameraContainer.clientWidth, cameraContainer.clientHeight);
  cameraContainer.appendChild(renderer.domElement);

  const loader = new THREE.GLTFLoader();
  const modelPath = item === 'skirt' ? './models/skirt.gltf' : './models/ring.gltf';

  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      model.position.set(0, -1, -3);
      camera.position.z = 5;

      const animate = function () {
        requestAnimationFrame(animate);
        model.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    },
    undefined,
    (error) => {
      console.error('Error loading AR model:', error);
      cameraContainer.innerHTML = `<p>Error loading AR model!</p>`;
    }
  );
}

function initializeAR() {
  if (selectedItem === 'skirt' || selectedItem === 'ring') {
    initializeCamera();
    loadARModel(selectedItem);
  } else {
    console.error('No item selected!');
    cameraContainer.innerHTML = `<p>Error: No item selected!</p>`;
  }
}

document.getElementById('closeButton').addEventListener('click', () => {
  window.location.href = 'store.html';
});

document.getElementById('infoButton').addEventListener('click', () => {
  alert('Ensure your body is fully visible for the best AR experience.');
});

document.getElementById('settingsButton').addEventListener('click', () => {
  alert('Settings feature coming soon!');
});

initializeAR();
