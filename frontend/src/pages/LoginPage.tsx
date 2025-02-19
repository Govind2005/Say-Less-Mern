import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const CORRECT_USERNAME = 'user';
const CORRECT_PASSWORD_HASH = CryptoJS.SHA256('cake').toString(CryptoJS.enc.Base64);

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e:any) => {
        e.preventDefault();
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
        if (username === CORRECT_USERNAME && hashedPassword === CORRECT_PASSWORD_HASH) {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/admin');
            window.location.reload();
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
            fontFamily: "'Roboto', sans-serif",
            position: 'relative'
        }}>
            {/* Home Button */}
            <button 
                onClick={() => navigate('/')}
                title="Return to Home"
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#b35a7a',
                    border: 'none',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                ←
            </button>

            <div style={{
                width: '1000px',
                height: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#FFF',
                boxShadow: '0 0 20px rgba(179, 90, 122, 0.2)',
                overflow: 'hidden',
                position: 'relative',
                border: '10px solid #ffe4eb',
                borderRadius: '20px'
            }}>
                <div style={{
                    width: '50%',
                    height: '100%',
                    justifyContent: 'flex-start',
                    backgroundPosition: '-50px 0',
                    backgroundImage: "url(./hello.gif)",
                    backgroundSize: 'cover',
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 2,
                        backgroundColor: 'rgba(179, 90, 122, 0.1)'
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
                        color: '#b35a7a',
                        textTransform: 'capitalize',
                        marginBottom: '60px',
                        textAlign: 'center'
                    }}>Login Here</h2>

                    <label htmlFor="email" style={{ 
                        fontSize: '16px', 
                        display: 'block', 
                        margin: '10px 0', 
                        textTransform: 'capitalize',
                        color: '#b35a7a'
                    }}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        style={{ 
                            fontSize: '16px', 
                            display: 'block', 
                            width: '90%', 
                            border: 'none', 
                            borderBottom: '2px solid #ffe4eb',
                            marginBottom: '20px',
                            padding: '5px',
                            outline: 'none'
                        }}
                    />

                    <label htmlFor="password" style={{ 
                        fontSize: '16px', 
                        display: 'block', 
                        margin: '10px 0', 
                        textTransform: 'capitalize',
                        color: '#b35a7a'
                    }}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        style={{ 
                            fontSize: '16px', 
                            display: 'block', 
                            width: '90%', 
                            border: 'none', 
                            borderBottom: '2px solid #ffe4eb',
                            marginBottom: '20px',
                            padding: '5px',
                            outline: 'none'
                        }}
                    />

                    <button type="submit" style={{
                        width: '130px',
                        height: '40px',
                        textTransform: 'capitalize',
                        borderRadius: '50px',
                        border: 'none',
                        background: '#b35a7a',
                        color: '#FFF',
                        display: 'block',
                        cursor: 'pointer',
                        margin: '50px auto',
                        fontSize: '16px',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c76b8d'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#b35a7a'}
                    >Login</button>

                    {error && <p style={{ color: '#b35a7a', textAlign: 'center' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
