import React, { VFC, useState, useEffect } from 'react';
import { TCanvas } from './TCanvas.tsx';

export const Test: VFC = () => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true)
	}, [])


	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			{loaded && <TCanvas />}
			{/* <img src="/images/logo.png" /> */}
		</div>
	)
}
