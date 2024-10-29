// src/components/ItemDetailContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';  // no olvidar de que este componente esté implementado
import './ItemDetailContainer.css';     // Importa el archivo de CSS

const ItemDetailContainer = () => {
    const { id } = useParams();  // Obtener ID del producto desde la URL
    const [item, setItem] = useState(null);
    const [selectedSize, setSelectedSize] = useState(''); // Estado para el tamaño seleccionado
    const [selectedColor, setSelectedColor] = useState(''); // Estado para el color seleccionado

    useEffect(() => {
        // Simula la obtención de detalles de producto
        const fetchedItems = [
            { id: 1, name: 'Remera Hombre', price: 20, description: 'Remera deportiva ideal para entrenamientos.', stock: 10 },
            { id: 2, name: 'Remera Mujer', price: 40, description: 'Remera cómoda para uso urbano.', stock: 5 },
            { id: 3, name: 'Zapatillas Urbanas', price: 60, description: 'Zapatillas ligeras y cómodas.', stock: 8 },
            { id: 4, name: 'Chaqueta Urbana', price: 100, description: 'Chaqueta ideal para el frío.', stock: 3 },
        ];

        // Buscar el producto por ID
        const foundItem = fetchedItems.find(product => product.id === parseInt(id));
        setItem(foundItem);
    }, [id]);

    // Define la función onAddToCart
    const onAddToCart = () => {
        if (selectedSize && selectedColor) {
            console.log(`Producto agregado al carrito: ${item.name}, Talle: ${selectedSize}, Color: ${selectedColor}`);
            // Lógica para agregar el producto al carrito (se podria usar el contexto del carrito)
            // Por ejemplo: addToCart({ ...item, size: selectedSize, color: selectedColor });
        } else {
            alert('Por favor selecciona un tamaño y un color.');
        }
    };

    return ( 
        <div className="detail-container">
            {item ? (
                <ItemDetail 
                    item={item} 
                    onAddToCart={onAddToCart} 
                    selectedSize={selectedSize} 
                    setSelectedSize={setSelectedSize} 
                    selectedColor={selectedColor} 
                    setSelectedColor={setSelectedColor} 
                />  /* Envía los estados y funciones como props */
            ) : (
                <p>Producto no encontrado.</p>
            )}
        </div>
    );
};

export default ItemDetailContainer;
