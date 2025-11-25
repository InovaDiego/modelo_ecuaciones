// three/exercise_2.js

// 🚩 RUTA Three.js: Subir un nivel (../) para encontrar node_modules
import * as THREE from '../node_modules/three/build/three.module.js';

// --- Parámetros del Ejercicio 2 (Exportados para uso en main.js) ---
export const X_MIN = -1, X_MAX = 1;
export const Y_MIN = -1, Y_MAX = 1;
export const GRID_SIZE = 60; 
export const f = (x, y) => 4 - x * x - y * y; // Función: f(x, y) = 4 - x^2 - y^2
// -------------------------------------------------------------------

// Mapea un valor normalizado (0 a 1) a un color (azul a rojo)
function colorMap(value) {
    const color = new THREE.Color(0x0000FF);
    color.setHSL(0.66 - (value * 0.66), 1.0, 0.5); 
    return color;
}

export function createTripleIntegralVisualization() {
    const geometry = new THREE.PlaneGeometry(
        X_MAX - X_MIN, Y_MAX - Y_MIN,
        GRID_SIZE, GRID_SIZE
    );

    const colors = [];
    const positions = geometry.attributes.position.array;
    let Z_MAX = -Infinity;
    let Z_MIN = Infinity;
    
    // 1. Calcular Z y encontrar el rango (Z_MIN, Z_MAX)
    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = f(x, y); 
        
        positions[i + 2] = z;
        if (z > Z_MAX) Z_MAX = z;
        if (z < Z_MIN) Z_MIN = z;
    }
    
    // 2. Colorear basado en Z normalizada
    for (let i = 0; i < positions.length; i += 3) {
        const z = positions[i + 2];
        const normalizedZ = (z - Z_MIN) / (Z_MAX - Z_MIN);
        const color = colorMap(normalizedZ);
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        vertexColors: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'Ejercicio2_Volumen';
    
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = (Z_MAX + Z_MIN) / 2;
    
    return mesh;
}

// --- Cálculo Numérico (Regla del Punto Medio) ---
export function calculateVolume(f, xMin, xMax, yMin, yMax, N = 200) {
    const dx = (xMax - xMin) / N;
    const dy = (yMax - yMin) / N;
    let volume = 0;

    for (let i = 0; i < N; i++) {
        const xi = xMin + (i + 0.5) * dx;
        
        for (let j = 0; j < N; j++) {
            const yj = yMin + (j + 0.5) * dy;
            const height = f(xi, yj);
            volume += height * dx * dy;
        }
    }
    return volume;
}