import React, { useContext, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';  // Importación corregida
import './CartWidget.css';
import { Link } from 'react-router-dom';

const CartWidget = () => {
    const { cartItems } = useContext(CartContext);  // Obtiene los productos del carrito desde el contexto
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // Función para manejar el hover
    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    return (
        <div className="cart-widget" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link to="/cart">
                <FaShoppingCart className="cart-icon" />
                {cartItems.length > 0 && (
                    <span className="cart-count">{cartItems.length}</span>
                )}
            </Link>

            {/* Muestra el dropdown si hay productos y si está visible */}
            {isDropdownVisible && cartItems.length > 0 && (
                <div className="cart-dropdown">
                    <h4>Productos en el carrito:</h4>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - {item.size} - {item.color} - ${item.price}
                            </li>
                        ))}
                    </ul>
                    <Link to="/cart" className="cart-link">Ver carrito</Link>
                </div>
            )}
        </div>
    );
};

export default CartWidget;

