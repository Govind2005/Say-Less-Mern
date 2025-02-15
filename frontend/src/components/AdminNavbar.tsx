import { Link } from 'react-router-dom'
import { useScrollDirection } from '../hooks/useScrollDirection';


const AdminNavbar = () => {
    const isNavbarVisible = useScrollDirection();
    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
    };
  return (
    <div>
      <nav className={`navbar ${!isNavbarVisible ? 'hidden' : ''}`}>
        
        <div className="nav-links">
          <Link onClick={handleLogout} to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/add" className={location.pathname === "/about" ? "active" : ""}>Add Item</Link>
          <div className="logo-container cursor-pointer">
          <Link to="/admin" >
            <img src="https://res.cloudinary.com/dgtxyhdwa/image/upload/v1739618267/logo_kssytz.png" alt="logo" />
          </Link>
          </div>
          <Link to="/edit" className={location.pathname === "/menu" ? "active" : ""}>Edit Item</Link>
          <Link to="/review" className={location.pathname === "/gallery" ? "active" : ""}>Reviews</Link>
          <Link to="/order" className={location.pathname === "/gallery" ? "active" : ""}>Orders</Link>
        </div>
      </nav>

    </div>
  )
}

export default AdminNavbar
