"use client";

import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import * as THREE from "three";

type CursorState = {
  active: boolean;
  x: number;
  y: number;
};

type NajLogoModelProps = {
  cursorStateRef: RefObject<CursorState>;
  reduceCursorMotion: boolean;
};

function NajLogoModel({
  cursorStateRef,
  reduceCursorMotion,
}: NajLogoModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/naj-logo.glb");

  const obsidianMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#030303"),
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        metalness: 0.36,
        reflectivity: 1,
        roughness: 0.1,
        transmission: 0.05,
        envMapIntensity: 2.35,
      }),
    [],
  );

  const logoScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    logoScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = obsidianMaterial;
      }
    });

    const bounds = new THREE.Box3().setFromObject(logoScene);
    const center = bounds.getCenter(new THREE.Vector3());
    logoScene.position.sub(center);
  }, [logoScene, obsidianMaterial]);

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    const cursor = cursorStateRef.current;
    const useCursor = cursor.active && !reduceCursorMotion;
    const targetPointerX = useCursor ? cursor.x : 0;
    const targetPointerY = useCursor ? cursor.y : 0;
    const driftX = Math.sin(elapsed * 0.34) * 0.035;
    const driftY = Math.sin(elapsed * 0.27 + 0.9) * 0.045;
    const driftZ = Math.sin(elapsed * 0.22 + 1.6) * 0.015;
    const pointerTiltX = targetPointerY * -0.24;
    const pointerTiltY = targetPointerX * 0.42;
    const pointerTiltZ = targetPointerX * -0.08;

    group.position.x = THREE.MathUtils.damp(
      group.position.x,
      targetPointerX * 0.22,
      3.2,
      delta,
    );
    group.position.y = THREE.MathUtils.damp(
      group.position.y,
      -0.18 + targetPointerY * 0.12 + Math.sin(elapsed * 0.42) * 0.075,
      3.2,
      delta,
    );
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      0.02 + driftX + pointerTiltX,
      3.8,
      delta,
    );
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      -0.18 + driftY + pointerTiltY,
      3.6,
      delta,
    );
    group.rotation.z = THREE.MathUtils.damp(
      group.rotation.z,
      driftZ + pointerTiltZ,
      3.4,
      delta,
    );
  });

  return (
    <group ref={groupRef}>
      <primitive object={logoScene} scale={2.325} />
    </group>
  );
}

type ReflectionLightsProps = {
  cursorStateRef: RefObject<CursorState>;
  reduceCursorMotion: boolean;
};

function ReflectionLights({
  cursorStateRef,
  reduceCursorMotion,
}: ReflectionLightsProps) {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const cursor = cursorStateRef.current;
    const useCursor = cursor.active && !reduceCursorMotion;
    const targetPointerX = useCursor ? cursor.x : 0;
    const targetPointerY = useCursor ? cursor.y : 0;

    if (keyLightRef.current) {
      keyLightRef.current.position.x = THREE.MathUtils.damp(
        keyLightRef.current.position.x,
        3.5 + targetPointerX * 2.4 + Math.sin(elapsed * 0.28) * 0.9,
        3.4,
        delta,
      );
      keyLightRef.current.position.y = THREE.MathUtils.damp(
        keyLightRef.current.position.y,
        4.1 + targetPointerY * 1.2 + Math.cos(elapsed * 0.23) * 0.45,
        3.4,
        delta,
      );
    }

    if (rimLightRef.current) {
      rimLightRef.current.position.x = THREE.MathUtils.damp(
        rimLightRef.current.position.x,
        -4.5 - targetPointerX * 1.9 + Math.sin(elapsed * 0.2 + 1) * 0.8,
        3,
        delta,
      );
      rimLightRef.current.position.z = THREE.MathUtils.damp(
        rimLightRef.current.position.z,
        4.5 + targetPointerY * 1.4 + Math.cos(elapsed * 0.26) * 0.7,
        3,
        delta,
      );
    }
  });

  return (
    <>
      <directionalLight
        ref={keyLightRef}
        color="#ffffff"
        intensity={3.1}
        position={[3.5, 4.1, 5]}
      />
      <directionalLight
        ref={rimLightRef}
        color="#c6d0d6"
        intensity={2.4}
        position={[-4.5, 0.2, 4.5]}
      />
      <directionalLight
        color="#ffffff"
        intensity={1.35}
        position={[0, -3, 5]}
      />
    </>
  );
}

export function Naj3D() {
  const cursorStateRef = useRef<CursorState>({ active: false, x: 0, y: 0 });
  const reduceCursorMotion = usePrefersReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) {
      return;
    }

    const resetCursor = () => {
      cursorStateRef.current.active = false;
      cursorStateRef.current.x = 0;
      cursorStateRef.current.y = 0;
    };

    const updateCursor = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const visibleLeft = Math.max(rect.left, 0);
      const visibleRight = Math.min(rect.right, window.innerWidth);
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, window.innerHeight);
      const visibleWidth = visibleRight - visibleLeft;
      const visibleHeight = visibleBottom - visibleTop;

      if (
        visibleWidth <= 0 ||
        visibleHeight <= 0 ||
        event.clientX < visibleLeft ||
        event.clientX > visibleRight ||
        event.clientY < visibleTop ||
        event.clientY > visibleBottom
      ) {
        resetCursor();
        return;
      }

      const x = ((event.clientX - visibleLeft) / visibleWidth) * 2 - 1;
      const y = -(((event.clientY - visibleTop) / visibleHeight) * 2 - 1);

      cursorStateRef.current.active = true;
      cursorStateRef.current.x = THREE.MathUtils.clamp(x, -1, 1);
      cursorStateRef.current.y = THREE.MathUtils.clamp(y, -1, 1);
    };

    const updateScrollState = () => {
      const rect = hero.getBoundingClientRect();
      const isMostlyLeaving =
        rect.bottom < window.innerHeight * 0.42 || rect.top > window.innerHeight;

      if (isMostlyLeaving) {
        resetCursor();
      }
    };

    hero.addEventListener("pointermove", updateCursor);
    hero.addEventListener("pointerenter", updateCursor);
    hero.addEventListener("pointerleave", resetCursor);
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", resetCursor);

    return () => {
      hero.removeEventListener("pointermove", updateCursor);
      hero.removeEventListener("pointerenter", updateCursor);
      hero.removeEventListener("pointerleave", resetCursor);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", resetCursor);
    };
  }, []);

  return (
    <div className="absolute left-1/2 top-1/2 h-[588px] w-[980px] -translate-x-1/2 -translate-y-1/2 overflow-visible">
      <Canvas
        camera={{ fov: 34, position: [0, 0, 10.5] }}
        className="!block !h-[588px] !w-[980px]"
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        resize={{ scroll: false }}
        shadows
      >
        <ambientLight intensity={0.34} />
        <ReflectionLights
          cursorStateRef={cursorStateRef}
          reduceCursorMotion={reduceCursorMotion}
        />
        <Environment preset="studio" />
        <NajLogoModel
          cursorStateRef={cursorStateRef}
          reduceCursorMotion={reduceCursorMotion}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/naj-logo.glb");

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}
