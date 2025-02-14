import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const CORRECT_USERNAME = 'user';
const CORRECT_PASSWORD_HASH = CryptoJS.SHA256('cake').toString(CryptoJS.enc.Base64); // Hash the correct password

const AdminPage = () => {
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
            navigate('/admin');
        } else {
            setError('Invalid username or password');
        }
    };

    const handleLogout = () => {
      localStorage.setItem('isLoggedIn', 'false');
      setUsername(''); // Clear the username input
      setPassword(''); // Clear the password input
  };

    return (
        <>
        {localStorage.getItem('isLoggedIn') === 'false' &&
        <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 bg-red-500 rounded-lg shadow-lg mt-10">
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
<>
<div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700">Admin Panel</h2>
        
        <div className="space-y-4">
          <Link to="/add">
            <button className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
              Add New Item
            </button>
          </Link>
          
          <Link to="/edit">
            <button className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition">
              Edit Existing Items
            </button>
          </Link>
          
          <Link to="/order">
            <button className="w-full py-3 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition">
              Manage Orders
            </button>
          </Link>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>© 2025 Admin Panel - All Rights Reserved</p>
        </footer>
        <NavLink to={"/admin"}>
        <button 
        onClick={handleLogout}
        className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition">
            Logout
          </button>
          </NavLink>
      </div>
    </div>
     </>
            }
</>
    );
};

export default AdminPage;
