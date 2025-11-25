// three/exercise_1.js

// 🚩 RUTA Three.js: Subir un nivel (../) para encontrar node_modules
import * as THREE from '../node_modules/three/build/three.module.js';

// --- Parámetros del Ejercicio 1 ---
const a = 0;
const b = 2;
const segments = 50;
const f = (x) => x * x; // Función: f(x) = x^2
// ------------------------------------

export function createSurfaceOfRevolution() {
    const profilePoints = [];
    
    // Generar los puntos 2D (Vector2) para el perfil de la curva
    for (let i = 0; i <= segments; i++) {
        const x = a + (b - a) * (i / segments);
        const y = f(x); 
        
        // LatheGeometry usa (radio, altura) que en este caso es (x, f(x))
        profilePoints.push(new THREE.Vector2(x, y));
    }

    // Crear la geometría de torno (LatheGeometry)
    const geometry = new THREE.LatheGeometry(
        profilePoints,
        32, // segmentos radiales
        0,
        Math.PI * 2
    );

    // Crear el material y la malla (Mesh)
    const material = new THREE.MeshPhongMaterial({
        color: 0x48A0FF, // Color azul
        side: THREE.DoubleSide,
        shininess: 50,
        wireframe: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'Ejercicio1_Superficie';
    
    return mesh;
}