/*import axios from 'axios';

const API_URL = 'https://minzpuiz.click/api/products';

export const getProducts = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return response.data;
};*/

// services/productService.js
import axios from 'axios';

export const getProducts = async () => {
  const token = '3|ZBsinH1QPzvfbM5xnxDzzIKJNKN6FQe4jQm10SAQ22546fe4';
  const response = await axios.get('https://minzpuiz.click/api/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

