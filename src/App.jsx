import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ImageCarousel from "./components/Carousel";
import Login from './pages/Login';
import Register from './pages/Register';
import Products from "./pages/Products";
import FlashDealCarousel from "./components/FlashDealCarousel";
import MalePerfumeProductsCarousel from "./components/MalePerfumeCarousel";
import FemalePerfumeProductsCarousel from "./components/FemalePerfumeCarousel";
import UnisexPerfumeProductsCarousel from "./components/UnisexPerfumeCarousel";
import PostList from "./components/PostList";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./pages/Checkout";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  useEffect(() => {
    if (window.location.pathname === '/perfumes-x-pomade-frontend') {
      window.location.replace('/perfumes-x-pomade-frontend/');
    }
  }, []);
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/category/:slug" element={<CategoryPage />} />

        {/* Trang thanh toán bảo vệ bởi PrivateRoute */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
