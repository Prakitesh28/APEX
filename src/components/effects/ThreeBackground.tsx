"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function FogShaderMaterial() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })
  return (
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
        void main() {
          vec2 uv = vUv;
          float d = length(uv - 0.5);
          float fog = smoothstep(0.8, 0.2, d);
          float pulse = 0.85 + 0.15 * sin(uTime * 0.5 + uv.y * 4.0 + uv.x * 3.0);
          vec3 color = mix(vec3(0.1, 0.0, 0.0), vec3(0.5, 0.02, 0.02), fog * pulse);
          gl_FragColor = vec4(color, fog * 0.35);
        }
      `}
    />
  )
}

function GrainOverlay() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })
  return (
    <mesh scale={[2, 2, 1]}>
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
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }
          void main() {
            vec2 uv = vUv * 400.0;
            vec2 i = floor(uv);
            vec2 f = fract(uv);
            float grain = hash(i + 0.1 * floor(uTime * 24.0));
            gl_FragColor = vec4(vec3(grain * 0.08), grain * 0.06);
          }
        `}
      />
    </mesh>
  )
}

function ParticleField({ count = 240 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const size = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
      size[i] = Math.random() * 3 + 1
    }
    return [pos, size]
  }, [count])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position.array as Float32Array
      const t = clock.getElapsedTime() * 0.08
      for (let i = 0; i < count; i++) {
        const idx = i * 3 + 1
        let y = pos[idx] - 0.008
        if (y < -10) y = 10
        pos[idx] = y + 0.001 * Math.sin(t + i * 0.1)
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
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        transparent
        opacity={0.7}
        sizeAttenuation
        color="#cc8888"
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function SilhouetteFigure() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.1
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <Float speed={0.8} rotationIntensity={0.04} floatIntensity={0.15}>
        <group>
          <mesh position={[0, 1.2, 0]}>
            <planeGeometry args={[0.7, 0.9]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[0, 0.6, 0.1]}>
            <planeGeometry args={[0.55, 0.5]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[0, -0.1, 0.1]}>
            <planeGeometry args={[0.65, 0.7]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[0, -0.65, 0]}>
            <planeGeometry args={[0.6, 0.4]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[-0.35, 0.9, 0.3]} rotation={[0, 0, 0.2]}>
            <planeGeometry args={[0.2, 0.6]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[0.35, 0.9, 0.3]} rotation={[0, 0, -0.2]}>
            <planeGeometry args={[0.2, 0.6]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[-0.35, -0.35, 0.3]} rotation={[0, 0, 0.15]}>
            <planeGeometry args={[0.18, 0.5]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[0.35, -0.35, 0.3]} rotation={[0, 0, -0.15]}>
            <planeGeometry args={[0.18, 0.5]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#0a0000"]} />
      <fog attach="fog" args={["#1a0000", 5, 18]} />
      <ambientLight intensity={0.15} color="#442222" />
      <directionalLight
        position={[3, 1, 2]}
        intensity={0.9}
        color="#ff4444"
        castShadow
      />
      <directionalLight
        position={[-2, 0.5, 1]}
        intensity={0.3}
        color="#ff2222"
      />
      <ParticleField />
      <SilhouetteFigure />
      <mesh scale={[20, 20, 1]} position={[0, 0, -3]}>
        <planeGeometry args={[1, 1]} />
        <FogShaderMaterial />
      </mesh>
      <GrainOverlay />
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
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
