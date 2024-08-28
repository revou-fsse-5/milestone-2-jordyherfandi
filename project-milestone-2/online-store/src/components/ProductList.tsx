import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState<{ id: number; message: string } | null>(null);

  useEffect(() => {
    // Fetch products from the API
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    // Load the cart from localStorage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const addToCart = (product: any) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Show success message
    setSuccessMessage({ id: product.id, message: 'Added to cart' });

    // Remove the message after 2 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-lg font-bold mt-2">{product.title}</h3>
              <p className="text-gray-700">${product.price}</p>
            </Link>
            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            {successMessage && successMessage.id === product.id && (
              <p className="text-green-500 mt-2">{successMessage.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
