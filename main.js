// main.js - CÓDIGO DE DIAGNÓSTICO DEL CUBO

// 1. IMPORTACIONES: Asegúrate de que las rutas sean correctas para tu estructura (Raíz)
import * as THREE from './node_modules/three/build/three.module.js'; 
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'; 

// NO IMPORTAMOS EL EJERCICIO 1 POR AHORA

// --- Configuración de la Escena ---
const scene = new THREE.Scene();

// La cámara ve con un ángulo de 75 grados
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// El renderizador dibuja la escena en 3D
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Añadimos el área de dibujo (canvas) al HTML
document.body.appendChild(renderer.domElement);

// --- 📦 DIAGNÓSTICO: CREAR CUBO ROJO ---
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Usamos MeshBasicMaterial para que no necesite luces
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); 
const cube = new THREE.Mesh(geometry, material);
scene.add(cube); // Añadimos el cubo a la escena

// --- Posición Inicial de la Cámara ---
// La movemos para que el cubo (que está en 0,0,0) sea visible
camera.position.set(2, 2, 3);

// --- Controles de Órbita ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 

// --- Bucle de Animación (Render Loop) ---
function animate() {
    requestAnimationFrame(animate);
    
    // Para ver el cubo rotar incluso si no usas el mouse
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    
    controls.update(); 
    renderer.render(scene, camera);
}

animate();

// --- Adaptar a la Ventana (Mantener) ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});