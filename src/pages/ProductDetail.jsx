import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts, getBrands, getCategories } from '../../services/productServices';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        const found = products.find(p => p.slug === slug);
        if (!found) return;

        setProduct(found);

        const [brands, categories] = await Promise.all([getBrands(), getCategories()]);

        const brand = brands.find(b => b.id === found.brand_id);
        const category = categories.find(c => c.id === found.category_id);

        setBrandName(brand?.name || '');
        setCategoryName(category?.name || '');
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chi tiết:", error);
      }
    };

    fetchData();
  }, [slug]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <div className="w-full aspect-[4/5]">
            <img
              src={`https://minzpuiz.click/storage/${product.thumbnail}`}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-pink-600 text-xl font-bold mb-4">
            {Number(product.price).toLocaleString()}₫
          </p>
          <p className="text-gray-500 mb-4">Thương hiệu: {brandName}</p>
          <p className="text-gray-500 mb-4">Danh mục: {categoryName}</p>
          <p className="text-gray-700 mb-6">{product.status}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <button className="bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700 transition w-fit">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Mô tả chi tiết</h2>
        <p className="text-gray-700 leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
