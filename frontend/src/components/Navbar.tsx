// import { useState } from "react";
import "../App.css";

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container-fluid w-full relative nav-bar bg-white shadow-md">
      <div className="container-lg max-w-screen-lg mx-auto px-4 lg:px-6 relative z-10">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow p-lg-0">
          <div className="flex justify-between items-center py-4 lg:py-0">

            {/* Desktop Menu */}
            <div className="hidden lg:flex w-full justify-between items-center">
              {/* Left Side Links */}
              <div className="navbar-nav flex space-x-6">
                <a
                  href="index.html"
                  className="nav-item nav-link text-gray-800 hover:text-black"
                >
                  Home
                </a>
                <a
                  href="about.html"
                  className="nav-item nav-link text-gray-800 hover:text-black"
                >
                  About
                </a>
              </div>

              {/* Center Logo (Desktop) */}
              <a href="index.html" className="navbar-brand hidden lg:block">
                <img
                  src="https://res.cloudinary.com/dgtxyhdwa/image/upload/v1739618267/logo_kssytz.png"
                  alt="Logo"
                  className="h-[58px]"
                />
              </a>

              {/* Right Side Links */}
              <div className="navbar-nav flex space-x-6">
                <a
                  href="product.html"
                  className="nav-item nav-link text-gray-800 hover:text-black"
                >
                  Product
                </a>
                <a
                  href="gallery.html"
                  className="nav-item nav-link text-gray-800 hover:text-black"
                >
                  Gallery
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
