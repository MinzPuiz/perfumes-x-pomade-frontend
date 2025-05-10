import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';
import { getCategories } from '../../services/productServices';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [showDesktopCategories, setShowDesktopCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(err => console.error('Lỗi khi lấy categories:', err));
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      // Gọi API tìm kiếm
      axios.get(`https://minzpuiz.click/api/search?q=${searchQuery}`)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(err => console.error('Lỗi khi tìm kiếm:', err));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    };

    window.addEventListener('cartUpdated', updateCartCount);
    
    updateCartCount();

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Thêm hàm xóa giỏ hàng
  const clearCart = () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      localStorage.removeItem('cart'); // Xóa giỏ hàng
      window.dispatchEvent(new Event('cartUpdated')); // Phát sự kiện để cập nhật badge giỏ hàng
    }
  };

  useEffect(() => {
    // Lấy thông tin giỏ hàng từ localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartCount(parsedCart.length);
    }
  }, []);

  // Khi nhấn vào danh mục ➜ điều hướng + ẩn dropdown
  const handleCategoryClick = (slug) => {
    setShowDesktopCategories(false);
    setShowMobileCategories(false);
    setIsOpen(false);
    navigate(`/category/${slug}`);
  };

  // Xử lý tìm kiếm khi người dùng nhập từ khóa
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleResultClick = (slug) => {
    navigate(`/products/${slug}`);
    setSearchQuery('');  // Reset search query
    setSearchResults([]);  // Clear search results
    setShowMobileSearch(false); // Close the mobile search modal
  };

  // Function to toggle mobile search
  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Xóa thông tin user trong state
    window.location.reload(); // Reload lại trang để cập nhật lại header
  };

  return (
    <header style={{ backgroundColor: "#A1887F" }} className="shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-y-2">
        {/* Logo - Giảm kích thước phần logo để tạo thêm không gian */}
        <Link to="/" className="text-xl font-bold text-white cursor-pointer flex-shrink-0">
          perfumes<span style={{ color: "#6D4C41" }} className="font-bold">X</span>pomade
        </Link>

        {/* Menu desktop - Thêm khoảng cách với logo */}
        <nav className="hidden md:flex space-x-6 text-sm text-gray-100 items-center relative ml-8">
          <Link to="/" className="hover:text-pink-300">Home</Link>
          <Link to="/products" className="hover:text-pink-300">Products</Link>

          {/* Clickable Dropdown Categories */}
          <div className="relative">
            <button
              onClick={() => setShowDesktopCategories(prev => !prev)}
              className="cursor-pointer hover:text-pink-300 focus:outline-none"
            >
              Categories {showDesktopCategories ? '▲' : '▼'}
            </button>
            {showDesktopCategories && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow rounded z-10 w-40">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className="hover:text-pink-300">About</Link>
          <Link to="/contact" className="hover:text-pink-300">Contact</Link>
        </nav>

        {/* Search bar */}
        <div className="relative items-center w-full max-w-xs mx-4 hidden sm:flex">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full px-4 py-2 text-lg text-gray-700 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out"
          />
          <FiSearch size={22} className="absolute right-4 text-gray-400 transition-all duration-300 ease-in-out hover:text-pink-500" />
        </div>

        {/* Icon search cho mobile */}
        <div className="sm:hidden">
          <button 
            onClick={toggleMobileSearch} 
            className="text-white hover:text-pink-300 p-2"
          >
            <FiSearch size={20} />
          </button>
        </div>
        
        {/* Icons */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <div className="relative">
            <button
              onClick={() => setShowAuthPopup(prev => !prev)}
              className="text-gray-100 hover:text-pink-300"
            >
              <span className="text-sm text-white font-medium cursor-pointer">
                {user ? user.name.split(' ')[0] : <FiUser size={20} />}
              </span>
            </button>

            {/* Popup login/register */}
            {showAuthPopup && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50 py-2">
                {!user ? (
                  <>
                    <button
                      onClick={() => {
                        navigate('/login');
                        setShowAuthPopup(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-pink-100"
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => {
                        navigate('/register');
                        setShowAuthPopup(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-pink-100"
                    >
                      Đăng ký
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      setUser(null);
                      setShowAuthPopup(false);
                      navigate('/'); // hoặc navigate(0) để reload
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Đăng xuất
                  </button>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => navigate('/Checkout')}
            className="text-gray-100 hover:text-pink-300 relative"
          >
            <FiShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Display search results */}
      {searchQuery && searchResults.length > 0 && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow rounded z-10 w-full max-w-md mx-auto">
          {searchResults.map(result => (
            <Link
              to={`/products/${result.slug}`}  // Đảm bảo điều hướng đúng
              key={result.id}
              onClick={() => handleResultClick(result.slug)}  // Đóng kết quả khi nhấn
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100"
            >
              <div>{result.name}</div>
              <div className="text-gray-500 text-xs">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(result.price)}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-white px-4 pb-4 space-y-2 border-t-2 border-gray-200 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
          <Link to="/" className="block text-gray-700 hover:text-pink-500 py-2">Home</Link>
          <Link to="/products" className="block text-gray-700 hover:text-pink-500 py-2">Products</Link>
          
          {/* Mobile Dropdown */}
          <div>
            <button
              onClick={() => setShowMobileCategories(!showMobileCategories)}
              className="w-full text-left text-gray-700 py-2 cursor-pointer"
            >
              Categories {showMobileCategories ? '▲' : '▼'}
            </button>
            {showMobileCategories && (
              <div className="ml-4 space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="block w-full text-left text-sm text-gray-600 hover:text-pink-500 py-1"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className="block text-gray-700 hover:text-pink-500 py-2">About</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-pink-500 py-2">Contact</Link>
        </nav>
      )}

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-xl relative">
            {/* Nút đóng */}
            <button
              onClick={() => setShowMobileSearch(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-400 transition"
            >
              <FiX size={22} />
            </button>

            {/* Ô tìm kiếm */}
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                placeholder="Tìm sản phẩm..."
                className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
              />
              <FiSearch size={18} className="text-gray-400 mr-3" />
            </div>

            {/* Kết quả tìm kiếm */}
            <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
              {searchQuery && searchResults.length > 0 ? (
                searchResults.map(result => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result.slug)}
                    className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg shadow hover:bg-pink-100 transition"
                  >
                    <div className="font-medium text-gray-800">{result.name}</div>
                    <div className="text-sm text-gray-500">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(result.price)}
                    </div>
                  </button>
                ))
              ) : (
                searchQuery.length > 2 && (
                  <div className="text-center text-gray-400 text-sm py-4">Không tìm thấy kết quả.</div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;