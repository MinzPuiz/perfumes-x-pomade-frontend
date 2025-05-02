import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ImageCarousel from "./components/Carousel";
import Products from "./pages/Products";
import FlashDealCarousel from "./components/FlashDealCarousel";
import MalePerfumeProducts from "./components/MalePerfumeProducts";
import FemalePerfumeProducts from "./components/FemalePerfumeProducts";
import UnisexPerfumeProducts from "./components/UnisexPerfumeProducts";
import PostList from "./components/PostList";
import ProductDetail from "./pages/ProductDetail";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/perfumes-x-pomade-frontend" element={
          <>
            <ImageCarousel />
            <FlashDealCarousel />
            <MalePerfumeProducts />
            <FemalePerfumeProducts />
            <UnisexPerfumeProducts />
            <PostList />
          </>
        } />
        <Route path="/products/:slug" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
