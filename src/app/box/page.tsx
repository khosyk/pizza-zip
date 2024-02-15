'use client'

import Box from "@/components/layout/PizzaWrap";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";

export default function BoxPage() {
  return (
    <>
      <Canvas>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
  </Canvas>
  <Link href={'/'}>
    TOHOME
  </Link>
    </>
  );
}
