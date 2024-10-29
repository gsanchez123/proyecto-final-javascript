// src/components/Checkout.jsx
import React, { useState } from 'react';
import PaymentMethods from './PaymentMethods';
import './Checkout.css';

const Checkout = () => {
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });
    const [selectedPayment, setSelectedPayment] = useState('');
    const [amount] = useState(100); // Cambia esto por el monto real
    const [paymentStatus, setPaymentStatus] = useState(''); // Para el feedback de pago
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCustomerData({
            ...customerData,
            [name]: value,
        });
    };

    const handlePaymentSuccess = (order) => {
        setPaymentStatus('Pago exitoso! Gracias por tu compra.');
        setError('');
        // aca se puede  enviar un correo electrónico de confirmación o hacer otra acción
        console.log('Pago exitoso:', order);
    };

    const handlePaymentError = (errorMessage) => {
        setError(errorMessage);
        setPaymentStatus('');
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Evitar la recarga de la página

        // Validar que todos los campos estén completos
        if (!customerData.name || !customerData.email || !customerData.address || !customerData.phone) {
            setError('Por favor completa todos los campos.');
            return;
        }

        // aca se va a procesar la información del cliente si es necesario
        console.log('Datos del cliente:', customerData);
    };

    return (
        <div className="checkout-container">
            <h2>Finalizar Compra</h2>
            <form onSubmit={handleSubmit}>
                {/* Campos de entrada de datos del cliente */}
                <div>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="name"
                            value={customerData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Correo Electrónico:
                        <input
                            type="email"
                            name="email"
                            value={customerData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Dirección:
                        <input
                            type="text"
                            name="address"
                            value={customerData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Teléfono:
                        <input
                            type="tel"
                            name="phone"
                            value={customerData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>

                {/* Selección de métodos de pago */}
                <PaymentMethods 
                    amount={amount} 
                    onSelectPayment={setSelectedPayment} 
                    onPaymentSuccess={handlePaymentSuccess} 
                    onPaymentError={handlePaymentError} // Pasar el manejador de errores
                />

                <button type="submit" className="btn btn-primary mt-3">Realizar Pago</button>
                
                {/* Mostrar feedback al usuario */}
                {paymentStatus && <p className="success-message">{paymentStatus}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Checkout;
