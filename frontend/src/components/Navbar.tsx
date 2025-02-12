import { Link } from "react-router"
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Initial cart count
    const count = localStorage.getItem('cartCount') || '0';
    setCartCount(parseInt(count));

    // Listen for storage changes
    const handleStorageChange = () => {
      const count = localStorage.getItem('cartCount') || '0';
      setCartCount(parseInt(count));
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also update count when component mounts
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
    <div className="bg-red-100 flex justify-around">
      Navbar
      <button>
      <Link to={"/add"}>ADD items</Link>
      </button>
      <button>
      <Link to={"/"}>Home</Link>
      </button>
      <button>
      <Link to={"/menu"}>Menu</Link>
      </button>
      <NavLink to="/cart" style={{ position: 'relative' }}>
        Cart
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            backgroundColor: '#7A3E3E',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '0.8rem',
            minWidth: '20px',
            textAlign: 'center'
          }}>
            {cartCount}
          </span>
        )}
      </NavLink>
    </div>
  )
}

export default Navbar
