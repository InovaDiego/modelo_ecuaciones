// three/exercise_1.js

// 🚩 RUTA Three.js: Subir un nivel (../) para encontrar node_modules
import * as THREE from '../node_modules/three/build/three.module.js';

// --- Parámetros del Ejercicio 1 ---
export const a = 0;
export const b = 2;
const segments = 50;
export const f = (x) => x * x; // Función: f(x) = x^2
export const fPrime = (x) => 2 * x; // Derivada: f'(x) = 2x
// ------------------------------------

// --- 1. Visualización (LatheGeometry) ---

export function createSurfaceOfRevolution() {
    const profilePoints = [];
    
    // Generar los puntos 2D (Vector2) para el perfil de la curva
    for (let i = 0; i <= segments; i++) {
        const x = a + (b - a) * (i / segments);
        const y = f(x); 
        profilePoints.push(new THREE.Vector2(x, y));
    }

    const geometry = new THREE.LatheGeometry(
        profilePoints,
        32,
        0,
        Math.PI * 2
    );

    const material = new THREE.MeshPhongMaterial({
        color: 0x48A0FF,
        side: THREE.DoubleSide,
        shininess: 50,
        wireframe: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'Ejercicio1_Superficie';
    
    return mesh;
}


// --- 2. Cálculo Numérico (Área Superficial) ---

/**
 * Calcula el área superficial de revolución (S) usando la Regla del Trapecio.
 * S = 2π * integral(f(x) * sqrt(1 + f'(x)^2)) dx
 */
export function calculateSurfaceArea(f, fPrime, a, b, N = 1000) {
    const h = (b - a) / N; // Ancho de cada subintervalo
    let sum = 0;

    // Función a integrar: g(x) = f(x) * sqrt(1 + f'(x)^2)
    const g = (x) => {
        const fp = fPrime(x);
        return f(x) * Math.sqrt(1 + fp * fp);
    };

    // Aplicar la Regla del Trapecio compuesta
    for (let i = 1; i < N; i++) {
        const x = a + i * h;
        sum += g(x);
    }

    // Fórmula del Trapecio: h/2 * [g(a) + 2*sum(g(xi)) + g(b)]
    const integralValue = (h / 2) * (g(a) + 2 * sum + g(b));

    // Multiplicar por 2π
    const surfaceArea = 2 * Math.PI * integralValue;
    
    return surfaceArea;
}