import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Fetch categories from API
    axios.get('https://fakestoreapi.com/products/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
          <Link to="/products" className="text-white hover:text-gray-400">Products</Link>
          {categories.map(category => (
            <Link key={category} to={`/category/${category}`} className="text-white hover:text-gray-400 capitalize">
              {category}
            </Link>
          ))}
          <Link to="/cart" className="text-white hover:text-gray-400">Cart</Link>
        </div>
        <div className="flex space-x-4">
          {username ? (
            <>
              <span className="text-green-400 font-bold">{username}</span>
              <button 
                onClick={handleLogout} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>

            </>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
