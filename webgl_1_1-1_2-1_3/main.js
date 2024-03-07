import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const scale = 1.3;

const torPolygons = 100;
const cubePolygons = 4;
const conePolygons = 12;
const spherePolygons = 12;

const torusGeometry = new THREE.TorusGeometry(
  1,
  0.2,
  torPolygons,
  torPolygons
);

const torusMaterial = new THREE.MeshBasicMaterial({
  color: "purple",
  wireframe: true,
});

const cubeGeometry = new THREE.BoxGeometry(
  scale,
  scale,
  scale,
  cubePolygons,
  cubePolygons,
  cubePolygons
);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});

const coneGeometry = new THREE.ConeGeometry(1, 2, conePolygons);
const cilinderGeometry = new THREE.CylinderGeometry(1, 1, 3,  8);

const coneMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true,
});

const sphereGeometry = new THREE.SphereGeometry(
  scale,
  spherePolygons,
  spherePolygons
);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: "green",
  wireframe: true,
});

const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

const cilinderMesh = new THREE.Mesh(cilinderGeometry, sphereMaterial);

cubeMesh.add(torusMesh);
sphereMesh.add(cubeMesh);

scene.add(cubeMesh);
scene.add(coneMesh);
scene.add(sphereMesh);
scene.add(cilinderMesh);

torusMesh.position.set(0, 0, 0);
cubeMesh.position.set(0, 0, 0);


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 5;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

coneMesh.position.set(-4, 0, 0);
sphereMesh.position.set(0, 0, 0);
cilinderMesh.position.set(4, 0, 0);


cubeMesh.position.set(4, 5, 0);

const duration = 3000;
const targetPosition = new THREE.Vector3(0, 1, 0);

let startTime = null;

function animate() {
  requestAnimationFrame(animate);

  // if (startTime === null) {
  //   startTime = Date.now();
  // }
  //
  // const elapsedTime = Date.now() - startTime;
  // const t = Math.min(elapsedTime / duration, 1);
  //
  // const newPosition = new THREE.Vector3().lerpVectors(
  //   sphereMesh.position,
  //   targetPosition,
  //   t
  // );
  // sphereMesh.position.copy(newPosition);

   // torusMesh.rotation.x += 0.01;
  torusMesh.rotation.y = Math.PI / 4;
  const torusScaleFactor = scale / (2 * (1 + 0.2));

  torusMesh.scale.set(torusScaleFactor, torusScaleFactor, torusScaleFactor);
  cubeMesh.scale.set(torusScaleFactor, torusScaleFactor, torusScaleFactor);

  // sphereMesh.scale.set(
  //   torusScaleFactor / (1 + 0.2),
  //   torusScaleFactor / (1 + 0.2),
  //   torusScaleFactor / (1 + 0.2)
  // );

  renderer.render(scene, camera);
}

animate();
