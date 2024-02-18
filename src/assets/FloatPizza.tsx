"use client";

import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import useWindowDimensions from "@/hooks/useWindowDimensions";

type GLTFResult = GLTF & {
	nodes: {
		Object_2_Material__2001_0: THREE.Mesh;
		piza_low_01Group259_lambert1_0: THREE.Mesh;
	};
	materials: {
		["Material__2.001"]: THREE.MeshStandardMaterial;
		lambert1: THREE.MeshStandardMaterial;
	};
	animations?: any[];
};

type ContextType = Record<
	string,
	React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export function FloatPizza(props: JSX.IntrinsicElements["group"]) {
	const { width } = useWindowDimensions();
	const { nodes, materials } = useGLTF("/pizza3d/scene.gltf") as GLTFResult;

	const [scale, setScale] = useState(320);

	useEffect(() => {
		if (width < 769) {
			setScale(140);
		}	else if (width < 1025) {
			setScale(200);
		} else if (width > 1024) {
			setScale(270);
		}
	}, [width]);
	return (
		<group {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]} scale={0.013}>
				<group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
					<mesh
						geometry={nodes.piza_low_01Group259_lambert1_0.geometry}
						material={materials.lambert1}
						position={[0, 0, 0]}
						rotation={[Math.PI / 0.5, 1.5, 1.5]}
						scale={scale}
					/>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("/pizza3d/scene.gltf");
