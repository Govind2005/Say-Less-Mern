import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { Cake, ShoppingCart, Box, Activity, Coffee, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card } from '../components/ui/card';

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
</form>  }
{localStorage.getItem('isLoggedIn') === 'true' &&
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img className="w-32 h-16 object-cover rounded-lg shadow-sm" src="./logo.jpg" alt="Bakery Logo" />
          </div>
          <nav className="flex items-center gap-8 text-pink-600 font-medium">
          <Link onClick={handleLogout} to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
            <div className="h-8 w-8 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-md">B</div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-pink-700 mb-2">Welcome back, Bakery Admin!</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-pink-500">
            <Coffee className="h-4 w-4" />
            Bakery Dashboard
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif text-pink-700 text-center mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cake, bg: 'bg-pink-200', text: 'text-pink-600', title: 'Add New Pastry', desc: 'Add a new item to the menu',link:"/add" },
              { icon: Box, bg: 'bg-purple-200', text: 'text-purple-600', title: 'Edit Current Items', desc: 'Make Changes in current items',link:"/edit" },
              { icon: ShoppingCart, bg: 'bg-green-200', text: 'text-green-600', title: 'Orders', desc: 'View current orders',link:"/order" },
              { icon: Activity, bg: 'bg-yellow-200', text: 'text-yellow-600', title: 'Reviews', desc: 'View sales statistics',link:"/review" }
            ].map((action, index) => (
                <Link to={action.link}>
              <Card key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${action.bg} ${action.text}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-700">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.desc}</p>
                  </div>
                </div>
              </Card>
                </Link>
            ))}
          </div>
        </section>

        {/* Bakery Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-pink-700 mb-6 text-center">Bakery Information</h2>
          <Card className="p-8 bg-white rounded-xl shadow-lg">
            <div className="grid gap-6 md:grid-cols-2">
              {[{ icon: Coffee, label: 'Bakery Name', value: 'Sweet Treats Bakery' },
                { icon: Mail, label: 'Email', value: 'sweettreats@example.com' },
                { icon: Phone, label: 'Contact', value: '+91 9876543210' },
                { icon: MapPin, label: 'Location', value: 'Baker Street, Bangalore' },
                { icon: Clock, label: 'Serving Since', value: '1/5/2022' }
              ].map((info, index) => (
                <div key={index} className="flex items-center gap-4 bg-pink-50 p-4 rounded-lg">
                  <info.icon className="h-5 w-5 text-pink-600" />
                  <div>
                    <div className="text-sm text-gray-500">{info.label}</div>
                    <div className="font-medium text-gray-700">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Listed Bakery Items */}
        <NavLink to={"/admin"}>
        <button 
        onClick={handleLogout}
        className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition">
            Logout
          </button>
          </NavLink>
      </main>
    </div>}
              </>
    );
};

export default AdminPage;
