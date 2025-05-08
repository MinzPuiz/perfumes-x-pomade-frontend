import axios from 'axios';

const token = '3|ZBsinH1QPzvfbM5xnxDzzIKJNKN6FQe4jQm10SAQ22546fe4';
const headers = {
  Authorization: `Bearer ${token}`,
};

// Lấy tất cả sản phẩm
export const getProducts = async () => {
  const response = await axios.get('https://minzpuiz.click/api/products', { headers });
  return response.data;
};

// ✅ Thêm hàm getBrands
export const getBrands = async () => {
  const response = await axios.get('https://minzpuiz.click/api/brands', { headers });
  return response.data;
};

// ✅ Thêm hàm getCategories
export const getCategories = async () => {
  const response = await axios.get('https://minzpuiz.click/api/categories', { headers });
  return response.data;
};

// Lấy sản phẩm theo slug
export const getProductsByCategory = async (slug) => {
  const response = await axios.get(`https://minzpuiz.click/api/products?category=${slug}`, { headers });
  return response.data;
};

export const getNotes = async (slug) => {
  const response = await axios.get(`https://minzpuiz.click/api/products/${slug}/notes`, { headers });
  return response.data;
};

export const getVariants = async (slug) => {
  const response = await axios.get(`https://minzpuiz.click/api/products/${slug}/variants`, { headers });
  return response.data;
};



