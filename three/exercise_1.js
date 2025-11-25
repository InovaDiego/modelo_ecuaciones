
import * as THREE from '../node_modules/three/build/three.module.js';

// 1. Define la función matemática (f(x) = x^2)
const f = (x) => x * x;

export function createSurfaceOfRevolution(a = 0, b = 2, segments = 50) {
    const profilePoints = [];
    
    // Generar los puntos 2D (Vector2) para el perfil de la curva
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = a + (b - a) * t;
        const y = f(x); 
        
        // LatheGeometry rota alrededor de Y. Vector2 es (radio, altura)
        // El radio es x, la altura es y=f(x)
        profilePoints.push(new THREE.Vector2(x, y));
    }

    // 2. Crear la geometría de torno
    const geometry = new THREE.LatheGeometry(
        profilePoints,
        32, // segmentos radiales
        0,
        Math.PI * 2
    );

    // 3. Crear el material y la malla (Mesh)
    const material = new THREE.MeshPhongMaterial({
        color: 0x48A0FF, 
        side: THREE.DoubleSide,
        shininess: 50,
        wireframe: false // Puedes cambiar a true para ver la estructura de malla
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'Ejercicio1_Superficie';
    
    return mesh;
}