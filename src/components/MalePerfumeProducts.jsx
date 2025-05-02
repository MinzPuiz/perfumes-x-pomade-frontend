import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getProducts } from '../../services/productServices';

const MalePerfumeProductsCarousel = () => {
  const [maleProducts, setMaleProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const filtered = data.filter((product) => product.gender === 'male');
        setMaleProducts(filtered);
      })
      .catch((err) => console.error('Lỗi khi lấy sản phẩm nước hoa nam:', err));
  }, []);

  const settings = {
    dots: false,
    infinite: maleProducts.length > 4,
    speed: 500,
    slidesToShow: Math.min(maleProducts.length, 4),
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(maleProducts.length, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(maleProducts.length, 2),
        },
      },
    ],
  };

  if (maleProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="border-4 border-dashed border-[#8d6e63] rounded-xl bg-[#fefae0] px-4 py-6 shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-[#5d4037] mb-4 tracking-wide">
          🕶️ Nước hoa nam lịch lãm
        </h2>

        <Slider {...settings}>
          {maleProducts.map((product) => (
            <div key={product.id} className="px-2">
              <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-300">
                <img
                  src={`https://minzpuiz.click/storage/${product.thumbnail}`}
                  alt={product.name}
                  className="w-full h-48 object-contain bg-white"
                />
                <div className="p-3">
                  <h3 className="text-sm font-medium truncate text-[#3e2723]">{product.name}</h3>
                  <p className="text-[#6d4c41] font-bold mt-2">
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

export default MalePerfumeProductsCarousel;
