import { useState, useEffect } from 'react';
import './Gallery.css';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import ScrollReveal from 'scrollreveal';
import CurtainGallery from './CurtainGallery';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Define gallery images array
  const mainGalleryImages = [
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550717/WhatsApp_Image_2025-02-04_at_14.57.19_1a28ffa7_mehv6v.jpg",
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550717/WhatsApp_Image_2025-02-04_at_14.57.19_b993dbd2_a0vcmx.jpg",
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550714/WhatsApp_Image_2025-02-04_at_14.57.19_6b0d6d7c_yfiq2e.jpg",
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550712/WhatsApp_Image_2025-02-04_at_14.57.19_8e451678_icxejw.jpg",
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550714/WhatsApp_Image_2025-02-04_at_14.57.19_791f5cf4_e3ffsz.jpg",
    "https://res.cloudinary.com/duqllfqxd/image/upload/v1739550715/WhatsApp_Image_2025-02-04_at_14.57.19_163e6e72_x8ufk0.jpg"
  ];

  

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

  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'left',
      distance: '60px',
      duration: 1200,
      delay: 200
    });

    // Reveal banner rows sequentially
    document.querySelectorAll('.banner-row').forEach((row, index) => {
      sr.reveal(row as HTMLElement, {
        delay: 300 + (index * 200),
        distance: index % 2 === 0 ? '60px' : '-60px',
        origin: index % 2 === 0 ? 'left' : 'right'
      });
    });

    return () => sr.destroy();
  }, []);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const ratio = entry.intersectionRatio;
          
          if (ratio > 0.7) { // Adjust this threshold as needed
            element.classList.add('revealed');
          } else {
            element.classList.remove('revealed');
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.7, 1] // Multiple thresholds for smoother transition
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    document.querySelectorAll('.gallery-item-reveal').forEach(item => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll('.gallery-item-reveal');
      const windowHeight = window.innerHeight;
      const triggerBottom = windowHeight * 0.8;

      items.forEach((item) => {
        const element = item as HTMLElement;
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Navigation Bar */}
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-40 bg-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/">
              <img 
                src="https://res.cloudinary.com/dgtxyhdwa/image/upload/v1739618267/logo_kssytz.png" 
                alt="Bindi's" 
                className="h-6 sm:h-8 object-contain cursor-pointer" 
              />
            </a>
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-pink-100 hover:text-pink-200">
            <span className="sr-only">Open menu</span>
            ☰
          </button>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 text-white text-lg">
              <a href="/menu" className="hover:text-pink-200 transition-colors">Menu</a>
              <a href="/gallery" className="hover:text-pink-200 transition-colors">Gallery</a>
              <a href="/about" className="hover:text-pink-200 transition-colors">About Us</a>
              <a href="/admin" className="hover:text-pink-200 transition-colors">Admin</a>
            </div>
          </div>
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
      <section>
      <CurtainGallery/>

        {/* Horizontal Scroll Gallery with main gallery images */}
        <div className="scroll-gallery-container">
          <h3 className="scroll-gallery-title">More Delights</h3>
          <div className="scroll-gallery">
            {mainGalleryImages.map((image, index) => (
              <div 
                key={`scroll-${index}`} 
                className="scroll-gallery-item"
                onClick={() => handleImageClick(image)}
              >
                <img src={image} alt={`Scrolling gallery image ${index + 1}`} />
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
      <footer className="footer relative" 
        style={{
          background:"rgb(259, 70, 117)",
          zIndex: 1
        }}>
        <div className="footer-content">
          <div className="footer-logo">
            <img src="https://res.cloudinary.com/dgtxyhdwa/image/upload/v1739618267/logo_kssytz.png" alt="Bindi's Cupcakery" />
          </div>
          
          <div className="footer-sections">
            <div className="footer-info">
              <h3>Get In Touch</h3>
              <p>Parle Point, Surat, Gujarat</p>
              <p>8849130189 - 9978677790</p>
            </div>
            
            <div className="footer-hours" >
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