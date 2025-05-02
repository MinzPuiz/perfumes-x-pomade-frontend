import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productServices';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProducts().then((products) => {
      const found = products.find(p => p.slug === slug);
      setProduct(found);
    });
  }, [slug]);

  if (!product) return <p>Đang tải sản phẩm...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img
        src={`https://minzpuiz.click/storage/${product.thumbnail}`}
        alt={product.name}
        className="w-full h-64 object-contain my-4"
      />
      <p>{product.description}</p>
      <p className="text-pink-600 font-bold mt-2">{Number(product.price).toLocaleString()}đ</p>
    </div>
  );
};

export default ProductDetail;
