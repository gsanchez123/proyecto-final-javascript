import React from 'react';
import { useCart } from '../context/CartContext';
import PaymentMethods from '../components/PaymentMethods';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, getTotalPrice } = useCart();

    // Función para manejar la compra
    const purchaseItems = () => {
        console.log('Compra realizada:', cartItems);
        alert('¡Compra realizada con éxito!');
    };

    return (
        <div className="cart-container">
            <h1>Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <div>
                    <ul className="cart-items">
                        {cartItems.map((item) => (
                            <li key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    width="100" // Aumentar el tamaño para mejor visibilidad
                                    onError={(e) => {
                                        e.target.onerror = null; // Evitar bucle infinito
                                        e.target.src = 'path/to/alternative/image.jpg'; // Imagen alternativa
                                    }} 
                                />
                                
                                <div className="item-details">
                                    <h2>{item.name}</h2>
                                    <p>Tamaño: {item.size}</p>
                                    <p>Color: {item.color}</p>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p>Precio: ${(item.price * item.quantity).toFixed(2)}</p>
                                    
                                    <button 
                                        onClick={() => removeFromCart(item.id, item.size, item.color)} 
                                        className="remove-button"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
                    </div>

                    {/* Agregar el componente PaymentMethods aca */}
                    <PaymentMethods 
                        amount={getTotalPrice().toFixed(2)} 
                        onPaymentSuccess={() => alert('¡Pago exitoso!')} // Callback de éxito
                    />

                    <button 
                        onClick={purchaseItems} 
                        className="btn btn-success mt-3 purchase-button"
                    >
                        Comprar
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
