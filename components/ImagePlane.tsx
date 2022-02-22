import React, { VFC } from 'react';
import * as THREE from 'three';
import { Plane, useTexture, Box } from '@react-three/drei';
// import { publicPath } from '../utils/file.ts';

export const ImagePlane: VFC = () => {
	const path = (name: string) => `/images/${name}.png`;
	const textures = useTexture([path('black'), path('gpo'), path('black')])

	const material = (texture: THREE.Texture) =>
		new THREE.ShaderMaterial({
			uniforms: {
				u_texture: { value: texture }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		})

	return (
		<>
			{textures.map((texture, i) => (
				<Plane key={i} material={material(texture)} scale={0.98} position={[i - 1, 0, 0]} />
			))}
		</>
	)
}

// --------------------------------------------------------
const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const fragmentShader = `
uniform sampler2D u_texture;
varying vec2 v_uv;

void main() {
  vec4 color = texture2D(u_texture, v_uv);
  gl_FragColor = color;
}
`
