import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; 
import './Home.css';

const Home = () => {
    const { addToCart } = useContext(CartContext);

    const productImages = [
        { id: 1, src: '/images/img1zapa1.jpg', name: 'Producto 1', price: 30 },
        { id: 2, src: '/images/img2zapa2.jpg', name: 'Producto 2', price: 60 },
        { id: 3, src: '/images/img3zapa3.jpg', name: 'Producto 3', price: 90 }
    ];

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to Sales Center</h1>
                    <p className="hero-subtitle">Descubre lo último en moda urbana y deportiva</p>
                    <Link to="/products" className="btn-primary">Explorar Coleccion</Link>
                </div>
                <img src="/images/banner.jpg" alt="Fashion banner" className="hero-image" />
            </section>

            {/* Featured Products */}
            <section className="featured-products">
                <h2 className="section-title">Productos Top</h2>
                <div className="product-grid">
                    {productImages.map((product) => (
                        <div key={product.id} className="product-item">
                            <img src={product.src} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p className="price">${product.price}</p>
                            <button 
                                className="btn-secondary" 
                                onClick={() => handleAddToCart(product)}
                            >
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categorias top  */}
            <section className="category-highlights">
                <h2 className="section-title">Explore Categories</h2>
                <div className="category-grid">
                    <div className="category-item">Remeras Urbana</div>
                    <div className="category-item">Zapatillas</div>
                    <div className="category-item">Buzos</div>
                </div>
            </section>

            {/* Testimonios */}
            <section className="testimonials">
                <h2 className="section-title">What Our Customers Say</h2>
                <div className="testimonial-grid">
                    <div className="testimonial-item">
                        <p>"Calidad increíble y entrega súper rápida!"</p>
                        <h4>.</h4>
                    </div>
                    <div className="testimonial-item">
                        <p>"Gran selección de productos, lo recomiendo mucho."</p>
                        <h4>Juan.</h4>
                    </div>
                    <div className="testimonial-item">
                        <p>"Servicio al cliente excepcional."</p>
                        <h4>Ema.</h4>
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="newsletter">
                <h2 className="section-title">Join Our Newsletter</h2>
                <form className="newsletter-form">
                    <input type="email" className="input-email" placeholder="Enter your email" />
                    <button type="submit">Subscribe</button>
                </form>
            </section>

            {/* redes */}
            <section className="social-media">
                <h2 className="section-title">Follow Us</h2>
                <div className="social-icons">
                    {['instagram', 'facebook', 'twitter'].map((social) => (
                        <a 
                            key={social} 
                            href={`https://www.${social}.com`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className={`icon-${social}`}
                        >
                            {social.charAt(0).toUpperCase() + social.slice(1)}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;

