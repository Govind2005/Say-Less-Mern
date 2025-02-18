import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useScrollDirection } from '../hooks/useScrollDirection';
import ScrollReveal from 'scrollreveal'
import CreateReview from './AddReview';

function About() {
  const [currentChefIndex, setCurrentChefIndex] = useState(0);
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
    sr.reveal('.about-hero', {
      origin: 'top',
      distance: '80px',
      duration: 1500,
      delay: 100
    });

    sr.reveal('.about-hero h1', {
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

    // About Content
    sr.reveal('.about-left', {
      origin: 'left',
      delay: 500
    });

    sr.reveal('.about-center', {
      delay: 600
    });

    sr.reveal('.about-right', {
      origin: 'right',
      delay: 500
    });

    // Chefs Section
    sr.reveal('.chefs-section .section-title', {
      delay: 300
    });
    sr.reveal('.chefs-carousel', {
      delay: 500
    });

    // Footer
    sr.reveal('.footer-content', {
      delay: 300,
      origin: 'bottom'
    });

    return () => sr.destroy();
  }, []);

  // Add this useEffect hook for chefs carousel scrolling
  useEffect(() => {
    const chefsCarousel = document.querySelector('.about-chefs-carousel');
    
    if (chefsCarousel) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const scrollAmount = e.deltaY * 1.5;
        
        chefsCarousel.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      };

      chefsCarousel.addEventListener('wheel', handleWheel as EventListener);
      
      return () => {
        chefsCarousel.removeEventListener('wheel', handleWheel as EventListener);
      };
    }
  }, []);

  const nextChef = () => {
    setCurrentChefIndex((prev) => 
      prev === chefs.length - 3 ? 0 : prev + 1
    );
  };

  const prevChef = () => {
    setCurrentChefIndex((prev) => 
      prev === 0 ? chefs.length - 3 : prev - 1
    );
  };

  const chefs = [
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275287/team-1_bpvjqy.jpg',
      name: 'Chef Michael',
      designation: 'Head Chef'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275288/team-2_huu62r.jpg',
      name: 'Chef Sarah',
      designation: 'Pastry Specialist'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275289/team-3_jgve0k.jpg',
      name: 'Chef David',
      designation: 'Dessert Expert'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275291/team-4_t0vkqw.jpg',
      name: 'Chef John',
      designation: 'Cake Artist'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739379645/chef_gvqsdc.jpg',
      name: 'Chef Patrick',
      designation: 'Pastry Chef'
    }
  ];

  return (
    <div className="app">
      {/* Add Navigation Bar */}
      <nav className={`navbar ${!isNavbarVisible ? 'hidden' : ''}`}>
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
        <div className="rain-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="raindrop" />
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-decoration">✧</div>
        <div className="hero-decoration">❀</div>
        <div className="hero-decoration">✧</div>
        <div className="hero-decoration">❀</div>
        <h1>About Us</h1>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-rain-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="about-raindrop" />
          ))}
        </div>
        <h1 className="section-title">Where Flavor Meets Love!</h1>
        <div className="about-content">
          <div className="about-left">
            <h2>Why Us?</h2>
            <p className="main-text">
              We create Experiences! Every dessert is Handcrafted with love, 
              using 100% VEGETERIAN, EGGLESS, and Preservative-FREE Ingredients.
            </p>
            <ul className="features-list">
              <li>Premium Quality Ingredients</li>
              <li>100% Eggless Recipes</li>
              <li>Fresh Daily Preparations</li>
            </ul>
            <button className="learn-more light">Learn More</button>
          </div>

          <div className="about-center">
            <div className="image-container">
              <div className="image-frame"></div>
              <div className="flower-decoration"></div>
              <div className="flower-decoration"></div>
              <div className="flower-decoration"></div>
              <div className="flower-decoration"></div>
              <img 
                src="https://res.cloudinary.com/duqllfqxd/image/upload/v1739274920/about_p50wfw.jpg" 
                alt="Featured dessert" 
              />
            </div>
          </div>

          <div className="about-right">
            <h2>Our Features</h2>
            <p className="main-text">
              We don't just bake treats—we create personalized experiences 
              that bring joy to every celebration and special moment.
            </p>
            <ul className="features-list">
              <li>Wholesome & Pure</li>
              <li>Custom Hampers</li>
              <li>Drool-Worthy Aesthetics</li>
            </ul>
            <button className="learn-more pink">Learn More</button>
          </div>
        </div>
      </section>

      {/* Subtle transition with rain */}
      <div className="section-transition">
        <div className="rain-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="raindrop" />
          ))}
        </div>
      </div>

      {/* Chefs Section */}
      <section className="chefs-section">
        <div className="about-rain-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="about-raindrop" />
          ))}
        </div>
        <div className="section-header">
          <h1 className="section-title">
            Experienced & Most
            <br />
            Famous Chefs
          </h1>
        </div>

        <div className="about-chefs-carousel relative overflow-x-auto hide-scrollbar">
          <div 
            className="chefs-track inline-flex gap-6 px-4"
            style={{ 
              minWidth: 'min-content',
              scrollBehavior: 'smooth'
            }}
          >
            {chefs.map((chef, index) => (
              <div key={index} className="chef-card">
                <div className="chef-image-container relative rounded-2xl overflow-hidden mb-4 border-2 border-pink-300">
                  <img 
                    src={chef.image} 
                    alt={chef.name} 
                    className="w-full h-[240px] object-cover"
                  />
                </div>
                <div className="text-center px-3">
                  <h3 className="text-lg font-serif text-gray-800 mb-1">{chef.name}</h3>
                  <p className="text-xs font-medium text-pink-600">{chef.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="review-section bg-gradient-to-br from-pink-50 to-pink-100 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pink-700 mb-3">Share Your Experience</h2>
            <p className="text-pink-500">We'd love to hear about your sweet moments with us!</p>
          </div>
          
          <div className="review-form-container p-8">
            <CreateReview />
          </div>
        </div>
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

export default About;

