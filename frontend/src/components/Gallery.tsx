import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useScrollDirection } from '../hooks/useScrollDirection';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isNavbarVisible = useScrollDirection();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274475/111_rtm1vj.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274473/222_u7w8gn.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274473/333_i0ae0e.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274474/444_oapcps.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274480/555_bsghyy.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274480/666_hjsal2.jpg'
  ];

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className={`navbar ${!isNavbarVisible ? 'hidden' : ''}`}>
        <div className="rain-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="raindrop" />
          ))}
        </div>
        <div className="nav-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
          <div className="logo-container">
            <img src="https://res.cloudinary.com/duqllfqxd/image/upload/v1739274748/logo_pzf5wc.png" alt="logo" />
          </div>
          <a href="#">Product</a>
          <Link to="/gallery" className={location.pathname === "/gallery" ? "active" : ""}>Gallery</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gallery-hero">
        <h1>Gallery</h1>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h2 className="section-title">Our Delicacies!</h2>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={`Gallery image ${index + 1}`} />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="image-dialog-overlay" onClick={() => setSelectedImage(null)}>
            <div className="image-dialog">
              <img src={selectedImage} alt="Selected gallery image" />
              <button className="close-button" onClick={() => setSelectedImage(null)}>
                ×
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="https://res.cloudinary.com/duqllfqxd/image/upload/v1739274748/logo_pzf5wc.png" alt="Logo" />
          </div>
          
          <div className="footer-sections">
            <div className="footer-info">
              <h3>Get In Touch</h3>
              <p>Parle Point, Surat, Gujarat</p>
              <p>8849130189 - 9978677790</p>
            </div>

            <div className="footer-hours">
              <h3>Opening Hours</h3>
              <p>Mon – Sat, 11AM – 7PM</p>
              <p>Sunday: Closed</p>
            </div>

            <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <FaFacebookF />
                </a>
                <a href="#" className="social-icon">
                  <FaInstagram />
                </a>
                <a href="#" className="social-icon">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p><span>© Domain</span>. All Rights Reserved. Designed by Bindi's Cupcakery</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Gallery; 