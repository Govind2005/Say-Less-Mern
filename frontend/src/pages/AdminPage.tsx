import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const CORRECT_USERNAME = 'user';
const CORRECT_PASSWORD_HASH = CryptoJS.SHA256('cake').toString(CryptoJS.enc.Base64); // Hash the correct password

const AdminPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    // Login handler
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Hash the entered password and compare it to the stored hash
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

        if (username === CORRECT_USERNAME && hashedPassword === CORRECT_PASSWORD_HASH) {
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            navigate('/admindb'); // Redirect to the new page after login
        } else {
            setError('Invalid username or password');
        }
    };

    // Logout handler
    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
        setUsername(''); // Clear the username input
        setPassword(''); // Clear the password input
    };

    if (isLoggedIn) {
        return (
            <div className="container">
                <h2 className="text-3xl font-semibold text-center mb-6">You are logged in!</h2>
                <button
                    type="button"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 bg-pink-50 rounded-lg shadow-lg mt-32">
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
            </form>
        </div>
    );
};

export default AdminPage;
import CryptoJS from 'crypto-js';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const CORRECT_USERNAME = 'user';
const CORRECT_PASSWORD_HASH = CryptoJS.SHA256('cake').toString(CryptoJS.enc.Base64); // Hash the correct password

const AdminPage = () => {
    console.log('Rendering AdminPage'); // Debugging message to track the render flow
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Login handler
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
  
      // Hash the entered password and compare it to the stored hash
      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
      console.log(hashedPassword);
  
      if (username === CORRECT_USERNAME && hashedPassword === CORRECT_PASSWORD_HASH) {
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/admindb'); // Redirect to the new page after login
      } else {
          setError('Invalid username or password');
      }
  };
  
    // Logout handler
    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        setUsername(''); // Clear the username input
        setPassword(''); // Clear the password input
    };

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return (
        <div className="container">
          
                <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 bg-pink-50 rounded-lg shadow-lg mt-32">
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
                </form>
            
        </div>
    );
};

export default AdminPage;
