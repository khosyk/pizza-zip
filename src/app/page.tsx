import Footer from "@/components/layout/Home/Footer";
import Header from "@/components/layout/Home/Header";
import Hero from "@/components/layout/Home/Hero";
import HomeAbout from "@/components/layout/Home/HomeAbout";
import HomeMenu from "@/components/layout/Home/HomeMenu";
import SectionHeaders from "@/components/layout/Home/SectionHeaders";
import React from "react";

export default function Home() {
  
  const Pizza = React.lazy(() => import('../components/layout/Home/PizzaWrap'));

  return (
    <>
      <Header/>
      <Hero/>
      <HomeMenu/>
      <HomeAbout/>
      <Footer/>
    </>
  );
}
