'use client'

import React, {
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, Sky } from '@react-three/drei'
import { FloatPizza } from '@/assets/FloatPizza'

// type Props ={
// };

function PizzaWrap() {
  const [rotate, setRotate] = useState<boolean>(true)
  const handleClick = () => {
    setRotate(false)
  }

  return (
    <Canvas onClick={handleClick} camera={{ position: [0, 0, 0.7] }}>
      <Environment preset="studio" />
      <FloatPizza />
      <OrbitControls autoRotate={rotate} autoRotateSpeed={1} />
    </Canvas>
  )
}

export default PizzaWrap
