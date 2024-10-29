import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import CartWidget from './CartWidget'; // Usa el CartWidget para mostrar el ícono con la funcionalidad
import { useCart } from '../context/CartContext'; // Usa el hook  para el contexto del carrito

const Navbar = () => {
    const { getTotalItems } = useCart(); // Obtiene el total de productos del carrito

    const categories = [
        { id: 'urban', name: 'Ropa Urbana' },
        { id: 'sportswear', name: 'Deportiva' },
        { id: 'sneakers', name: 'Zapatillas' }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Sales Center</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {categories.map(category => (
                            <li className="nav-item" key={category.id}>
                                <Link className="nav-link" to={`/category/${category.id}`}>{category.name}</Link>
                            </li>
                        ))}
                    </ul>

                    {/* aca se incluye el widget del carrito */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <CartWidget cartItemCount={getTotalItems()} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
