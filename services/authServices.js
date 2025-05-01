import axios from "axios";

export const login = async (email, password) => {
    const response = await axios.post('https://minzpuiz.click/api/login', {
    email,
    password,
    });
    const token = response.data.access_token;
    localStorage.setItem('token', token); // hoặc lưu vào context
    return token;
};