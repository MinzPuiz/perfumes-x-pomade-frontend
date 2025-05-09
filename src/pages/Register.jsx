import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      } else {
        navigate('/login'); // Redirect to login after successful registration
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Đăng Ký</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Họ và tên" 
        />
        {errors.name && <span>{errors.name}</span>}
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Email" 
        />
        {errors.email && <span>{errors.email}</span>}
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Mật khẩu" 
        />
        {errors.password && <span>{errors.password}</span>}
        <input 
          type="password" 
          name="password_confirmation" 
          value={formData.password_confirmation} 
          onChange={handleChange} 
          placeholder="Nhập lại mật khẩu" 
        />
        {errors.password_confirmation && <span>{errors.password_confirmation}</span>}
        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
};

export default Register;
