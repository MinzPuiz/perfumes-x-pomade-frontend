import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [couponStatus, setCouponStatus] = useState(''); // 'success' hoặc 'error'
  const navigate = useNavigate();

  // Danh sách mã giảm giá demo
  const coupons = {
    'WELCOME10': { discount: 0.1, message: 'Giảm 10% đơn hàng' },
    'FREESHIP': { discount: 0, shipping: 0, message: 'Miễn phí vận chuyển' },
    'SUMMER25': { discount: 0.25, message: 'Giảm 25% đơn hàng mùa hè' }
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems, discount, shipping]);

  const loadCartItems = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        
        // Tính phí vận chuyển mặc định
        if (parsedCart.length > 0) {
          setShipping(30000); // 30,000 VND phí vận chuyển mặc định
        } else {
          setShipping(0);
        }
      }
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
      setCartItems([]);
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = total * discount;
    setSubtotal(total - discountAmount);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Cập nhật phí vận chuyển
    if (updatedCart.length === 0) {
      setShipping(0);
    }
  };

  const clearCart = () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      setCartItems([]);
      localStorage.removeItem('cart');
      setShipping(0);
      //window.location.reload();
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponMessage('Vui lòng nhập mã giảm giá');
      setCouponStatus('error');
      return;
    }

    const coupon = coupons[couponCode.toUpperCase()];
    if (coupon) {
      if (coupon.discount !== undefined) {
        setDiscount(coupon.discount);
      }
      if (coupon.shipping !== undefined) {
        setShipping(coupon.shipping);
      }
      setCouponMessage(coupon.message);
      setCouponStatus('success');
    } else {
      setDiscount(0);
      setCouponMessage('Mã giảm giá không hợp lệ');
      setCouponStatus('error');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán');
      return;
    }
    
    // Lưu thông tin đơn hàng để sử dụng ở trang thanh toán
    const orderSummary = {
      items: cartItems,
      subtotal: subtotal,
      shipping: shipping,
      total: subtotal + shipping,
      discount: discount
    };
    
    localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
    
    // Chuyển hướng đến trang thanh toán
    navigate('/payment');
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</div>
          <Link
            to="/"
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
            onClick={() => {
              // Reset cart item count
              localStorage.removeItem('cart');
            }}
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Danh sách sản phẩm */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giá
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số lượng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tổng
                      </th>
                      <th className="px-6 py-3 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <tr key={`${item.id}-${item.variantId || 'default'}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 mr-4">
                              <img
                                src={`https://minzpuiz.click/storage/${item.thumbnail}`}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{item.name}</div>
                              {item.variantName && (
                                <div className="text-gray-500 text-sm">Dung tích: {item.variantName}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {Number(item.price).toLocaleString('vi-VN')}₫
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center border rounded max-w-[120px]">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(index, Number(e.target.value))}
                              className="w-12 text-center border-x px-2 py-1"
                            />
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t">
                <button
                  onClick={clearCart}
                  className="text-red-500 font-medium hover:text-red-700"
                >
                  Xóa tất cả
                </button>
              </div>
            </div>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
              
              <div className="mb-4">
                <div className="flex justify-between py-2 border-b">
                  <span>Tạm tính</span>
                  <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Phí vận chuyển</span>
                  <span>{shipping.toLocaleString('vi-VN')}₫</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between py-2 border-b text-green-600">
                    <span>Giảm giá</span>
                    <span>-{(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * discount).toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="flex justify-between py-3 font-bold text-lg">
                  <span>Tổng cộng</span>
                  <span>{(subtotal + shipping).toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              {/* Mã giảm giá */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Mã giảm giá"
                    className="border rounded-l px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-pink-600 text-white px-4 py-2 rounded-r hover:bg-pink-700"
                  >
                    Áp dụng
                  </button>
                </div>
                {couponMessage && (
                  <p className={`mt-2 text-sm ${couponStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {couponMessage}
                  </p>
                )}
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-pink-600 text-white py-3 rounded font-medium hover:bg-pink-700 transition"
              >
                Tiến hành thanh toán
              </button>
              
              <div className="mt-4">
                <Link to="/" className="text-pink-600 font-medium hover:underline">
                  ← Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;