import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../services/productServices';
import "../assets/loader.css";

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await getProductsByCategory(slug);
        setProducts(response || []);
        setCategoryName(slug);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm theo category:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategoryProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Danh mục: {categoryName}
      </h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">Không có sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="border p-2 rounded hover:shadow-md transform transition-all duration-500 hover:scale-105">
              <img
                src={`https://minzpuiz.click/storage/${product.thumbnail}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="text-sm font-medium">{product.name}</h2>
              <p className="text-pink-600 font-semibold">{product.price}₫</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
