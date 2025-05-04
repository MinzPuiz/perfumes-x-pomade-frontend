import axios from 'axios';

export const getCategories = async () => {
  const token = '3|ZBsinH1QPzvfbM5xnxDzzIKJNKN6FQe4jQm10SAQ22546fe4';
  const response = await axios.get('https://minzpuiz.click/api/categories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
