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
      localStorage.setItem('username', username);

      setSuccess('Login Successful! Redirecting...');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="mb-4 w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full p-2 border border-gray-300 rounded-md"
          required
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </form>
      <p className="mt-4">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link></p>
    </div>
  );
};

export default Login;
