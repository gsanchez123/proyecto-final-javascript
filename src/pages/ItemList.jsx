import React from 'react';
import './ItemList.css';
import { useCart } from '../context/CartContext'; // Importar contexto del carrito

const ItemList = ({ items, onCardClick }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (item) => {
        // Agregar al carrito con propiedades adicionales 
        addToCart(item, 'M', 'Rojo'); // se puede incluir lógica para seleccionar tamaño y color
    };

    return (
        <div className="products-grid">
            {items.map(item => (
                <div 
                    key={item.id} 
                    className="product-card"
                    onClick={() => onCardClick(item.id)}
                    style={{ cursor: 'pointer' }}
                >
                    <img src={`/images/${item.image}`} alt={item.name} className="product-image" />
                    <h2>{item.name}</h2>
                    <p>Price: ${item.price}</p>
                    <p>Stock: {item.stock}</p>
                    <button onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }} className="btn btn-primary">
                        Añadir al carrito
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
