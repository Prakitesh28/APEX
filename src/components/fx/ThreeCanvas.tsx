"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function FogShader() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })
  return (
    <mesh scale={[20, 20, 1]} position={[0, 0, -1]}>
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
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }
          void main() {
            vec2 uv = vUv * 3.0;
            float n = noise(uv + uTime * 0.0003);
            float d = length(vUv - 0.5);
            float fog = smoothstep(1.0, 0.2, d);
            float alpha = 0.15 + 0.1 * n;
            vec3 color = vec3(0.353, 0.0, 0.0);
            gl_FragColor = vec4(color, fog * alpha);
          }
        `}
      />
    </mesh>
  )
}

function ParticleSystem({ count = 800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const seed = 42
    const rng = (i: number) => {
      const x = Math.sin(seed + i * 127.1) * 43758.5453
      return x - Math.floor(x)
    }
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rng(i * 3) - 0.5) * 18
      pos[i * 3 + 1] = (rng(i * 3 + 1) - 0.5) * 18
      pos[i * 3 + 2] = (rng(i * 3 + 2) - 0.5) * 10 - 2
      spd[i] = 0.5 + rng(i + count) * 1.5
    }
    return { positions: pos, speeds: spd }
  }, [count])

  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1
      pos[idx] += 0.0002 * speeds[i]
      if (pos[idx] > 5) pos[idx] = -5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} transparent opacity={0.6} sizeAttenuation color="#ffffff" blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function Scene() {
  return (
    <>
      <FogShader />
      <ParticleSystem />
    </>
  )
}

export default function ThreeCanvas() {
  const [mounted, setMounted] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
