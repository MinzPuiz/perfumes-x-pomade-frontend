import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Kiểm tra nếu đã đăng nhập (token có trong localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/'); // Nếu có token, chuyển hướng về trang chủ (hoặc trang mà bạn muốn)
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://minzpuiz.click/api/login', {
        email,
        password,
      });

      const { access_token, user } = response.data;

      // Lưu token và user vào localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect đến trang chủ hoặc trang muốn sau khi đăng nhập thành công
      //navigate('/');
      window.location.replace('/perfumes-x-pomade-frontend/');
    } catch (err) {
      setError('Email hoặc mật khẩu không đúng!');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Đăng nhập</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
