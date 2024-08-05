
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { MeshComponent } from './Model'
import { Suspense } from 'react'
import * as THREE from 'three';

function EggModel() {
  return (
    <>
    <Canvas id="hello" shadows
        onCreated={(state) => {
          state.gl.shadowMap.enabled = true;
          state.gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }} style={{width:"100vw", height:"100vh", background:"black"}}>
        <Suspense fallback={null}>
            <ambientLight intensity={2}  color={'white'}/>
            <spotLight
                position={[0, 0, 0]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
                color={'rgba(255,255,255)'}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
          /> 
          <MeshComponent onLoad={()=>{console.log("hi")}}/>
        </Suspense>
      </Canvas>
    </>
  )
}

export default EggModel