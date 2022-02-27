import * as THREE from "three";
import { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  Billboard,
} from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import getUuid from "uuid-by-string";
import useWindowSize from "../../utils/useWindowSize";

const GOLDENRATIO = 1.61803398875;

export default function RosterImages({ images }) {
  const size = useWindowSize();

  return (
    <Canvas
      gl={{ alpha: false }}
      dpr={[1, 1.5]}
      camera={{ fov: size.width < 768 ? 70 : 30, position: [0, 2, 15] }}
    >
      <color attach="background" args={["#000"]} />
      <fog attach="fog" args={["#191920", 0, 15]} />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <group position={[0, -0.75, 0]}>
          <Frames images={images} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[600, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={10}
              roughness={3}
              depthScale={1}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#070707"
              metalness={0.9}
            />
          </mesh>
        </group>
      </Suspense>
    </Canvas>
  );
}

function TextScene({ name }) {
  const ref = useRef();

  return (
    <Suspense fallback={null}>
      <Text
        ref={ref}
        font="/fonts/reg400.ttf"
        maxWidth={180}
        fontWeight={700}
        anchorX="center"
        textAlign={"center"}
        anchorY="middle"
        position={[0, 0.2, 0]}
        fontSize={0.1}
      >
        {name}
      </Text>
    </Suspense>
  );
}

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();
  const size = useWindowSize();

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(
        p.set(0, GOLDENRATIO / 2, size.width < 768 ? 1.5 : 2.9)
      );
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    state.camera.position.lerp(p, 0.025);
    state.camera.quaternion.slerp(q, 0.025);
  });
  return (
    <group
      ref={ref}
      onClick={(e) => {
        return (
          e.stopPropagation(),
          setLocation(
            clicked.current === e.object ? "/" : "/item/" + e.object.name
          )
        );
      }}
      onPointerMissed={() => setLocation("/")}
    >
      {images.map(
        (props) => <Frame key={props.url} {...props} /> /* prettier-ignore */
      )}
    </group>
  );
}

function Frame({ url, c = new THREE.Color(), ...props }) {
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const image = useRef();
  const frame = useRef();
  const name = getUuid(url);
  useCursor(hovered);
  useFrame((state) => {
    image.current.material.zoom = 1;
    image.current.scale.x = THREE.MathUtils.lerp(
      image.current.scale.x,
      0.85 * (hovered ? 0.85 : 1),
      0.1
    );
    image.current.scale.y = THREE.MathUtils.lerp(
      image.current.scale.y,
      0.9 * (hovered ? 0.905 : 1),
      0.1
    );
    frame.current.material.color.lerp(
      c.set(hovered ? "#D8D8D8" : "black").convertSRGBToLinear(),
      0.1
    );
  });
  return (
    <group
      onClick={() => {
        setTimeout(() => {
          window.open(props.site, "_blank");
        }, 2000);
      }}
      {...props}
    >
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, 1, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#000"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
      <TextScene name={props.name} />
    </group>
  );
}
