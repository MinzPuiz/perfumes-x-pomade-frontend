import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import "../assets/price.css";
import "../assets/modal.css";
import { getBrands, getCategories } from '../../services/productServices';

const MalePerfumeProduct = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBrands().then(setBrands);
    getCategories().then(setCategories);
  }, []);

  const toggleModal = () => setShowModal(!showModal);
  const handleImageClick = () => navigate(`/products/${product.slug}`);

  const brandName = brands.find(b => b.id === product.brand_id)?.name || 'Không rõ';
  const categoryName = categories.find(c => c.id === product.category_id)?.name || 'Không rõ';

  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-content max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <img
          src={`https://minzpuiz.click/storage/${product.thumbnail}`}
          alt={product.name}
          className="w-full h-48 object-contain bg-white my-4"
        />
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Giá:</strong> {Number(product.price).toLocaleString()}đ</p>
          <p><strong>Thương hiệu:</strong> {brandName}</p>
          <p><strong>Danh mục:</strong> {categoryName}</p>
          <p><strong>Giới tính:</strong> {product.gender}</p>
          <p><strong>Loại:</strong> {product.type}</p>
          <p><strong>Trạng thái:</strong> {product.status === 'sale_off' ? 'Đang giảm giá' : 'Còn hàng'}</p>
        </div>
        <button
          onClick={toggleModal}
          className="mt-6 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
        >
          Đóng
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
        <img
          src={`https://minzpuiz.click/storage/${product.thumbnail}`}
          alt={product.name}
          onClick={handleImageClick}
          className="w-full h-48 object-contain bg-white"
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={toggleModal}
            className="bg-pink-600 text-white p-2 rounded-full"
          >
            Xem nhanh
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="price">{Number(product.price).toLocaleString()}đ</p>
        </div>
      </div>

      {showModal && ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))}
    </>
  );
};

export default MalePerfumeProduct;
