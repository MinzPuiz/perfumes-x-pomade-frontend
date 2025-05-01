import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getProducts } from "../../services/productServices";

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

  const settings = {
    dots: false,
    infinite: true, //saleProducts.length > 4, // tránh lặp nếu item ít
    speed: 500,
    slidesToShow: 4, //Math.min(saleProducts.length, 4),
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(saleProducts.length, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(saleProducts.length, 2),
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
                <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-300">
                <img
                    src={`https://minzpuiz.click/storage/${product.thumbnail}`}
                    alt={product.name}
                    className="w-full h-48 object-contain"
                />
                <div className="p-3">
                    <h3 className="text-sm font-medium truncate">{product.name}</h3>
                    <p className="text-pink-600 font-bold mt-2">
                    {Number(product.price).toLocaleString()}đ
                    </p>
                </div>
                </div>
            </div>
            ))}
        </Slider>
        </div>
    </div>
    </section>
  );
};

export default FlashDealCarousel;
