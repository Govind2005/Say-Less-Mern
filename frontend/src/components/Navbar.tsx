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
    <>
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
    </>
  );
};

export default Navbar;
