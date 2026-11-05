import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const timer = new THREE.Timer();

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: "0xff0000" });

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
);

camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

function animate() {
    timer.update();
    const delta = timer.getDelta();
    mesh.rotation.y += delta;
    mesh.rotation.y += delta;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
