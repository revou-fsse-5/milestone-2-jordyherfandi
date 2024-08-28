import React, { useState, useEffect } from 'react';

const ShoppingCart = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    // Load the cart from localStorage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleRemove = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
              <div>
                <p className="text-lg font-bold">{item.title}</p>
                <p className="text-gray-700">${item.price}</p>
              </div>
              <button onClick={() => handleRemove(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
