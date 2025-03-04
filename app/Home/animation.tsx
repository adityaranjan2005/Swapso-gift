import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

function EthereumModel(props : any) {
  const { scene } = useGLTF('/logo_color.glb');
  return <primitive object={scene} {...props} />;
}

const Animation = () => {
  return (
    <Canvas style={{ height: '40vh' }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <directionalLight position={[-10, -10, -10]} intensity={1.5} />
      <pointLight position={[0, 10, 10]} intensity={2} />
      <Suspense fallback={null}>
      <EthereumModel position={[0, 0, 0]} scale={[3.2, 3.1, 3.2]} rotation={[0, 0, 0]} />
      </Suspense>
      <Environment preset="sunset" />
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
};

export default Animation;
