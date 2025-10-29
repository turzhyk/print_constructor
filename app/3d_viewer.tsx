import * as THREE from "three";

import React, { useRef, useState, useEffect } from "react";
import { useFrame, ThreeElements, useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextureLoader } from "three";
import { createRoot } from "react-dom/client";
import { useItemPropsStorage } from "./storage/useItemPropsStorage";

type BoxProps = ThreeElements["mesh"] & {
  url?: string; // твой новый проп
};

const viewerCamera = new THREE.PerspectiveCamera(25, 1, 1, 1000);
viewerCamera.position.set(0, 2, -10);
viewerCamera.lookAt(0, -1, 0);


const ModelViewer = ({ canvasUrl }: { canvasUrl: string }) => {
  const itemsProps = useItemPropsStorage(s=>s.itemsProps);
  // if (canvasUrl === "") return null;
  useEffect(()=>{},[itemsProps]);
  return (
    <Canvas camera={viewerCamera}>
      <ambientLight intensity={Math.PI / 10} />
      <pointLight position={[10, 3, -10]} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, 3, 0]} decay={0} intensity={Math.PI} />
      
      
      <Box url={canvasUrl} />
    </Canvas>
  );
};
export function Box({ url, ...props }: BoxProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (meshRef.current.rotation.y += delta));
  const gltf = useLoader(GLTFLoader, "cup.gltf");
  const gltf2 = useLoader(GLTFLoader, "cup_print.gltf");
  const model_handle = useLoader(GLTFLoader, "cup_handle.gltf");
  const model_inner = useLoader(GLTFLoader, "cup_inner.gltf");
  const model_inshad = useLoader(GLTFLoader, "cup_in_shad.gltf");

  const colorMap = useLoader(TextureLoader, url ? url : "cup_normal.png");
  const normalMap = useLoader(TextureLoader, "cup_normal.png");
  const shadow = useLoader(TextureLoader, "cup_shadow.png");
  const inshad = useLoader(TextureLoader, "_shad_.png");

  useEffect(() => {
    gltf2.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const materials = new THREE.MeshStandardMaterial({
          roughness: 0.03,
          map: colorMap,
          normalMap: normalMap,
        });
        mesh.material = materials;
      }
    });
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const materials = new THREE.MeshStandardMaterial({
          roughness: 0.03,

          normalMap: normalMap,
        });
        mesh.material = materials;
      }
    });
    model_handle.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const materials = new THREE.MeshStandardMaterial({
          roughness: 0.03,
          color: 0xd72525,
          normalMap: normalMap,
        });
        mesh.material = materials;
      }
    });
    model_inner.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const materials = new THREE.MeshStandardMaterial({
          roughness: 0.03,
          color: 0xd72525,
          normalMap: normalMap,
        });
        mesh.material = materials;
      }
    });
    model_inshad.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const materials = new THREE.MeshStandardMaterial({
          map:inshad,
          transparent: true,
          opacity: 0.7
        });
        mesh.material = materials;
      }
    });
  }, [gltf, gltf2, colorMap]);
  //position={[-0.001, 0,0.015]}
  return (
    <>
      <mesh ref={meshRef} scale={30} position={[0, -1, 0]}>
        <primitive object={gltf2.scene} position={[-0.0, 0, 0.0]} />
        <primitive object={gltf.scene} position={[-0.0, 0, 0.0]} />
        <primitive object={model_handle.scene} position={[-0.0, 0, 0.0]} />
        <primitive object={model_inner.scene} position={[-0.0, 0, 0.0]} />
        <primitive object={model_inshad.scene} position={[-0.0, 0.06, 0.0]} scale={[-1,-1,-1]} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.5, 0]}
        scale={1}
        receiveShadow
      >
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial
          map={shadow}
          transparent
          opacity={0.6} // чтобы тень выглядела мягче
        />
      </mesh>
    </>
  );
}
export default ModelViewer;
