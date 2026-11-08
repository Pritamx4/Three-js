import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const scene = new THREE.Scene();

const timer = new THREE.Timer();

let mixer;

const gltfLoader = new GLTFLoader();

gltfLoader.load(
    "./model.glb",
    (gltf) => {
        scene.add(gltf.scene);
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        console.log("model loaded");
        console.log(gltf);
        if(gltf.animations.length > 0){
            mixer = new THREE.AnimationMixer(gltf.scene);
            const action = mixer.clipAction(gltf.animations[1]);
            // action.play();
        }
    },
    () => {
        console.log("model is loading");
    },
    () => {
        console.log("error");
    },
);

// lights
// ambient light it gives light from all directions the shadow will not form
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

scene.add(ambientLight);

// directional light

// const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

// directionalLight.position.set(2, 2, 1);
// scene.add(directionalLight);

// direction light helper

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,0.5);

// scene.add(directionalLightHelper)

// spot light

// const pointLight = new THREE.PointLight(0xffffff, 1000, 6);
// pointLight.position.set(2,3,4)
// scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight,2,0x00ff00);
// scene.add(pointLightHelper)

// spot light

// const spotLight = new THREE.SpotLight(0xffffff, 2, 10, Math.PI * 0.1, 0.5, 1);
// spotLight.position.set(2, 3, 4);
// scene.add(spotLight);
// spotLight.target.position.set(0, 0, 0);
// scene.add(spotLight.target);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0x00ff00);
// scene.add(spotLightHelper);

// ḥemisphere light

// const hemisphereLight = new THREE.HemisphereLight(
//     0x2222ff, // sky color
//     0x22ff22, // ground color
//     2, // intensity
// );

// scene.add(hemisphereLight);

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(
//     hemisphereLight,
//     0.5,
// );

// scene.add(hemisphereLightHelper);

const geometry = new THREE.BoxGeometry(1, 1, 1);

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/image.png");

// const texture = textureLoader.load("https://images.unsplash.com/photo-1793647316693-dfd40a4afd38?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
//     () =>{
//         console.log("texture loaded")
//     },
//     ()=>{
//         console.log("progress")
//     },
//     ()=>{
//         console.log("error")
//     },
// );

// const count = 50;

// const positionArray = new Float32Array(count*3*3);

// for (let i = 0; i < count*3*3; i++) {
//     positionArray[i] = (Math.random() - 0.5)*4 // -4 to 4
// }

// geometry.setAttribute("position" , new THREE.BufferAttribute(positionArray,3))

const material = new THREE.MeshStandardMaterial({
    // matcap: matcapTexture,
    color: 0xff0000,
});
// mesh matcap for light and shadow effect
// mesh standard for normal material without light and shadow effect
// mesh shader for custom shader material
const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
    75,
    size.width / size.height,
    0.1,
    100,
);

camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
});

renderer.setSize(size.width, size.height);

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener("resize", () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
});

renderer.render(scene, camera);

function animate() {
    timer.update();
    controls.update();
    // spotLightHelper.update();
    // hemisphereLightHelper.update();
    const delta = timer.getDelta();
    if(mixer){
        mixer.update(delta);
    }
    // mesh.rotation.y += delta;
    // mesh.rotation.y += delta;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
