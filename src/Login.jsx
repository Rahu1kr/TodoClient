import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://todobackend-enq4.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
     console.log(response);
      if (response.ok) {
        localStorage.setItem("userdata", JSON.stringify(data));
        setIsAuthenticated(true); // Update authentication state in App
        setIsError(false);
        setMessage('Login successful!');
        setFormData({ email: '', password: '' }); // Reset form
        setTimeout(() => navigate('/'), 1500); // Redirect after 1.5s
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials.');
        setIsError(true);
      }
    } catch (error) {
      setMessage('Login failed. Please try again.:,', error);
      setIsError(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '16px' }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '16px' }}
          required
        />
        <button 
          type="submit" 
          style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: 'blue', color: 'white', border: 'none' }}
        >
          Login
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', color: isError ? 'red' : 'green' }}>{message}</p>}
      <p style={{ marginTop: '10px' }}>New user? <Link to="/register" style={{ color: 'blue', textDecoration: 'none' }}>Register</Link></p>
    </div>
  );
};

export default Login;
