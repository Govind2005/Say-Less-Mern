import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import '../App.css';
import About from '../components/About.tsx';
import Gallery from '../components/Gallery.tsx';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useScrollDirection } from '../hooks/useScrollDirection';
import ScrollReveal from 'scrollreveal';
import HeroSection from '../components/HeroSection.tsx';
import HamperSection from '../components/HamperSection.tsx';
import Services from '../components/Services.tsx';

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentChefIndex, setCurrentChefIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showPromo, setShowPromo] = useState(true);
  
  const isNavbarVisible = useScrollDirection();
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  
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
      description: 'Indulge in rich, moist treats—100% Eggless and delicious for pure guilt-free indulgence!'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275046/Brownie_5_ujeowd.jpg',
      title: 'Variety Assured',
      description: 'From Fudgy Brownies to Creamy Ice Creams, discover flavors for every craving!'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275046/Brownie_2_gzgbwa.jpg',
      title: 'Handcrafted Love',
      description: 'Every treat is made in small batches with precision and finest ingredients for homemade goodness!'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739275047/Brownie_Tub_3_m11kmr.jpg',
      title: 'Quality Maintain',
      description: 'Using only the finest ingredients, ensuring 100% eggless and preservative-free desserts.'
    },
    {
      image: 'https://res.cloudinary.com/duqllfqxd/image/upload/v1739242354/cld-sample-4.jpg',
      title: 'Custom Orders',
      description: 'Personalized desserts for your special occasions, making your sweet dreams come true!'
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
      title: 'Top Favorite',
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

  const [reviews, setReviews] = useState<{ _id: string; comment: string; name: string; star: number; visible: boolean, imageUrl: string }[]>([]);
  // Fetch reviews from the API
  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/review');
      
      if (response.ok) {
        const data = await response.json();

        // Add random image to each review
        const reviewsWithImages = data.data.map((review: any) => ({
          ...review,
          imageUrl: generateRandomImage() // Add the random image URL to each review
        }));

        setReviews(reviewsWithImages); // Set reviews with images
      } else {
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchReviews(); // Fetch reviews when the component is mounted

    // Set up an interval to change the current review every 5 seconds
    const reviewTimer = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length); // Cycle through the reviews
    }, 5000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(reviewTimer);
  }, [reviews.length]);

  const generateRandomImage = () => {
    // Lorem Picsum with a random image based on the current time (or you can use a random number)
    const randomId = Math.floor(Math.random() * 1000); // Generate a random number for unique image
    return `https://picsum.photos/200/300?random=${randomId}`;
  };

  // Function to render stars 
  const renderStars = (starCount: number) => {
    return Array.from({ length: starCount }, (_, index) => (
      <span key={index} className="text-yellow-500">⭐</span> // Display golden star
    ));
  };


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

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // 5000ms = 5 seconds

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);


  // Add ScrollReveal initialization
  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '60px',
      duration: 1200,
      delay: 300,
      reset: false
    });

    // Hero Section
    sr.reveal('.hero-content', {
      origin: 'top',
      delay: 400
    });

    // Services Section
    sr.reveal('.services-section .section-title', {
      delay: 300
    });
    sr.reveal('.services-carousel', {
      delay: 500
    });

    // About Section
    sr.reveal('.about-section .section-title', {
      delay: 300
    });
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

    // Gallery Section
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

    // Gallery Image Dialog
    sr.reveal('.image-dialog', {
      origin: 'center',
      distance: '0px',
      duration: 800,
      scale: 0.8,
      opacity: 0
    });

    // Products Section
    sr.reveal('.products-section .section-title', {
      delay: 300
    });
    sr.reveal('.products-carousel', {
      delay: 500
    });

    // Chefs Section
    sr.reveal('.chefs-section .section-title', {
      delay: 300
    });
    sr.reveal('.chefs-carousel', {
      delay: 500
    });

    // Reviews Section
    sr.reveal('.reviews-section h2', {
      delay: 300
    });
    sr.reveal('.reviews-container', {
      delay: 500
    });

    // Footer
    sr.reveal('.footer-content', {
      delay: 300,
      origin: 'bottom'
    });

    return () => sr.destroy();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePromo = () => {
    setShowPromo(false);
  };

  // Update the useEffect hook with faster scroll speed
  useEffect(() => {
    const servicesCarousel = document.querySelector('.services-carousel');
    
    if (servicesCarousel) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        
        // Increase scroll speed by using a larger multiplier (changed from 0.5 to 1.5)
        const scrollAmount = e.deltaY * 1.5;
        
        servicesCarousel.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      };

      servicesCarousel.addEventListener('wheel', handleWheel as EventListener);
      
      return () => {
        servicesCarousel.removeEventListener('wheel', handleWheel as EventListener);
      };
    }
  }, []);

  // Add these useEffect hooks after the existing services scroll hook
  useEffect(() => {
    const productsCarousel = document.querySelector('.products-carousel');
    
    if (productsCarousel) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const scrollAmount = e.deltaY * 1.5;
        
        productsCarousel.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      };

      productsCarousel.addEventListener('wheel', handleWheel as EventListener);
      
      return () => {
        productsCarousel.removeEventListener('wheel', handleWheel as EventListener);
      };
    }
  }, []);

  useEffect(() => {
    const chefsCarousel = document.querySelector('.chefs-carousel');
    
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

  return (
    <div className="app">
      {/* Promotional Popup */}
      {/* {showPromo && (
        <div className="promo-overlay" onClick={handleClosePromo}>
          <div className="promo-popup" onClick={(e) => e.stopPropagation()}>
            <button 
              className="promo-close" 
              onClick={handleClosePromo}
            >
              ×
            </button>
            <div className="promo-content">
              <h2>Special Offer!</h2>
              <p className="promo-highlight">Get 20% OFF on Your First Order</p>
              <p>Use code: <span className="promo-code">WELCOME20</span></p>
              <button 
                className="promo-button"
                onClick={handleClosePromo}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )} */}


      {/* Navigation Bar */}
      {/* <nav className={`navbar ${!isNavbarVisible ? 'hidden' : ''}`}>
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
      </nav> */}
      
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection/>

            {/* Custom Hampers Section */}
            <HamperSection/>

            {/* Services Section */}
            <Services/>

            {/* Chefs */}

            {/* Gallery Section */}
            <section className="gallery-section">
              <h2 className="gallery-title">Our Delicacies!</h2>
              <div className="gallery-grid">
                {galleryImages.map((image, index) => (
                  <div 
                    key={index} 
                    className="gallery-item"
                    onClick={() => setSelectedImage(image)}
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

              {selectedImage && (
                <div 
                  className="image-dialog-overlay" 
                  onClick={() => setSelectedImage(null)}
                >
                  <div className="image-dialog" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col md:flex-row gap-8 items-center p-6 bg-pink-300/80 backdrop-blur-sm rounded-2xl">
                      <img 
                        src={selectedImage} 
                        alt="Selected gallery image" 
                        className="max-w-md rounded-lg shadow-lg"
                      />
                      <div className="flex flex-col items-center gap-4">
                        <h3 className="text-2xl font-semibold text-white">Delicious Treat</h3>
                        <p className="text-white text-center font-medium">
                          Indulge in our handcrafted delicacies made with love and premium ingredients.
                        </p>
                        <button 
                          onClick={() => {
                            setSelectedImage(null);
                            navigate('/menuitems');
                          }}
                          className="px-6 py-3 bg-white/20 text-white rounded-full
                            hover:bg-white/30 transform hover:scale-105 transition-all duration-300
                            border border-white/50 shadow-lg flex items-center gap-2 font-medium"
                        >
                          <span>Order Now</span>
                          <span>→</span>
                        </button>
                      </div>
                      <button 
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                          bg-white/20 rounded-full text-white hover:bg-white/30
                          transition-colors duration-300 border border-white/50"
                        onClick={() => setSelectedImage(null)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

        

            {/* Add rain transition between products and chefs sections */}
            <div className="section-transition">
              <div className="rain-container">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="raindrop" />
                ))}
              </div>
            </div>

            {/* Chefs Section */}
            {/* <section className="chefs-section">
              <div className="section-header">
                <h1 className="section-title">
                  Experienced & Most
                  <br />
                  Famous Chefs
                </h1>
              </div>

              <div className="chefs-carousel relative overflow-x-auto hide-scrollbar">
                <div 
                  className="chefs-track inline-flex gap-6 px-4"
                  style={{ 
                    minWidth: 'min-content',
                    scrollBehavior: 'smooth'
                  }}
                >
                  {chefs.map((chef, index) => (
                    <div key={index} className="chef-card">
                      <div className="relative rounded-2xl overflow-hidden mb-4 border-2 border-pink-300">
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
            </section> */}

            {/* Reviews Section */}
            <section className="reviews-section bg-gradient-to-br from-pink-50 to-pink-100 py-16">
              <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-pink-700 mb-12">What Our Customers Say</h2>
                
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  {reviews.map((review, index) => (
                    <div
                      key={review._id}
                      className={`review-slide ${index === currentReviewIndex ? 'block' : 'hidden'}`}
                    >
                      <div className="max-w-2xl mx-auto text-center">
                        <p className="text-gray-600 italic text-lg leading-relaxed mb-8">
                          "{review.comment}"
                        </p>
                        
                        <div className="mt-8">
                          <img
                            alt={review.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-pink-200 mx-auto mb-4"
                            src={review.imageUrl}
                          />
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{review.name}</h3>
                          <div className="flex justify-center gap-1">
                            {renderStars(review.star)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-2 mt-8">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300
                        ${index === currentReviewIndex 
                          ? 'bg-pink-500 w-4' 
                          : 'bg-pink-200 hover:bg-pink-300'}`}
                      onClick={() => setCurrentReviewIndex(index)}
                    />
                  ))}
                </div>
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
