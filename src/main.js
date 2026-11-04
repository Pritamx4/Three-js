import "./style.css";
import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Clock
const clock = new THREE.Clock();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Mesh
const mesh = new THREE.Mesh(geometry, material);

// Add mesh to scene
scene.add(mesh);

// camera

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
);

// camera position
camera.position.z = 3;

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

// render the scene
renderer.render(scene, camera);

// Animate
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    mesh.rotation.x = elapsedTime * 0.5;
    mesh.rotation.y = elapsedTime * 0.5;
    renderer.render(scene, camera);
}

animate();