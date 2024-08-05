//@ts-nocheck
'use client'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { OrbitControls, RGBELoader } from 'three/examples/jsm/Addons.js'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three';



export const MeshComponent: React.FC<{ onLoad: () => void }> = ({ onLoad }) => {
    const fileUrl = 'egg.glb';
    const gltf = useLoader(GLTFLoader, fileUrl, () => onLoad());
    const meshRef = useRef<THREE.Mesh>(null);
  
    useFrame(({ clock, camera, controls }) => {
        
        camera.position.x = meshRef.current?.position.x-5;
        camera.position.y = meshRef.current?.position.y-5;
        camera.position.z = meshRef.current?.position.z-5;
       
    });
  
    return gltf ? (
      <mesh position={[0,0,0]} rotation={[0,0,0]} scale={32} ref={meshRef} castShadow receiveShadow>
        <primitive object={gltf.scene} />
      </mesh>
    ) : null;
  };
  