"use client";
import * as THREE from "three";


import React, { useRef, useState, useEffect } from "react";
import { useFrame, ThreeElements, useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextureLoader } from "three";
import useTextureLinkStore from "./hooks/useTextureURL";
import {
  Environment,
  OrbitControls,
} from "@react-three/drei";


type BoxProps = ThreeElements["mesh"] & {
  url: string; // твой новый проп
  rotating: boolean;
};
function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

const viewerCamera = new THREE.PerspectiveCamera(25, 1, 1, 1000);
viewerCamera.position.set(0, 3, -10);
viewerCamera.lookAt(0, -1, 0);

const ModelViewer = () => {
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const url = useTextureLinkStore((s) => s.link);
  // if (canvasUrl === "") return null;
  // const tableColor = useLoader(
  //   TextureLoader,
  //   "textures/wood2/kitchen_wood_diff_2k.jpg"
  // );
  // const tableNormal = useLoader(
  //   TextureLoader,
  //   "textures/wood2/kitchen_wood_nor_gl_2k.jpg"
  // );
  // const tableRough = useLoader(
  //   TextureLoader,
  //   "textures/wood2/kitchen_wood_rough_2k.jpg"
  // );

  const setRotate = () => {
    setIsRotating(false);
  };
  const onControlEnd = async () => {
    await timeout(500);
    setIsRotating(true);
  };
  
  return (
    <Canvas camera={viewerCamera} gl={{ preserveDrawingBuffer: true }} key="stable" onMouseUp={onControlEnd} onMouseDown={setRotate}>
      {/* <ambientLight intensity={Math.PI /5} />  */}
      {/* <pointLight position={[10, 3, -10]} intensity={100} /> */}

      <pointLight position={[-5, 3, 7]} intensity={20} />
      <pointLight position={[0, 10, 0]}  intensity={40} />
      <Box url={url} rotating={isRotating} />
      {/* <Environment preset={""} environmentIntensity={0.8} /> */}
      {/* <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.55, 0]}
        scale={6}
        receiveShadow
      >
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          map={tableColor}
          normalMap={tableNormal}
          roughnessMap={tableRough}
        />
      </mesh> */}

      <OrbitControls
        maxPolarAngle={Math.PI / 2.5}
        minPolarAngle={Math.PI / 2.5}
        enablePan={false}
        enableZoom={false}
      />
      <Environment
        background={false} // can be true, false or "only" (which only sets the background) (default: false)
        backgroundBlurriness={0.05} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
        backgroundIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
        backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
        environmentIntensity={0.6} // optional intensity factor (default: 1, only works with three 0.163 and up)
        environmentRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
        // files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
        files="hdri/studio001/brown_photostudio_02_2k.hdr"
        path=""
        scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
       
      />
    </Canvas>
  );
};
export function Box({ url, rotating, ...props }: BoxProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  let rotDelta = 0.01;
  if (!rotating) rotDelta = 0;
  useFrame((state, delta) => (meshRef.current.rotation.y += rotDelta));
  const gltf = useLoader(GLTFLoader, "cup.gltf");
  const gltf2 = useLoader(GLTFLoader, "cup_print.gltf");
  const model_handle = useLoader(GLTFLoader, "cup_handle.gltf");
  const model_inner = useLoader(GLTFLoader, "cup_inner.gltf");
  const model_inshad = useLoader(GLTFLoader, "cup_in_shad.gltf");

  const colorMap = useLoader(TextureLoader, url);
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
          // color: 0xd72525,
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
          // color: 0xd72525,
          normalMap: normalMap,
        });
        mesh.material = materials;
      }
    });
    model_inshad.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const materials = new THREE.MeshStandardMaterial({
          map: inshad,
          transparent: true,
          opacity: 0.7,
        });
        mesh.material = materials;
      }
    });
  }, [gltf, gltf2, colorMap]);
  //position={[-0.001, 0,0.015]}
  return (
    <>
      <mesh ref={meshRef} scale={30} position={[0, 0, 0]}>
        <primitive object={gltf2.scene} position={[-0.0, 0, 0.0]} />
        <primitive object={gltf.scene} position={[-0.0, 0, 0.0]} />
        <primitive object={model_handle.scene} position={[-0.0, 0, 0.0]} />
        <primitive object={model_inner.scene} position={[-0.0, 0, 0.0]} />
        <primitive
          object={model_inshad.scene}
          position={[-0.0, 0.06, 0.0]}
          scale={[-1, -1, -1]}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
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
