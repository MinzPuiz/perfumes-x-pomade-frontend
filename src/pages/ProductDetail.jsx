import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts, getBrands, getCategories, getNotes, getVariants } from '../../services/productServices';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [notes, setNotes] = useState({ top: [], middle: [], base: [] });
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [variants, setVariants] = useState([]); // Thêm state cho variants
  const [quantity, setQuantity] = useState(1);
  const [brandSlug, setBrandSlug] = useState('');

  const statusColors = {
    available: 'text-green-600',
    limited_stock: 'text-orange-500',
    pre_order: 'text-blue-500',
    not_available: 'text-gray-500',
    discontinued: 'text-yellow-600',
    sale_off: 'text-red-600',
    sold_out: 'text-red-400',
  };
  
  const statusLabels = {
    available: 'Còn hàng',
    limited_stock: 'Sắp hết hàng',
    pre_order: 'Cho đặt trước',
    not_available: 'Tạm hết hàng',
    discontinued: 'Ngừng kinh doanh',
    sale_off: 'Đang giảm giá',
    sold_out: 'Đã bán hết',
  };

  const handleVariantChange = (variantId) => {
    setSelectedVariantId(variantId);
    
    if (variantId === '') {
      setSelectedPrice(null); // trở lại giá gốc
      return;
    }
  
    const selectedVariant = variants.find((variant) => variant.id === Number(variantId));
    if (selectedVariant) {
      const price = parseFloat(selectedVariant.price);
      if (!isNaN(price)) {
        setSelectedPrice(price);
      }
    }
  };
  
  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    if (value < 1) setQuantity(1);
    else if (value > product.stock) setQuantity(product.stock);
    else setQuantity(value);
  };
  
  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

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
        const notesData = await getNotes(slug);
        const variantsData = await getVariants(slug);

        console.log('Variants:', variantsData.variants);  // Kiểm tra phần variants trong API

        setBrandName(brand?.name || '');
        setBrandSlug(brand?.slug || '');
        setCategoryName(category?.name || '');
        setNotes(notesData);

        // Lấy và set variants
        if (Array.isArray(variantsData.variants) && variantsData.variants.length > 0) {
          setVariants(variantsData.variants);
        } else {
          setVariants([]);  // Nếu không có variants, set mảng rỗng
        }
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
            {Number(Math.floor(selectedPrice ?? product.price)).toLocaleString('vi-VN')}₫
          </p>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Chọn dung tích:</label>
            <div className="flex flex-wrap gap-2">
              {/* Giá gốc */}
              <button
                type="button"
                onClick={() => handleVariantChange('')}
                className={`px-4 py-2 border rounded-full text-sm ${
                  selectedVariantId === '' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-800'
                } hover:bg-pink-500 hover:text-white transition`}
              >
                Giá gốc - {Number(product.price).toLocaleString('vi-VN')}₫
              </button>

              {/* Biến thể */}
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => handleVariantChange(variant.id)}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    selectedVariantId === variant.id.toString()
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-pink-500 hover:text-white transition`}
                >
                  {variant.sku} - {Number(variant.price).toLocaleString('vi-VN')}₫
                </button>
              ))}
            </div>
          </div>
          <p className="text-gray-500 mb-4">
            Thương hiệu:{" "}
            <a
              href={`/brands/${brandSlug}`}
              className="text-pink-600 font-bold hover:underline"
            >
              {brandName}
            </a>
          </p>
          {/* <p className="text-gray-500 mb-4">Danh mục: {categoryName}</p> */}
          <p className="text-gray-500 mb-4">
            Tình trạng sản phẩm:{" "}
            <span className={statusColors[product.status] || 'text-gray-500'}>
              {statusLabels[product.status] || product.status}
            </span>
          </p>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Nốt hương</h3>
            <div className="mb-2">
              <p className="font-medium text-gray-700">Top Notes:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {notes.top.map((note, index) => (
                  <a
                    key={index}
                    href={`/notes/${note.slug}`}
                    className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm hover:bg-pink-200 transition"
                  >
                    {note.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <p className="font-medium text-gray-700">Middle Notes:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {notes.middle.map((note, index) => (
                  <a
                    key={index}
                    href={`/notes/${note.slug}`}
                    className="bg-orange-200 text-orange-900 px-3 py-1 rounded-full text-sm border border-orange-300 hover:bg-orange-300 transition"
                  >
                    {note.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium text-gray-700">Base Notes:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {notes.base.map((note, index) => (
                  <a
                    key={index}
                    href={`/notes/${note.slug}`}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition"
                  >
                    {note.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <br />
          {product.stock > 0 ? (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Số lượng:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseQty}
                  className="px-3 py-1 bg-sky-200 rounded hover:bg-gray-300"
                >
                  –
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 text-center border border-gray-300 rounded px-2 py-1"
                />
                <button
                  onClick={increaseQty}
                  className="px-3 py-1 bg-sky-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Còn lại: {product.stock} sản phẩm</p>
            </div>
          ) : (
            <p className="text-red-500 mb-4">Hết hàng</p>
          )}

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
