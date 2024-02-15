import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import React from "react";

export default function Home() {
  
  const Pizza = React.lazy(() => import('../components/layout/PizzaWrap'));

  return (
    <>
      <Header/>
      <Hero/>
      <HomeMenu/>
    </>
  );
}
