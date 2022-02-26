import React, { Suspense, VFC, useEffect, useState } from 'react';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Effect } from './Effect.tsx';
import { ImagePlane } from './ImagePlane.tsx';
import  useWindowSize  from '../utils/useWindowSize.js'

export const TCanvas: VFC = () => {
	const size = useWindowSize();

	return (
		<Canvas
			camera={{
				position: [0, 0, size.width < 768 ? 2 : 1],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}
			>
			{/* canvas color */}
			<color attach="background" args={['#000']} />
			{/* camera controller */}
			{/* <OrbitControls attach="orbitControls" /> */}
			{/* helper */}
			{/* <Stats /> */}
			{/* object */}
			<Suspense fallback={null}>
				<ImagePlane />
			</Suspense>
			{/* effect */}
			<Effect />
		</Canvas>
	)
}
