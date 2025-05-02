import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getProducts } from "../../services/productServices";
import FlashDealProduct from "./FlashDealProduct";
import "../assets/price.css";
import "../assets/modal.css";

const FlashDealCarousel = () => {
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const filtered = data.filter((p) => p.status === "sale_off");
        setSaleProducts(filtered);
      })
      .catch((err) => console.error("Lỗi khi lấy sản phẩm giảm giá:", err));
  }, []);

  // Đảm bảo không lặp nếu sản phẩm ít
  const slidesToShow = saleProducts.length < 4 ? saleProducts.length : 4;

  const settings = {
    dots: false,
    infinite: true, // Kích hoạt tính năng vòng lặp
    speed: 500,
    slidesToShow: slidesToShow, // Hiển thị số slide phụ thuộc vào số sản phẩm
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Tốc độ auto-play
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(saleProducts.length, 3), // Điều chỉnh cho tablet
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(saleProducts.length, 2), // Điều chỉnh cho mobile
        },
      },
    ],
  };

  if (saleProducts.length === 0) return null; // không có gì thì khỏi hiển thị

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="border-4 border-dashed border-[#795548] rounded-xl bg-[#fefae0] px-4 py-6 shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4 tracking-wider">
          🔥 Giảm giá sốc
        </h2>

        <div className="overflow-hidden">
          <Slider {...settings}>
            {saleProducts.map((product) => (
              <div key={product.id} className="px-2">
                <FlashDealProduct product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FlashDealCarousel;
