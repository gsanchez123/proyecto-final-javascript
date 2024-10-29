import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './PaymentMethods.css';

// Componente ErrorBoundary para manejar errores
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Actualiza el estado para mostrar una interfaz de reserva
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Puedes registrar el error en un servicio de reporte
        console.error("Error capturado por ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Algo salió mal.</h1>;
        }

        return this.props.children; 
    }
}

// Componente PaymentMethods
const PaymentMethods = ({ amount, onPaymentSuccess }) => {
    const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY'); //hay que Reemplazar con  Publishable Key de Stripe
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // Estado para el mensaje de éxito
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        installments: '3' // Cuotas predeterminadas
    });

    // Manejar el cambio en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para validar el formulario
    const validateForm = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el email
        if (!emailPattern.test(formData.email)) {
            setError('Por favor, introduce un correo electrónico válido.');
            return false;
        }
        if (formData.name.trim() === '' || formData.address.trim() === '' || formData.city.trim() === '' || formData.zipCode.trim() === '') {
            setError('Todos los campos son obligatorios.');
            return false;
        }
        return true;
    };

    // Función para manejar el pago con Stripe
    const handleStripePayment = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        if (!validateForm()) return; // Validar el formulario antes de continuar

        const stripe = await stripePromise;

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            const session = await response.json();
            const result = await stripe.redirectToCheckout({ sessionId: session.id });
            if (result.error) {
                setError(result.error.message);
            } else {
                setSuccess('Compra realizada con éxito. ✅'); // Mensaje de éxito
                onPaymentSuccess(session);
            }
        } catch (error) {
            setError('Error al procesar el pago con Stripe. Intenta de nuevo.');
            console.error('Stripe error:', error);
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Limpiar mensajes de error
        setSuccess(''); // Limpiar mensajes de éxito

        if (validateForm()) {
            alert('Formulario enviado con éxito. Procediendo al pago...');
            handleStripePayment(e); // Llamar a la función de pago de Stripe
        }
    };

    return (
        <ErrorBoundary>
            <div className="payment-methods-container">
                <h3>Selecciona un Método de Pago</h3>
                {error && <p className="error-message">{error}</p>} {/* Muestra mensajes de error */}
                {success && <p className="success-message">{success}</p>} {/* Muestra mensajes de éxito */}

                {/* Formulario para datos del cliente */}
                <form onSubmit={handleSubmit} className="purchase-form">
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Dirección:</label>
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="city">Ciudad:</label>
                        <input 
                            type="text" 
                            id="city" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="zipCode">Código Postal:</label>
                        <input 
                            type="text" 
                            id="zipCode" 
                            name="zipCode" 
                            value={formData.zipCode} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="cardNumber">Número de Tarjeta:</label>
                        <input 
                            type="text" 
                            id="cardNumber" 
                            name="cardNumber" 
                            value={formData.cardNumber} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="cardExpiry">Fecha de Expiración (MM/AA):</label>
                        <input 
                            type="text" 
                            id="cardExpiry" 
                            name="cardExpiry" 
                            value={formData.cardExpiry} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="cardCvc">CVC:</label>
                        <input 
                            type="text" 
                            id="cardCvc" 
                            name="cardCvc" 
                            value={formData.cardCvc} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="installments">Cantidad de Cuotas:</label>
                        <select 
                            id="installments" 
                            name="installments" 
                            value={formData.installments} 
                            onChange={handleChange}
                        >
                            <option value="3">3 Cuotas</option>
                            <option value="6">6 Cuotas</option>
                            <option value="9">9 Cuotas</option>
                        </select>
                    </div>
                    <button type="submit">Confirmar Datos</button>
                </form>
            </div>
        </ErrorBoundary>
    );
};

export default PaymentMethods;
