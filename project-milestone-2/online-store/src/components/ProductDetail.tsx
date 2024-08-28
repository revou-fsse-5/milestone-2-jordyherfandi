import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if (!product) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <img src={product.images[0]} alt={product.title} className="w-full h-64 object-cover rounded-md" />
        <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <p className="mt-2 text-lg font-bold">Price: ${product.price}</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
