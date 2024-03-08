import HomeMainSection from '@/components/layout/Home/HomeMainSection'
import HomeAbout from '@/components/layout/Home/HomeAbout'
import HomeMenu from '@/components/layout/Home/HomeMenu'
import React from 'react'

export default function Home() {
  return (
    <>
      <HomeMainSection />
      <HomeMenu />
      <HomeAbout />
    </>
  )
}
