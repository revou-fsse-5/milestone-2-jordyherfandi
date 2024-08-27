// src/components/ShoppingCart.tsx
import React, { useState } from 'react';

const ShoppingCart = () => {
  const [cart] = useState<any[]>([]);

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
