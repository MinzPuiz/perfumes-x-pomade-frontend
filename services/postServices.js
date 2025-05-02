import axios from 'axios';

export const getPosts = async () => {
  const token = '3|ZBsinH1QPzvfbM5xnxDzzIKJNKN6FQe4jQm10SAQ22546fe4';
  const response = await axios.get('https://minzpuiz.click/api/posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
