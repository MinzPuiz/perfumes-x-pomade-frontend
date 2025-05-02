import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getProducts } from '../../services/productServices';
import FemalePerfumeProduct from './FemalePerfumeProduct'; // 👈 thêm dòng này

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FemalePerfumeProductsCarousel = () => {
  const [femaleProducts, setFemaleProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const femalePerfumes = data.filter((product) => product.gender === 'female');
        setFemaleProducts(femalePerfumes);
      })
      .catch((err) => console.error('Lỗi khi lấy sản phẩm nước hoa nữ:', err));
  }, []);

  const settings = {
    dots: false,
    infinite: femaleProducts.length > 4,
    speed: 500,
    slidesToShow: Math.min(femaleProducts.length, 4),
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(femaleProducts.length, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(femaleProducts.length, 2),
        },
      },
    ],
  };

  if (femaleProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="border-4 border-dashed border-pink-300 rounded-xl bg-[#fff0f5] px-4 py-6 shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-[#d63384] mb-4 tracking-wide">
          👑 Nước hoa nữ quyến rũ
        </h2>

        <Slider {...settings}>
          {femaleProducts.map((product) => (
            <div key={product.id} className="px-2">
              <FemalePerfumeProduct product={product} /> {/* 👈 đây là chỗ thay đổi */}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FemalePerfumeProductsCarousel;
