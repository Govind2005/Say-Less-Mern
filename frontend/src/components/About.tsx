import { useState, useEffect } from 'react';
import './About.css';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import ScrollReveal from 'scrollreveal'
import CreateReview from './AddReview';

function About() {
  const [currentChefIndex, setCurrentChefIndex] = useState(0);

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
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-40 bg-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" >
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
          <div className="carousel-buttons">
            <button className="carousel-btn prev" onClick={prevChef}>
              <span>&#8249;</span>
            </button>
            <button className="carousel-btn next" onClick={nextChef}>
              <span>&#8250;</span>
            </button>
          </div>
        </div>

        <div className="chefs-carousel">
          <div 
            className="chefs-track" 
            style={{ 
              transform: `translateX(-${currentChefIndex * (28 + 3)}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {chefs.map((chef, index) => (
              <div key={index} className="chef-card">
                <div className="chef-image-container">
                  <img src={chef.image} alt={chef.name} />
                  <div className="chef-overlay"></div>
                </div>
                <h3>{chef.name}</h3>
                <p>{chef.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CreateReview/>

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

export default About;