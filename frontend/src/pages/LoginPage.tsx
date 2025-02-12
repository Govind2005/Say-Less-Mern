import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { NavLink, useNavigate } from 'react-router-dom';

const CORRECT_USERNAME = 'user';
const CORRECT_PASSWORD_HASH = CryptoJS.SHA256('cake').toString(CryptoJS.enc.Base64); // Hash the correct password

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Hash the entered password and compare it to the stored hash
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
        console.log(hashedPassword);

        if (username === CORRECT_USERNAME && hashedPassword === CORRECT_PASSWORD_HASH) {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/add');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <>
        {localStorage.getItem('isLoggedIn') === 'false' &&
        <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
    <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

    <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username"
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    />
    
    <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
        className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    />
    
    <button 
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
    >
        Login
    </button>
    
    {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
</form>  }
{localStorage.getItem('isLoggedIn') === 'true' &&
 <NavLink to={"/"}>
 <button 
     onClick={() => localStorage.setItem('isLoggedIn', 'false')}
     className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition duration-300"
 >
     Log Out
 </button>
</NavLink>
            }
</>
    );
};

export default Login;
