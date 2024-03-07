import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("assets/1.jpg");

const transparentTextureMaterial = new THREE.MeshPhongMaterial({
  color: "green",
  map: texture,
  opacity: 0.8,
  transparent: true,
});

const shinyMaterial = new THREE.MeshPhongMaterial({
  color: "red",
  shininess: 100,
});

const diffuseMaterial = new THREE.MeshPhysicalMaterial({
  color: "cyan",
  metalness: 0.5,
  roughness: 0.2,
  shininess: 100,
});

const markerMaterial = new THREE.MeshBasicMaterial({
  color: 0xfff000,
});

const cylinderMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  map: texture,
});

const icoshedronGeometry = new THREE.IcosahedronGeometry(1, 0);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 64);
const sphereGeometry = new THREE.SphereGeometry(1.3, 20, 20);
const coneGeometry = new THREE.ConeGeometry(1, 2, 64);
const markerGeometry = new THREE.SphereGeometry(0.1, 64, 64);

const torusMesh = new THREE.Mesh(icoshedronGeometry, diffuseMaterial);
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
const sphereMesh = new THREE.Mesh(sphereGeometry, transparentTextureMaterial);
const coneMesh = new THREE.Mesh(coneGeometry, shinyMaterial);
const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

torusMesh.position.set(4, 0, 0);
sphereMesh.position.set(-4, 0, 0);
cylinderMesh.position.set(-4, 0, 0);
coneMesh.position.set(0, 0, 0);

scene.add(torusMesh);
scene.add(cylinderMesh);
scene.add(sphereMesh);
scene.add(coneMesh);

const light = new THREE.PointLight(0xffffff, 20);
light.position.set(0, 5, 0);
scene.add(light);

markerMesh.position.copy(light.position);
scene.add(markerMesh);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 8;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const intensityDisplay = document.createElement("div");
intensityDisplay.style.position = "absolute";
intensityDisplay.style.top = "10px";
intensityDisplay.style.left = "10px";
intensityDisplay.style.color = "white";
document.body.appendChild(intensityDisplay);

document.addEventListener("keydown", (event) => {
  const speed = 0.5;
  const intensityChange = 0.5;

  if (event.shiftKey) {
    switch (event.key) {
      case "W":
        light.position.y += speed;
        break;
      case "S":
        light.position.y -= speed;
        break;
    }
  } else {
    switch (event.key) {
      case "w":
        light.position.z -= speed;
        break;
      case "s":
        light.position.z += speed;
        break;
      case "a":
        light.position.x -= speed;
        break;
      case "d":
        light.position.x += speed;
        break;
      case "[":
        light.intensity = Math.max(0, light.intensity - intensityChange);
        break;
      case "]":
        light.intensity = Math.min(100, light.intensity + intensityChange);
        break;
    }
  }

  markerMesh.position.copy(light.position);
  updateIntensityDisplay();
});

function updateIntensityDisplay() {
  const intensityPercentage = Math.round((light.intensity / 100) * 100);
  intensityDisplay.textContent = `Intensity: ${intensityPercentage}`;
}

function animate() {
  requestAnimationFrame(animate);

  torusMesh.rotation.x += 0.01;
  torusMesh.rotation.y += 0.01;

  cylinderMesh.rotation.x += 0.01;
  cylinderMesh.rotation.y += 0.01;

  updateIntensityDisplay();

  renderer.render(scene, camera);
}

animate();
