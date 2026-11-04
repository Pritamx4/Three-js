import "./style.css";
import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Clock
const clock = new THREE.Clock();

// heartShape
// const x = 0, y = 0;
// const heartShape = new THREE.Shape();

// heartShape.moveTo(x + 0.25, y + 0.25);
// heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
// heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
// heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
// heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
// heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
// heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
// // Geometry
// const geometry = new THREE.ShapeGeometry(heartShape);

const geometry = new THREE.BoxGeometry(1, 1, 1);

// Material
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
});

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
