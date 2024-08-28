// src/components/ProductList.tsx
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
    <div className="container">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </Link>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            {successMessage && successMessage.id === product.id && (
              <p style={{ color: 'green' }}>{successMessage.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
