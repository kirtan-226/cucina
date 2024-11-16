import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'admin' && password === 'password') {
            alert('Login successful!');
            onLoginSuccess();
            navigate('/');
        } else {
            alert('Invalid username or password!');
        }
    };
    
    const handleGoogleLoginSuccess = (response) => {
        console.log('Google login response:', response);
        alert('Google login successful!');
        onLoginSuccess();
        navigate('/');
    };

    return (
        <div className="login-page" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Login</h2>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Login</button>
            <div style={{ marginTop: '20px' }}>
                <GoogleOAuthProvider clientId="326160157051-sulsasmu3q4p8ro3elbaas9b0ci9mokr.apps.googleusercontent.com">
                    <GoogleLogin 
                        onSuccess={handleGoogleLoginSuccess} 
                        onError={() => alert('Google login failed!')} 
                    />
                </GoogleOAuthProvider>
            </div>
        </div>
    );
};

export default Login;
