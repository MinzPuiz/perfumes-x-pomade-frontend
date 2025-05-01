import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ImageCarousel from "./components/Carousel";
import Products from "./pages/Products";
import FlashDealCarousel from "./components/FlashDealCarousel";
import MalePerfumeProducts from "./components/MalePerfumeProducts";
import FemalePerfumeProducts from "./components/FemalePerfumeProducts";
import UnisexPerfumeProducts from "./components/UnisexPerfumeProducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App(){
  return (
    <>
      <Header></Header>
      <ImageCarousel></ImageCarousel>
      <FlashDealCarousel></FlashDealCarousel>
      <MalePerfumeProducts></MalePerfumeProducts>
      <FemalePerfumeProducts></FemalePerfumeProducts>
      <UnisexPerfumeProducts></UnisexPerfumeProducts>
      <Footer></Footer>
    </>
  );
}

export default App;