import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './components/menu';
import Plate from './components/plate';
import Summary from './components/summary';
import Login from './components/login'; // Import the Login component
import './App.css';

const App = () => {
    const [order, setOrder] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // To track login status

    const addToOrder = (item) => {
        setOrder([...order, item]);
    };

    const removeFromOrder = (index) => {
        setOrder((prevOrder) => prevOrder.filter((_, i) => i !== index));
    };

    const submitOrder = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            alert('Failed to place the order. Please try again.');
            console.error('Error submitting order:', error);
        }
    };

    return (
        <Router>
            <Routes>
                {/* Public Route for Login */}
                <Route
                    path="/login"
                    element={
                        <Login
                            onLoginSuccess={() => setIsAuthenticated(true)} // Pass login success handler
                        />
                    }
                />

                {/* Protected Route for Main App */}
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <div className="app">
                                <h1>Restaurant Ordering System</h1>
                                <div className="main-container">
                                    <Menu addToOrder={addToOrder} />
                                    <Plate order={order} />
                                    <Summary
                                        order={order}
                                        submitOrder={submitOrder}
                                        removeItem={removeFromOrder}
                                    />
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/login" replace /> // Redirect if not logged in
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
