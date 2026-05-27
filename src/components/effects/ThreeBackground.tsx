"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import * as THREE from "three"

function RainField({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = Math.random() * 20 - 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
      vel[i] = Math.random() * 0.2 + 0.1
    }
    return [pos, vel]
  }, [count])

  useFrame(() => {
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        const idx = i * 3 + 1
        pos[idx] -= velocities[i]
        // Reset rain drop to top if it falls below screen
        if (pos[idx] < -10) {
          pos[idx] = 10
          pos[i * 3] = (Math.random() - 0.5) * 40
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        transparent
        opacity={0.3}
        color="#888888"
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function TopographicGrid() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  
  return (
    <mesh position={[0, 0, -4]} scale={[30, 20, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv * 10.0;
            float lineX = smoothstep(0.0, 0.02, abs(fract(uv.x) - 0.5));
            float lineY = smoothstep(0.0, 0.02, abs(fract(uv.y) - 0.5));
            float grid = 1.0 - (lineX * lineY);
            // Crimson grid lines
            gl_FragColor = vec4(0.4, 0.02, 0.02, grid * 0.2);
          }
        `}
      />
    </mesh>
  )
}

function CinematicBackground() {
  // Load the generated cinematic image
  const texture = useLoader(THREE.TextureLoader, '/batman-cinematic.png')
  
  return (
    <mesh position={[0, 0, -5]}>
      {/* Plane large enough to cover background */}
      <planeGeometry args={[25, 14]} />
      <meshBasicMaterial map={texture} depthWrite={false} />
    </mesh>
  )
}

function VolumetricSmoke() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })
  return (
    <mesh position={[0, -2, -1]} scale={[25, 15, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        transparent
        depthWrite={false}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec2 vUv;
          
          // Simple noise function
          float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
          float noise(vec2 p) {
            vec2 i = floor(p); vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                       mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
          }
          float fbm(vec2 p) {
            float f = 0.0;
            f += 0.5000 * noise(p); p = p * 2.02;
            f += 0.2500 * noise(p); p = p * 2.03;
            f += 0.1250 * noise(p); p = p * 2.01;
            f += 0.0625 * noise(p);
            return f;
          }

          void main() {
            vec2 uv = vUv;
            // Scroll smoke upwards and sideways
            vec2 q = uv * 3.0 - vec2(uTime * 0.1, uTime * 0.15);
            float f = fbm(q);
            
            // Concentrate smoke at bottom
            float gradient = smoothstep(0.8, 0.0, uv.y);
            
            // Vibrant Vengeance Crimson smoke
            vec3 color = mix(vec3(0.0), vec3(0.5, 0.01, 0.01), f);
            gl_FragColor = vec4(color, f * gradient * 0.8);
          }
        `}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      
      {/* Background image plane */}
      <CinematicBackground />
      
      {/* Topographic grid overlay */}
      <TopographicGrid />
      
      {/* Volumetric smoke rolling in front */}
      <VolumetricSmoke />

      {/* High-speed rain streaks */}
      <RainField count={3000} />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "#050505",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
