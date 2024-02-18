import Hero from "@/components/layout/Home/Hero";
import HomeAbout from "@/components/layout/Home/HomeAbout";
import HomeMenu from "@/components/layout/Home/HomeMenu";
import React from "react";

export default function Home() {
  return (
    <>
      <Hero/>
      <HomeMenu/>
      <HomeAbout/>
    </>
  );
}
