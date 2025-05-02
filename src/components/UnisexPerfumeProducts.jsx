import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getProducts } from '../../services/productServices';

const UnisexPerfumeProductsCarousel = () => {
  const [unisexProducts, setUnisexProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const unisexPerfumes = data.filter((product) => product.gender === 'unisex');
        setUnisexProducts(unisexPerfumes);
      })
      .catch((err) => console.error('Lỗi khi lấy sản phẩm nước hoa unisex:', err));
  }, []);

  const settings = {
    dots: false,
    infinite: unisexProducts.length > 4,
    speed: 500,
    slidesToShow: Math.min(unisexProducts.length, 4),
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(unisexProducts.length, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(unisexProducts.length, 2),
        },
      },
    ],
  };

  if (unisexProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="border-4 border-dashed border-[#b8a07e] rounded-xl bg-[#fefae0] px-4 py-6 shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-[#665c54] mb-4 tracking-wide">
          🧴 Nước hoa unisex cá tính
        </h2>

        <Slider {...settings}>
          {unisexProducts.map((product) => (
            <div key={product.id} className="px-2">
              <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-300">
                <img
                  src={`https://minzpuiz.click/storage/${product.thumbnail}`}
                  alt={product.name}
                  className="w-full h-48 object-contain bg-white"
                />
                <div className="p-3">
                  <h3 className="text-sm font-medium truncate text-[#4a4a4a]">{product.name}</h3>
                  <p className="text-[#c97b3d] font-bold mt-2">
                    {Number(product.price).toLocaleString()}đ
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default UnisexPerfumeProductsCarousel;
