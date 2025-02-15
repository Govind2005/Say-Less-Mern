import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useScrollDirection } from '../hooks/useScrollDirection';
import ScrollReveal from 'scrollreveal';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isNavbarVisible = useScrollDirection();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '60px',
      duration: 1200,
      delay: 300,
      reset: false
    });

    // Hero Section with enhanced effects
    sr.reveal('.gallery-hero', {
      origin: 'top',
      distance: '80px',
      duration: 1500,
      delay: 100
    });

    sr.reveal('.gallery-hero h1', {
      origin: 'bottom',
      delay: 600,
      duration: 1000,
      distance: '40px'
    });

    sr.reveal('.hero-decoration', {
      delay: 800,
      duration: 1200,
      interval: 200
    });

    // Gallery Title
    sr.reveal('.gallery-title', {
      delay: 300
    });

    // Gallery Grid - reveal items sequentially
    
    
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      sr.reveal(item as HTMLElement, {
        delay: 300 + (index * 100),
        origin: 'bottom',
        interval: 100
      });
    });

    // Footer
    sr.reveal('.footer-content', {
      delay: 300,
      origin: 'bottom'
    });

    return () => sr.destroy();
  }, []);

  useEffect(() => {
    const scrollGallery = document.querySelector('.scroll-gallery');
    
    const handleWheel = (e: WheelEvent) => {
      if (scrollGallery) {
        e.preventDefault();
        const scrollAmount = e.deltaY;
        scrollGallery.scrollLeft += scrollAmount;
      }
    };

    if (scrollGallery) {
      (scrollGallery as HTMLElement).addEventListener('wheel', (e: WheelEvent) => handleWheel(e), { passive: false });

    }

    return () => {
      if (scrollGallery) {
        (scrollGallery as HTMLElement).removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Handle image click
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const mainGalleryImages = [
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550717/WhatsApp_Image_2025-02-04_at_14.57.19_1a28ffa7_mehv6v.jpg",
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550717/WhatsApp_Image_2025-02-04_at_14.57.19_b993dbd2_a0vcmx.jpg",
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550714/WhatsApp_Image_2025-02-04_at_14.57.19_6b0d6d7c_yfiq2e.jpg",
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550712/WhatsApp_Image_2025-02-04_at_14.57.19_8e451678_icxejw.jpg",
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550714/WhatsApp_Image_2025-02-04_at_14.57.19_791f5cf4_e3ffsz.jpg",
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550715/WhatsApp_Image_2025-02-04_at_14.57.19_163e6e72_x8ufk0.jpg"
  ];

  const scrollGalleryImages = [
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
          <Link to="/admin" className={location.pathname === "/" ? "active" : ""}>Admin</Link>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
          <div className="logo-container cursor-pointer">
          <Link to="/" >
            <img src="https://res.cloudinary.com/duqllfqxd/image/upload/v1739274748/logo_pzf5wc.png" alt="logo" />
          </Link>
          </div>

          <Link to="/menu" className={location.pathname === "/menu" ? "active" : ""}>Product</Link>
          <Link to="/gallery" className={location.pathname === "/gallery" ? "active" : ""}>Gallery</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="hero-decoration">✧</div>
        <div className="hero-decoration">❀</div>
        <div className="hero-decoration">✧</div>
        <div className="hero-decoration">❀</div>
        <h1>Gallery</h1>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="rain-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="raindrop" />
          ))}
        </div>
        <h2 className="gallery-title">Our Delicacies!</h2>
        
        {/* Main Grid Gallery */}
        <div className="gallery-grid">
          {mainGalleryImages.map((image, index) => (
            <div 
              key={index} 
              className={`gallery-item effect-${index % 3 + 1}`}
              onClick={() => handleImageClick(image)}
            >
              <div className="gallery-image-wrapper">
                <img src={image} alt={`Gallery image ${index + 1}`} />
                <div className="gallery-item-overlay">
                  <span className="view-text">View</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal Scroll Gallery */}
        <div className="scroll-gallery-container">
          <h3 className="scroll-gallery-title">More Delights</h3>
          <div className="scroll-gallery">
            {scrollGalleryImages.map((image, index) => (
              <div 
                key={`scroll-${index}`} 
                className="scroll-gallery-item"
                onClick={() => handleImageClick(image)}
              >
                <div className="gallery-image-wrapper">
                  <img src={image} alt={`Scrolling gallery image ${index + 1}`} />
                  <div className="gallery-item-overlay">
                    <span className="view-text">View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedImage && (
          <div 
            className="image-dialog-overlay" 
            onClick={handleCloseModal}
          >
            <div className="image-dialog">
              <img src={selectedImage} alt="Selected gallery image" />
              <button 
                className="close-button" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseModal();
                }}
              >
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
        </div>

        <div className="footer-bottom">
          <p><span>© Domain</span>. All Rights Reserved. Designed by Bindi's Cupcakery</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        className="scroll-to-top" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  );
}

export default Gallery; 