import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/productServices';

const MalePerfumeProducts = () => {
  const [maleProducts, setMaleProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        // Lọc các sản phẩm có gender là male
        const malePerfumes = data.filter((product) => product.gender === 'unisex');
        setMaleProducts(malePerfumes);
      })
      .catch((err) => console.error('Lỗi khi lấy sản phẩm nước hoa unisex:', err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sản phẩm nước hoa unisex</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {maleProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <img
              src={`https://minzpuiz.click/storage/${product.thumbnail}`}
              alt={product.name}
              className="w-full h-48 object-contain bg-white"
            />
            <div className="p-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
              <p className="text-pink-600 font-bold mt-2">{Number(product.price).toLocaleString()}đ</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MalePerfumeProducts;
