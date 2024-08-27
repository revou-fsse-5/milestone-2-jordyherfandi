// src/components/ShoppingCart.tsx
import React, { useState } from 'react';

const ShoppingCart = () => {
  // Removed setCart since it's not being used
  const [cart] = useState<any[]>([]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.title} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
