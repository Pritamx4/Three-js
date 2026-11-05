import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three"

const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const scene = new THREE.Scene();

const timer = new THREE.Timer();

const geometry = new THREE.BoxGeometry(1, 1, 1);


// const count = 50;

// const positionArray = new Float32Array(count*3*3);

// for (let i = 0; i < count*3*3; i++) {
//     positionArray[i] = (Math.random() - 0.5)*4 // -4 to 4
// }

// geometry.setAttribute("position" , new THREE.BufferAttribute(positionArray,3))



const material = new THREE.MeshBasicMaterial({ color: "0xff0000" , wireframe: true});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
    75,
    size.width / size.height,
    0.1,
    100,
);

camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(size.width, size.height);

const controls = new OrbitControls(camera,renderer.domElement) 

window.addEventListener("resize", () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;


    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width,size.height)

});

renderer.render(scene, camera);

function animate() {
    timer.update();
    controls.update()
    const delta = timer.getDelta();
    // mesh.rotation.y += delta;
    // mesh.rotation.y += delta;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
