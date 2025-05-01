import { useState } from 'react';
import { FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#A1887F" }} className="shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-xl font-bold text-white cursor-pointer">
          perfumes<span style={{ color: "#6D4C41" }} className="font-bold">X</span>pomade
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
          <a href="/" className="hover:text-pink-500">Home</a>
          <a href="/products" className="hover:text-pink-500">Products</a>
          <a href="/about" className="hover:text-pink-500">About</a>
          <a href="/contact" className="hover:text-pink-500">Contact</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-pink-500">
            <FiUser size={20} />
          </button>
          <button className="text-gray-600 hover:text-pink-500">
            <FiShoppingCart size={20} />
          </button>

          {/* Hamburger - chỉ hiện trên mobile */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <nav className="md:hidden bg-white px-4 pb-4 space-y-2 border-t-2 border-gray-200">
          <a href="/" className="block text-gray-700 hover:text-pink-500 py-2">Home</a>
          <a href="/products" className="block text-gray-700 hover:text-pink-500 py-2">Products</a>
          <a href="/about" className="block text-gray-700 hover:text-pink-500 py-2">About</a>
          <a href="/contact" className="block text-gray-700 hover:text-pink-500 py-2">Contact</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
