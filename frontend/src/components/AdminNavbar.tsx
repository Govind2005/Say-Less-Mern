import { Link, NavLink } from 'react-router-dom'
import { useScrollDirection } from '../hooks/useScrollDirection';
import { Home, PlusCircle, Edit, MessageCircle, ShoppingBag, LogOut } from 'lucide-react';


const AdminNavbar = () => {
    const isNavbarVisible = useScrollDirection();
    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        window.location.reload();
    };


    const navLinks = [
      { to: "/admin", text: "Home", icon: Home },
      { to: "/add", text: "Add Item", icon: PlusCircle },
      { to: "/edit", text: "Edit Item", icon: Edit },
      { to: "/review", text: "Reviews", icon: MessageCircle },
      { to: "/order", text: "Orders", icon: ShoppingBag },
  ];
  return (
    <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
                !isNavbarVisible ? '-translate-y-full' : 'translate-y-0'
            }`}
        >
            <div className="bg-white/95 backdrop-blur-sm shadow-md border-b border-pink-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo Section */}
                        <div className="flex-shrink-0">
                            <Link to="/admin" className="flex items-center">
                                <img 
                                    src="https://res.cloudinary.com/duqllfqxd/image/upload/v1739274748/logo_pzf5wc.png" 
                                    alt="logo" 
                                    className="h-12 w-auto rounded-lg"
                                />
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors
                                        ${location.pathname === link.to 
                                            ? 'text-pink-600 bg-pink-50 rounded-lg' 
                                            : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg'
                                        }`}
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.text}
                                </Link>
                            ))}
                            
                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button className="p-2 rounded-lg text-gray-600 hover:text-pink-600 hover:bg-pink-50">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu (hidden by default) */}
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg
                                    ${location.pathname === link.to 
                                        ? 'text-pink-600 bg-pink-50' 
                                        : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                                    }`}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.text}
                            </Link>
                        ))}
                        <NavLink to={"/admin"}>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                            >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                          </NavLink>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default AdminNavbar
