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
            fontFamily: "'Roboto', sans-serif"
        }}>
            <div style={{
                width: '1000px',
                height: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#FFF',
                boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
                overflow: 'hidden',
                position: 'relative',
                border: '10px solid #FFF',
                borderRadius: '10px'
            }}>
                <div style={{
                    width: '50%',
                    height: '100%',
                     justifyContent: 'flex-start',
                     backgroundPosition: '-50px 0',

                    backgroundImage: "url(./hello.gif)",
                    backgroundSize: 'cover',
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 2,
                        
                      }}></div>
                </div>
                <form onSubmit={handleLogin} style={{
                    minWidth: '250px',
                    width: '50%',
                    height: '100%',
                    padding: '30px 20px'
                }}>
                    <h2 style={{
                        fontSize: '40px',
                        // fontFamily:'inherit',
                        textTransform: 'capitalize',
                        marginBottom: '60px',
                        textAlign: 'center'
                    }}>Login Here</h2>

                    <label htmlFor="email" style={{ fontSize: '16px', display: 'block', margin: '10px 0', textTransform: 'capitalize' }}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        style={{ fontSize: '16px', display: 'block', width: '90%', border: 'none', borderBottom: '1px solid #000', marginBottom: '20px' }}
                    />

                    <label htmlFor="password" style={{ fontSize: '16px', display: 'block', margin: '10px 0', textTransform: 'capitalize' }}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        style={{ fontSize: '16px', display: 'block', width: '90%', border: 'none', borderBottom: '1px solid #000', marginBottom: '20px' }}
                    />

                    <button type="submit" style={{
                        width: '130px',
                        height: '30px',
                        textTransform: 'capitalize',
                        borderRadius: '50px',
                        border: 'none',
                        background: 'black',
                        color: '#FFF',
                        display: 'block',
                        cursor: 'pointer',
                        margin: '50px auto'
                    }}>Login</button>

                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                    <span style={{
                        fontSize: '14px',
                        color: 'rgb(117, 117, 117)',
                        textTransform: 'capitalize',
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        cursor: 'pointer'
                    }}>Don't have an account?</span>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;
