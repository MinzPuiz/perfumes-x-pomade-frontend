const Footer = () => {
    return (
      <footer style={{ backgroundColor: "#A1887F" }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột 1 - Giới thiệu */}
          <div>
            <h2 className="text-xl font-bold mb-2">PerfumesXpomade</h2>
            <p className="text-sm">
              Chuyên cung cấp nước hoa và pomade chính hãng, dành cho những người yêu thích phong cách lịch lãm và cá tính.
            </p>
          </div>
  
          {/* Cột 2 - Điều hướng */}
          <div>
            <h2 className="text-xl font-bold mb-2">Liên kết nhanh</h2>
            <ul className="space-y-1 text-sm">
              <li><a href="/" className="hover:underline">Trang chủ</a></li>
              <li><a href="/products" className="hover:underline">Sản phẩm</a></li>
              <li><a href="/about" className="hover:underline">Giới thiệu</a></li>
              <li><a href="/contact" className="hover:underline">Liên hệ</a></li>
            </ul>
          </div>
  
          {/* Cột 3 - Liên hệ */}
          <div>
            <h2 className="text-xl font-bold mb-2">Thông tin liên hệ</h2>
            <p className="text-sm">Email: support@perfumesxpomade.com</p>
            <p className="text-sm">Hotline: 0123 456 789</p>
            <p className="text-sm">Địa chỉ: 123 Lý Thường Kiệt, Q.10, TP.HCM</p>
          </div>
        </div>
  
        <div className="border-t border-white/20 mt-4 py-4 text-center text-sm">
          &copy; {new Date().getFullYear()} PerfumesXpomade. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  