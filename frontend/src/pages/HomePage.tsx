import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import '../App.css';
import About from '../components/About.tsx';
import Gallery from '../components/Gallery.tsx';

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentChefIndex, setCurrentChefIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  
  const slides = [
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274843/testbg_c1xggo.jpg',
      tagline: 'BAKED WITH LOVE',
      heading: 'Melt-in-Your-Mouth\nMagic!'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274842/donuts_4_f92ywv.jpg',
      tagline: '100% EGGLESS, 100% DELICIOUS',
      heading: 'From Our Kitchen\nto Your Heart!'
    }
  ];

  const services = [
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275127/Cupcakee_bqaymf.jpg',
      title: 'Eggless Delight',
      description: 'Indulge in Rich, Moist, and Flavorful treats—100% Eggless, 100% Delicious, and crafted for Pure guilt-free indulgence in every bite!'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275046/Brownie_5_ujeowd.jpg',
      title: 'Variety Assured',
      description: 'From Fudgy Brownies to Creamy Ice Creams and Cakes, discover endless Flavors and Treats made for every Sweet Craving!'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275046/Brownie_2_gzgbwa.jpg',
      title: 'Handcrafted Love',
      description: 'Every Treat is made in small batches with Precision, and the Finest ingredients, ensuring Homemade Goodness in every bite!'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275047/Brownie_Tub_3_m11kmr.jpg',
      title: 'Quality Maintain',
      description: 'At Bindi\'s Cupcakery, we USE ONLY THE FINEST INGREDIENTS, ensuring our desserts are 100% EGGLESS, PRESERVATIVE-FREE, AND FRESHLY MADE.'
    }
  ];

  const products = [
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274475/111_rtm1vj.jpg',
      title: 'Top Seller',
      name: 'Blueberry Cupcake'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274473/222_u7w8gn.jpg',
      title: 'Customer Favorite',
      name: 'Chocolate Donut'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274473/333_i0ae0e.jpg',
      title: 'Most Loved',
      name: 'Raspberry Cupcake'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274474/444_oapcps.jpg',
      title: 'Trending Now',
      name: 'Chocolate Cupcake'
    }
  ];

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

  const galleryImages = [
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274475/111_rtm1vj.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274473/222_u7w8gn.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274473/333_i0ae0e.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274474/444_oapcps.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274480/555_bsghyy.jpg',
    'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274480/666_hjsal2.jpg'
  ];

  const reviews = [
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275366/c1_y5cgxh.jpg',
      name: 'Joey',
      text: "The best eggless desserts I've ever had! Rich, creamy ice creams and perfectly baked brownies—pure indulgence without any compromise on taste! The attention to detail in presentation and the quality of ingredients used is remarkable. Every bite feels like a celebration!"
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739378349/barney-stinson_mpw5h8.jpg',
      name: 'Barney',
      text: "These desserts are legen... wait for it... DARY! LEGENDARY! The cakes are perfect for any occasion, and the service is absolutely incredible. Their custom hampers were a huge hit at our corporate event. The presentation was stunning and the taste was out of this world!"
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739378504/qle684dh_ppykj6.png',
      name: 'Ross',
      text: "Found my go-to bakery! Their attention to detail and commitment to quality is outstanding. Every bite is pure happiness! I especially love their seasonal specials and how they incorporate local flavors. The eggless options are so good that even my non-vegetarian friends can't tell the difference!"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextService = () => {
    setCurrentServiceIndex((prev) => 
      prev === services.length - 3 ? 0 : prev + 1
    );
  };

  const prevService = () => {
    setCurrentServiceIndex((prev) => 
      prev === 0 ? services.length - 3 : prev - 1
    );
  };

  const nextProduct = () => {
    setCurrentProductIndex((prev) => 
      prev === products.length - 3 ? 0 : prev + 1
    );
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) => 
      prev === 0 ? products.length - 3 : prev - 1
    );
  };

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

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // 5000ms = 5 seconds

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
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

      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section with Pagination */}
            <div className="slider">
              {slides.map((slide, index) => (
                <img 
                  key={index}
                  src={slide.image} 
                  alt={`slide-${index}`} 
                  className={`hero-image ${index === currentSlide ? 'active' : ''}`}
                />
              ))}
              
              <button className="arrow-btn prev" onClick={prevSlide}>
                <span>&#8249;</span>
              </button>
              <button className="arrow-btn next" onClick={nextSlide}>
                <span>&#8250;</span>
              </button>

              <section className="hero">
                <div className={`hero-content ${currentSlide === 1 ? 'slide-in' : ''}`}>
                  <h2>{slides[currentSlide].tagline}</h2>
                  <h1>{slides[currentSlide].heading.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i === 0 && <br />}
                    </span>
                  ))}</h1>
                  <button className="learn-more">Learn More</button>
                </div>
              </section>
            </div>

            {/* About Section */}
            <section className="about-section">
              <h1 className="section-title">Where Flavor Meets Love!</h1>
              <div className="about-content">
                <div className="about-left">
                  <h2>Why Us?</h2>
                  <p className="main-text">
                    We create Experiences! Every dessert is Handcrafted with love, 
                    using 100% VEGETERIAN, EGGLESS, and Preservative-FREE Ingredients.
                  </p>
                  <p className="sub-text">
                    From Rich, Fudgy Brownies to Melt-in-your-Mouth Cupcakes and 
                    Handcrafted Ice Creams, Every Bite is packed with FLAVOR, 
                    FRESHNESS, and LOVE
                  </p>
                  <button className="learn-more light">Learn More</button>
                </div>

                <div className="about-center">
                  <img 
                    src="https://res.cloudinary.com/duqllfqxd/image/upload/v1739274920/about_p50wfw.jpg" 
                    alt="Featured dessert" 
                  />
                </div>

                <div className="about-right">
                  <h2>Our Features</h2>
                  <p className="main-text">
                    We don't just bake treats—we create personalized experiences. 
                    From custom dessert hampers for special occasions to seasonal 
                    delicacies that capture the flavors of the moment, there's always 
                    something delightful to discover.
                  </p>
                  <ul className="features-list">
                    <li>✓ Wholesome & Pure</li>
                    <li>✓ Custom Hampers</li>
                    <li>✓ Drool-Worthy Aesthetics</li>
                  </ul>
                  <button className="learn-more pink">Learn More</button>
                </div>
              </div>
            </section>

            {/* Custom Hampers Section */}
            <section className="hampers-section">
              <div className="hampers-content">
                <div className="hampers-image" onClick={() => window.open('https://www.youtube.com/watch?v=YOUR_VIDEO_ID', '_blank')}>
                  <img 
                    src="https://res.cloudinary.com/duqllfqxd/image/upload/v1739274987/Truffle_Balls_b5qsk5.jpg" 
                    alt="Custom Hampers" 
                  />
                  <div className="play-button">
                    <span>▶</span>
                  </div>
                </div>
                <div className="hampers-text">
                  <h2>Custom Hampers</h2>
                  <p>
                    Celebrate every occasion with a touch of sweetness! Our CUSTOM 
                    DESSERT HAMPERS are designed to make your special moments 
                    even more delightful—whether it's a birthday, wedding, or festive 
                    gathering. Because the best memories are made with LOVE, 
                    LAUGHTER, AND A BOX FULL OF SWEETNESS!
                  </p>
                  
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
              <div className="section-header">
                <h1 className="section-title">
                  Best Services We Provide
                  <br />
                  For Our Clients
                </h1>
                <div className="carousel-buttons">
                  <button className="carousel-btn prev" onClick={prevService}>
                    <span>&#8249;</span>
                  </button>
                  <button className="carousel-btn next" onClick={nextService}>
                    <span>&#8250;</span>
                  </button>
                </div>
              </div>

              <div className="services-carousel">
                <div 
                  className="services-track" 
                  style={{ 
                    transform: `translateX(-${currentServiceIndex * (28 + 3)}%)`,
                    transition: 'transform 0.5s ease-in-out'
                  }}
                >
                  {services.map((service, index) => (
                    <div key={index} className="service-card">
                      <div className="service-image-container">
                        <img src={service.image} alt={service.title} />
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section className="gallery-section">
              <h2>Our Delicacies!</h2>
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

            {/* Products Section - Moved below gallery */}
            <section className="products-section">
              <div className="section-header">
                <h1 className="section-title">
                  Delicious Cup Cakes Made
                  <br />
                  With Love!
                </h1>
                <div className="carousel-buttons">
                  <button className="carousel-btn prev" onClick={prevProduct}>
                    <span>&#8249;</span>
                  </button>
                  <button className="carousel-btn next" onClick={nextProduct}>
                    <span>&#8250;</span>
                  </button>
                </div>
              </div>

              <div className="products-carousel">
                <div 
                  className="products-track" 
                  style={{ 
                    transform: `translateX(-${currentProductIndex * (28 + 3)}%)`,
                    transition: 'transform 0.5s ease-in-out'
                  }}
                >
                  {products.map((product, index) => (
                    <div key={index} className="product-card">
                      <div className="product-image-container">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <h3>{product.title}</h3>
                      <p>{product.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Chefs Section */}
            <section className="chefs-section">
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

            <section className="reviews-section">
              <h2>Clients Say About Our<br />Famous Delicacies</h2>
              <div className="reviews-container">
                {reviews.map((review, index) => (
                  <div 
                    key={index} 
                    className={`review-card ${currentReviewIndex === index ? 'active' : ''}`}
                  >
                    <div className="review-content">
                      <p className="review-text">{review.text}</p>
                      <div className="reviewer-info">
                        <img src={review.image} alt={review.name} className="reviewer-image" />
                        <h4 className="reviewer-name">{review.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="review-pagination">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    className={`pagination-dot ${currentReviewIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentReviewIndex(index)}
                  />
                ))}
              </div>
            </section>
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="https://res.cloudinary.com/duqllfqxd/image/upload/v1739274748/logo_pzf5wc.png" alt="Bindi's Cupcakery" />
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
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p><span>© Domain</span>. All Rights Reserved. Designed by Bindi's Cupcakery</p>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button 
        className="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  )
}

export default HomePage
