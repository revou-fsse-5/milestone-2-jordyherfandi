// src/components/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (username === '' || password === '') {
      setError('Username and password are required.');
      return;
    }

    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);  // Ensure this is set correctly

      setSuccess('Login Successful! Redirecting...');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
