import axios from "axios";

// Cấu hình URL gốc của API
const API_URL = "https://minzpuiz.click/api";

// Gọi API login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const { access_token, user } = response.data;

    // Lưu vào localStorage
    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token: access_token, user };
  } catch (error) {
    const message =
      error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
    throw new Error(message);
  }
};

// Lấy token từ localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Lấy user đã đăng nhập
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Xóa token khi logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Tạo header Authorization cho các API gọi sau khi login
export const authHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
