import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (newItem) => {
    setCart(prev => {
      const index = prev.findIndex(item =>
        item.id === newItem.id && item.variantId === newItem.variantId
      );

      if (index !== -1) {
        const updated = [...prev];
        const newQty = updated[index].quantity + newItem.quantity;
        updated[index].quantity = Math.min(newQty, newItem.stock); // bảo vệ tồn kho
        return updated;
      }

      return [...prev, newItem];
    });
  };

  const removeFromCart = (id, variantId) => {
    setCart(prev => prev.filter(item =>
      !(item.id === id && item.variantId === variantId)
    ));
  };

  return (
    <CartContext.Provider value={{ cart, totalItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
