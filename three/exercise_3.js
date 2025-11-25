// three/exercise_3.js

// 🚩 RUTA Three.js: Subir un nivel (../) para encontrar node_modules
import * as THREE from '../node_modules/three/build/three.module.js';

// --- Parámetros del Campo ---
const GRID_RANGE = 5;
const GRID_STEP = 1.5;
const ARROW_LENGTH = 1.0;

// --- Campo Vectorial F(x, y, z) = (yz, xz, xy) ---
export function F(x, y, z) {
    return new THREE.Vector3(
        y * z,
        x * z,
        x * y
    );
}

// --- 1. Dibujar el Campo con Flechas (ArrowHelper) ---
export function createVectorFieldVisualization() {
    const group = new THREE.Group();
    group.name = 'Ejercicio3_CampoVectorial';
    
    const halfRange = GRID_RANGE / 2;

    for (let x = -halfRange; x <= halfRange; x += GRID_STEP) {
        for (let y = -halfRange; y <= halfRange; y += GRID_STEP) {
            for (let z = -halfRange; z <= halfRange; z += GRID_STEP) {
                
                const origin = new THREE.Vector3(x, y, z);
                const vector = F(x, y, z);
                
                const magnitude = vector.length();
                const direction = vector.normalize();
                
                const colorValue = Math.min(magnitude / 15.0, 1.0);
                const color = new THREE.Color().setHSL(0.1 + (1.0 - colorValue) * 0.1, 1, 0.5 + colorValue * 0.4);
                
                const arrow = new THREE.ArrowHelper(
                    direction,
                    origin,
                    ARROW_LENGTH,
                    color.getHex(),
                    0.2,
                    0.1
                );
                group.add(arrow);
            }
        }
    }
    
    return group;
}

// --- 2. Cálculo de la Trayectoria (Runge-Kutta 4) ---
export function createParticleTrajectory(startPoint, steps = 200, dt = 0.05, color = 0xFF00FF) {
    const points = [];
    let currentPoint = startPoint.clone();
    points.push(currentPoint.clone());

    for (let i = 0; i < steps; i++) {
        const r = currentPoint;
        
        const k1 = F(r.x, r.y, r.z).multiplyScalar(dt);
        const k2 = F(r.x + k1.x / 2, r.y + k1.y / 2, r.z + k1.z / 2).multiplyScalar(dt);
        const k3 = F(r.x + k2.x / 2, r.y + k2.y / 2, r.z + k2.z / 2).multiplyScalar(dt);
        const k4 = F(r.x + k3.x, r.y + k3.y, r.z + k3.z).multiplyScalar(dt);
        
        const nextPoint = currentPoint.clone();
        nextPoint.add(k1.add(k2.multiplyScalar(2)).add(k3.multiplyScalar(2)).add(k4).divideScalar(6));

        currentPoint = nextPoint;
        points.push(currentPoint.clone());
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: color, linewidth: 3 });
    const line = new THREE.Line(geometry, material);
    
    line.name = 'Trayectoria';
    return line;
}

// --- 3. Integral de Línea ---
export function calculateLineIntegral(points, F) {
    let work = 0;

    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        const dr = p2.clone().sub(p1);
        const midpoint = p1.clone().add(dr.clone().divideScalar(2));
        const F_mid = F(midpoint.x, midpoint.y, midpoint.z);
        
        // Producto punto: F · dr
        work += F_mid.dot(dr);
    }
    return work;
}