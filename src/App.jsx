import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ImageCarousel from "./components/Carousel";
import Products from "./pages/Products";
import FlashDealCarousel from "./components/FlashDealCarousel";
import MalePerfumeProductsCarousel from "./components/MalePerfumeCarousel";
import FemalePerfumeProductsCarousel from "./components/FemalePerfumeCarousel";
import UnisexPerfumeProductsCarousel from "./components/UnisexPerfumeCarousel";
import PostList from "./components/PostList";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <ImageCarousel />
            <FlashDealCarousel />
            <MalePerfumeProductsCarousel />
            <FemalePerfumeProductsCarousel />
            <UnisexPerfumeProductsCarousel />
            <PostList />
          </>
        } />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
