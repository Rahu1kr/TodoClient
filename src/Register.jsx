import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await fetch('http://localhost:8000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Registration successful!');
        setIsError(false);
        setFormData({ name: '', email: '', password: '' }); // Reset form
        setTimeout(() => navigate('/login'), 1500); // Redirect after 1.5s
      } else {
        setMessage(data.message || 'Registration failed. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '16px' }}
          required
        />
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
          Register
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', color: isError ? 'red' : 'green' }}>{message}</p>}
      <p style={{ marginTop: '10px' }}>Already registered? <Link to="/login" style={{ color: 'blue', textDecoration: 'none' }}>Login</Link></p>
    </div>
  );
};

export default Register;
