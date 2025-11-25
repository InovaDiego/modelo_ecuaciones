// main.js

// 🚩 RUTA Three.js: Importación desde la carpeta raíz (usa './')
import * as THREE from './node_modules/three/build/three.module.js'; 
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'; 

// Importa todos los modelos de los ejercicios
import { createSurfaceOfRevolution } from './three/exercise_1.js';
import { createTripleIntegralVisualization, calculateVolume, f, X_MIN, X_MAX, Y_MIN, Y_MAX } from './three/exercise_2.js';
import { createVectorFieldVisualization, createParticleTrajectory, calculateLineIntegral, F } from './three/exercise_3.js';


// --- Configuración de la Escena ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xEEEEEE); // Fondo gris claro

// --- Luces ---
scene.add(new THREE.AmbientLight(0x404040, 5));
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);


// --- 📦 IMPLEMENTACIÓN DE MODELOS (Solo uno debe estar activo a la vez) ---

// 1. EJERCICIO 1: Superficie de Revolución (Comentar/Descomentar)
/*
const surfaceMesh = createSurfaceOfRevolution();
scene.add(surfaceMesh);
camera.position.set(8, 4, 8); 
*/

// 2. EJERCICIO 2: Integral Doble (Comentar/Descomentar)
/*
const volumeMesh = createTripleIntegralVisualization();
scene.add(volumeMesh);
camera.position.set(5, 10, 5);
const volumeValue = calculateVolume(f, X_MIN, X_MAX, Y_MIN, Y_MAX);
console.log(`Volumen Calculado (Ej 2): ${volumeValue.toFixed(4)}`);
*/

// 3. EJERCICIO 3: Campo Vectorial (ACTIVO POR DEFECTO)
const vectorField = createVectorFieldVisualization();
scene.add(vectorField);

const startPoint = new THREE.Vector3(1, 1, 1);
const trajectoryLine = createParticleTrajectory(startPoint, 300, 0.05, 0xFF00FF);
scene.add(trajectoryLine);

const points = trajectoryLine.geometry.attributes.position.array;
const vectorPoints = [];
for (let i = 0; i < points.length; i += 3) {
    vectorPoints.push(new THREE.Vector3(points[i], points[i+1], points[i+2]));
}
const lineIntegral = calculateLineIntegral(vectorPoints, F);
console.log(`Integral de Línea (Ej 3): ${lineIntegral.toFixed(4)}`);
camera.position.set(10, 10, 10);


// --- Controles y Animación ---

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 

function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}

animate();

// --- Adaptar a la ventana ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});