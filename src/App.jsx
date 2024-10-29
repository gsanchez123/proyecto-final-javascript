
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // Si necesitas Analytics
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import ItemListContainer from './pages/ItemListContainer';
import ItemDetailContainer from './pages/ItemDetailContainer';
import Cart from './components/Cart'; // Componente del carrito
import { CartProvider } from './context/CartContext'; // Proveedor del contexto del carrito
import 'bootstrap/dist/css/bootstrap.min.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5Qb0mP3h1phq9keoGKjc-VbXOKspKzuI",
  authDomain: "sales-center-89bf4.firebaseapp.com",
  projectId: "sales-center-89bf4",
  storageBucket: "sales-center-89bf4.appspot.com",
  messagingSenderId: "41209538656",
  appId: "1:41209538656:web:3b1a4b33b931240388bb05",
  measurementId: "G-HT32V1Z0VJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Opcional si usas Analytics

const App = () => {
  return (
    <CartProvider> {/* Envolviendo la aplicación con el proveedor del carrito */}
      <Router>
        <Header /> {/* Encabezado del sitio */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Página principal */}
          <Route path="/products" element={<Products />} /> {/* Página de productos */}
          <Route path="/contact" element={<Contact />} /> {/* Página de contacto */}
          <Route path="/category/:id" element={<ItemListContainer />} /> {/* Página de lista de productos por categoría */}
          <Route path="/item/:id" element={<ItemDetailContainer />} /> {/* Página de detalles del producto */}
          <Route path="/cart" element={<Cart />} /> {/* Página del carrito */}
        </Routes>
        <Footer /> {/* Pie de página */}
      </Router>
    </CartProvider>
  );
};

export default App;
