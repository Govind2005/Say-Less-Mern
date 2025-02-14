import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Initialize cart count
    const count = localStorage.getItem('cartCount') || '0';
    setCartCount(parseInt(count));

    // Listen for storage changes
    const handleStorageChange = () => {
      const count = localStorage.getItem('cartCount') || '0';
      setCartCount(parseInt(count));
    };

    window.addEventListener('storage', handleStorageChange);

    // Update count periodically as a fallback
    const interval = setInterval(() => {
      const count = localStorage.getItem('cartCount') || '0';
      setCartCount(parseInt(count));
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="-z-10"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '90px',
        backgroundColor: 'lightpink', // Solid black background
        color: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        fontFamily: '"Bodoni Moda", serif',
        fontSize: '1.3rem',
        boxShadow: '0 6px 10px rgba(0,0,0,0.6)', // Subtle shadow
      }}
    >
      {/* Import Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400;1,700&display=swap');

          .nav-button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            transition: transform 0.3s ease;
          }

          .nav-button:hover {
            transform: translateY(-3px);
          }

          .nav-link {
            text-decoration: none;
            color: white;
            transition: color 0.3s ease;
          }

          .nav-link:hover {
            color: #ffb6c1; /* Light pink on hover */
          }
        `}
      </style>

      {/* Navbar Title */}
      <div style={{ fontWeight: 'bold', fontSize: '2rem', letterSpacing: '2px' }}>
        BINDI'S CUPCAKERY
      </div>

      {/* Navigation Links */}
      <button className="nav-button">
        <Link to="/add" className="nav-link">Add Items</Link>
      </button>
      <button className="nav-button">
        <Link to="/" className="nav-link">Home</Link>
      </button>
      <button className="nav-button">
        <Link to="/menu" className="nav-link">Menu</Link>
      </button>
      <button className="nav-button">
        <Link to="/login" className="nav-link">Login</Link>
      </button>
      <button>
      <Link to={"/review"}>Review</Link>
      </button>
      <button>
      <Link to={"/order"}>Order</Link>
      </button>
      <button className="nav-button">
        <Link to="/edit" className="nav-link">Edit</Link>
      </button>

      {/* Cart Link with Dynamic Badge */}
      <NavLink to="/cart" className="nav-link" style={{ position: 'relative' }}>
        Cart
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-12px',
            right: '-12px',
            backgroundColor: '#FF4B4B',
            color: 'white',
            borderRadius: '50%',
            padding: '5px 8px',
            fontSize: '0.75rem',
            minWidth: '20px',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
          }}>
            {cartCount}
          </span>
        )}
      </NavLink>
    </div>
  );
};

export default Navbar;
