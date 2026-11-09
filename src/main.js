import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fragmentShader from "./shaders/fragmentShader.glsl";
import vertexShader from "./shaders/vertexShader.glsl";

const size = {
    width : window.innerWidth,
    height : window.innerHeight,
}


const scene = new THREE.Scene()

const timer = new THREE.Timer()

const geometry = new THREE.PlaneGeometry(1,1, 100, 100);


const textureLoader = new THREE.TextureLoader();

const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        utime: {value: 0.0},
        uTexture: {value: null},
    },
    side : THREE.DoubleSide,
})

textureLoader.load(
    "https://images.unsplash.com/photo-1793824404258-9412535f8af5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        material.uniforms.uTexture.value = texture;
    },
    undefined,
    (error) => {
        console.error("Unable to load plane texture.", error);
    },
);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);



const camera = new THREE.PerspectiveCamera(
    75,
    size.width /size.height,
    0.1,
    100,

);

camera.position.z = 3;


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
})

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

function animate(){
    timer.update();
    const delta = timer.getDelta();
    material.uniforms.utime.value += delta;
    // mesh.rotation.y += delta;
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}

animate();







// import { GLTFLoader, HDRLoader, OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";
// import "./style.css";
// import * as THREE from "three";

// const size = {
//     width: window.innerWidth,
//     height: window.innerHeight,
// };

// const scene = new THREE.Scene();

// const timer = new THREE.Timer();

// // lights
// // ambient light it gives light from all directions the shadow will not form
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

// scene.add(ambientLight);

// const hdrLoader = new HDRLoader();

// hdrLoader.load("./environment.hdr", (envMap)=>{
//     envMap.mapping= THREE.EquirectangularReflectionMapping;

//     scene.background = envMap;
//     scene.environment = envMap;
// })
// let mixer;

// const gltfLoader = new GLTFLoader();

// gltfLoader.load(
//     "./model.glb",
//     (gltf) => {
//         scene.add(gltf.scene);
//         gltf.scene.scale.set(0.5, 0.5, 0.5);
//         console.log("model loaded");
//         console.log(gltf);
//         if(gltf.animations.length > 0){
//             mixer = new THREE.AnimationMixer(gltf.scene);
//             const action = mixer.clipAction(gltf.animations[1]);
//             // action.play();
//         }
//     },
//     () => {
//         console.log("model is loading");
//     },
//     () => {
//         console.log("error");
//     },
// );

// const geometry = new THREE.BoxGeometry(1, 1, 1);

// const textureLoader = new THREE.TextureLoader();
// const matcapTexture = textureLoader.load("/image.png");

// // const texture = textureLoader.load("https://images.unsplash.com/photo-1793647316693-dfd40a4afd38?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
// //     () =>{
// //         console.log("texture loaded")
// //     },
// //     ()=>{
// //         console.log("progress")
// //     },
// //     ()=>{
// //         console.log("error")
// //     },
// // );

// // const count = 50;

// // const positionArray = new Float32Array(count*3*3);

// // for (let i = 0; i < count*3*3; i++) {
// //     positionArray[i] = (Math.random() - 0.5)*4 // -4 to 4
// // }

// // geometry.setAttribute("position" , new THREE.BufferAttribute(positionArray,3))

// const material = new THREE.MeshStandardMaterial({
//     // matcap: matcapTexture,
//     color: 0xff0000,
// });
// // mesh matcap for light and shadow effect
// // mesh standard for normal material without light and shadow effect
// // mesh shader for custom shader material
// const mesh = new THREE.Mesh(geometry, material);

// // scene.add(mesh);

// const camera = new THREE.PerspectiveCamera(
//     75,
//     size.width / size.height,
//     0.1,
//     100,
// );

// camera.position.z = 3;

// const renderer = new THREE.WebGLRenderer({
//     canvas: document.querySelector("#canvas"),
// });

// renderer.setSize(size.width, size.height);

// const controls = new OrbitControls(camera, renderer.domElement);

// window.addEventListener("resize", () => {
//     size.width = window.innerWidth;
//     size.height = window.innerHeight;

//     camera.aspect = size.width / size.height;
//     camera.updateProjectionMatrix();

//     renderer.setSize(size.width, size.height);
// });

// renderer.render(scene, camera);

// function animate() {
//     timer.update();
//     controls.update();
//     // spotLightHelper.update();
//     // hemisphereLightHelper.update();
//     const delta = timer.getDelta();

//     // mesh.rotation.y += delta;
//     // mesh.rotation.y += delta;
//     renderer.render(scene, camera);
//     requestAnimationFrame(animate);
// }

// animate();
