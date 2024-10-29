import React, { createContext, useState, useContext } from 'react';

// Crear y exportar explícitamente el CartContext
export const CartContext = createContext();

// Hook personalizado para acceder al contexto del carrito
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Función para agregar productos al carrito
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                // Si el producto ya existe en el carrito, aumentar la cantidad
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si el producto no existe, añadirlo al carrito con cantidad 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Función para eliminar productos del carrito
    const removeFromCart = (productId) => {
        setCartItems(prevItems => 
            prevItems.filter(item => item.id !== productId)
        );
    };

    // Calcular el precio total del carrito
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Obtiene el número total de artículos en el carrito
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalPrice, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
};
