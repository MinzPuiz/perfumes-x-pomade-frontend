import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { getCategories } from '../../services/productServices';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [showDesktopCategories, setShowDesktopCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(err => console.error('Lỗi khi lấy categories:', err));
  }, []);

  // Khi nhấn vào danh mục ➜ điều hướng + ẩn dropdown
  const handleCategoryClick = (slug) => {
    setShowDesktopCategories(false);
    setShowMobileCategories(false);
    setIsOpen(false);
    navigate(`/category/${slug}`);
  };

  return (
    <header style={{ backgroundColor: "#A1887F" }} className="shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="text-xl font-bold text-white cursor-pointer">
          perfumes<span style={{ color: "#6D4C41" }} className="font-bold">X</span>pomade
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-6 text-sm text-gray-100 items-center relative">
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

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-100 hover:text-pink-300">
            <FiUser size={20} />
          </button>
          <button className="text-gray-100 hover:text-pink-300">
            <FiShoppingCart size={20} />
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-white px-4 pb-4 space-y-2 border-t-2 border-gray-200">
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
              <div className="ml-4">
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
    </header>
  );
};

export default Header;
