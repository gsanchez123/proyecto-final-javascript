import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemList from './ItemList';
import './ItemListContainer.css';

const ItemListContainer = () => {
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [onlyInStock, setOnlyInStock] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Datos de productos
        const fetchedItems = [
            { id: 1, name: 'Remera Hombre', price: 20, category: 'deportes', stock: 10, image: 'remerahombre.jpg' },
            { id: 2, name: 'Remera Mujer', price: 40, category: 'urbana', stock: 5, image: 'remeramujer.jpg' },
            { id: 3, name: 'Camisetas Unisex', price: 55, category: 'urbana', stock: 15, image: 'camisetasunisex.jpg' },
            { id: 4, name: 'Zapatillas Urbanas Mujer', price: 60, category: 'urbana', stock: 18, image: 'urbanasmujer.jpg' },
            { id: 5, name: 'Zapatillas Urbanas Hombre', price: 100, category: 'urbana', stock: 14, image: 'urbanashombre.jpg' },
            { id: 6, name: 'Zapatillas Urbanas', price: 100, category: 'urbana', stock: 10, image: 'zapatillasurbanas.jpg' },
            { id: 7, name: 'Buzo Hoodie Hombre', price: 45, category: 'urbana', stock: 15, image: 'sudaderahombre.jpg' },
            { id: 8, name: 'Buzo Oversize', price: 46, category: 'urbana', stock: 10, image: 'buzooversize.jpg' },
            { id: 9, name: 'Buzo Oversize Mujer', price: 50, category: 'urbana', stock: 16, image: 'sudaderamujer.jpg' },
        ];

        // Filtrar los productos por categoría si existe
        const filtered = id ? fetchedItems.filter(item => item.category === id) : fetchedItems;

        // Establecer los productos filtrados y todos los productos
        setItems(filtered);
        setFilteredItems(filtered);
    }, [id]);

    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setSearchTerm(search);
        applyFilters(items, search, priceRange, onlyInStock);
    };

    const applyFilters = (items, search = searchTerm, price = priceRange, inStock = onlyInStock) => {
        let filtered = items.filter(item =>
            item.name.toLowerCase().includes(search) &&
            item.price >= price[0] &&
            item.price <= price[1]
        );

        if (inStock) {
            filtered = filtered.filter(item => item.stock > 0);
        }

        setFilteredItems(filtered);
    };

    const handlePriceChange = (e) => {
        const { value, name } = e.target;
        const newRange = [...priceRange];
        newRange[name === 'min' ? 0 : 1] = Number(value);
        setPriceRange(newRange);
        applyFilters(items, searchTerm, newRange, onlyInStock);
    };

    const handleInStockChange = () => {
        setOnlyInStock(!onlyInStock);
        applyFilters(items, searchTerm, priceRange, !onlyInStock);
    };

    // Función para redirigir al detalle del producto
    const handleCardClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };

    return (
        <div className="container my-4">
            <h1 className="text-center">{id ? `Category: ${id}` : 'All Products'}</h1>

            <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearch}
                className="form-control my-3"
            />

            <div className="filters mb-4">
                <label className="me-2">
                    Precio mínimo:
                    <input type="number" name="min" value={priceRange[0]} onChange={handlePriceChange} className="form-control" />
                </label>
                <label>
                    Precio máximo:
                    <input type="number" name="max" value={priceRange[1]} onChange={handlePriceChange} className="form-control" />
                </label>
            </div>

            <div className="stock-filter mb-4">
                <label>
                    <input type="checkbox" checked={onlyInStock} onChange={handleInStockChange} />
                    Solo mostrar productos en stock
                </label>
            </div>

            {/* Se pasa la función de clic a ItemList */}
            <ItemList items={filteredItems} onCardClick={handleCardClick} />
        </div>
    );
};

export default ItemListContainer;
