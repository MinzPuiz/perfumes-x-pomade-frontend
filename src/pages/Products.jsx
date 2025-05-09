import React, { useEffect, useState } from 'react';
import { getProducts, getBrands, getCategories, getNotes, getVariants } from '../../services/productServices';

function Products({ title }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(data => {
        let filteredData = data;

        if (title?.includes("nam")) {
          filteredData = data.filter(p => p.gender === "male");
        } else if (title?.includes("nữ")) {
          filteredData = data.filter(p => p.gender === "female");
        } else if (title?.includes("unisex")) {
          filteredData = data.filter(p => p.gender === "unisex");
        } else if (title?.includes("giảm giá")) {
          filteredData = data.filter(p => p.status === "sale_off");
        }
        setProducts(filteredData);
      })
      .catch(error => {
        console.error('Lỗi khi lấy sản phẩm:', error);
      });
  }, [title]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <img
              src={`https://minzpuiz.click/storage/${product.thumbnail}`}
              alt={product.name}
              className="w-full h-48 object-contain bg-white"
            />
            <div className="p-4">
              <h2 className="text-base md:text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
              <p className="text-pink-600 font-bold mt-2">{Number(product.price).toLocaleString()}đ</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
