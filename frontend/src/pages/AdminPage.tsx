import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const CORRECT_USERNAME = 'user';
const CORRECT_PASSWORD_HASH = CryptoJS.SHA256('cake').toString(CryptoJS.enc.Base64);

const AdminPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
        if (username === CORRECT_USERNAME && hashedPassword === CORRECT_PASSWORD_HASH) {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/admindb');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: "url('226.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            fontFamily: "'Roboto', sans-serif",
            padding: '15px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '1000px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                background: '#FFF',
                boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
                overflow: 'hidden',
                position: 'relative',
                border: '10px solid #FFF',
                borderRadius: '10px'
            }}>
                <div style={{
                    width: '100%',
                    minHeight: '250px',
                    maxWidth: '500px',
                    flex: '1 1 300px',
                    backgroundImage: "url(./hello.gif)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '5px 5px 0 0',
                    position: 'relative',
                    display: 'block',
                    '@media (min-width: 768px)': {
                        borderRadius: '5px 0 0 5px',
                        minHeight: '500px'
                    }
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 2
                    }}></div>
                </div>
                <form onSubmit={handleLogin} style={{
                    width: '100%',
                    maxWidth: '500px',
                    flex: '1 1 300px',
                    minHeight: '500px',
                    padding: '30px 20px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h2 style={{
                        fontSize: 'clamp(28px, 5vw, 40px)',
                        textTransform: 'capitalize',
                        marginBottom: 'clamp(30px, 5vh, 60px)',
                        textAlign: 'center'
                    }}>Login Here</h2>

                    <div style={{ flexGrow: 1 }}>
                        <label htmlFor="email" style={{ 
                            fontSize: 'clamp(14px, 2vw, 16px)', 
                            display: 'block', 
                            margin: '10px 0', 
                            textTransform: 'capitalize' 
                        }}>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            style={{ 
                                fontSize: 'clamp(14px, 2vw, 16px)', 
                                display: 'block', 
                                width: '100%', 
                                maxWidth: '350px',
                                border: 'none', 
                                borderBottom: '1px solid #000', 
                                marginBottom: '20px',
                                padding: '5px 0' 
                            }}
                        />

                        <label htmlFor="password" style={{ 
                            fontSize: 'clamp(14px, 2vw, 16px)', 
                            display: 'block', 
                            margin: '10px 0', 
                            textTransform: 'capitalize' 
                        }}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            style={{ 
                                fontSize: 'clamp(14px, 2vw, 16px)', 
                                display: 'block', 
                                width: '100%', 
                                maxWidth: '350px',
                                border: 'none', 
                                borderBottom: '1px solid #000', 
                                marginBottom: '20px',
                                padding: '5px 0' 
                            }}
                        />

                        <button type="submit" style={{
                            width: 'clamp(110px, 30%, 130px)',
                            height: 'clamp(28px, 5vh, 30px)',
                            textTransform: 'capitalize',
                            borderRadius: '50px',
                            border: 'none',
                            background: 'black',
                            color: '#FFF',
                            display: 'block',
                            cursor: 'pointer',
                            margin: 'clamp(25px, 5vh, 50px) auto'
                        }}>Login</button>

                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    </div>

                    <span style={{
                        fontSize: 'clamp(12px, 1.5vw, 14px)',
                        color: 'rgb(117, 117, 117)',
                        textTransform: 'capitalize',
                        textAlign: 'right',
                        marginTop: 'auto',
                        cursor: 'pointer',
                        alignSelf: 'flex-end'
                    }}>Don't have an account?</span>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;