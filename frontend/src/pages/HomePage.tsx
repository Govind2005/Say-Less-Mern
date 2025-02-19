import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import '../App.css';
import About from '../components/About.tsx';
import Gallery from '../components/Gallery.tsx';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

import ScrollReveal from 'scrollreveal';
import HeroSection from '../components/HeroSection.tsx';
import HamperSection from '../components/HamperSection.tsx';
import Services from '../components/Services.tsx';

function HomePage() {
 
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  
  
  
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  
  
  
  

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


  // Auto-advance slides every 5 seconds
  

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
    <div className="relative min-h-screen">
      
      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section - lowest z-index */}
            <div className="relative" style={{ zIndex: 0 }}>
              <HeroSection/>
            </div>

            {/* Gallery Section - higher z-index */}
            <section className="gallery-section relative" 
              style={{ 
                background: "rgb(259, 0, 117)",
                zIndex: 1,
                position: 'relative'
              }}>
              <h2 className="text-center text-[90px] font-bold text-pink-200 tracking-wide my-8">
Our Delicacies!
</h2>


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
                    <div className="flex flex-col md:flex-row gap-8 items-center p-6 bg-pink-700/80 backdrop-blur-sm rounded-2xl">
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
                            navigate('/menu');
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

            {/* Hamper Section - higher z-index */}
            <div className="relative" style={{ zIndex: 1 }}>
              <HamperSection/>
            </div>

            {/* Services Section - higher z-index */}
            <div className="relative" style={{ zIndex: 1 }}>
              <Services/>
            </div>
      

            {/* Reviews Section - higher z-index */}
            <section className="reviews-section relative bg-gradient-to-br from-pink-500 to-pink-100 py-300" 
              style={{ zIndex: 1 }}>
              <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-pink-700 mb-12">What Our Customers Say</h2>
                
                <div className="bg-pink-200 rounded-2xl shadow-lg p-8">
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

      {/* Footer - Update z-index and positioning */}
      <footer className="w-full bg-[#FF4D8D] text-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Logo Section */}
          <div className="flex justify-center mb-16">
            <div className="w-[200px] bg-[#FFE0E9] p-4 rounded-lg">
              <img 
                src="https://res.cloudinary.com/dgtxyhdwa/image/upload/v1739618267/logo_kssytz.png" 
                alt="Bindi's Cupcakery"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Get In Touch */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6 relative inline-block">
                Get In Touch
                <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-white"></div>
              </h3>
              <p>Parle Point, Surat, Gujarat</p>
              <p>8849130189 - 9978677790</p>
            </div>

            {/* Opening Hours */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6 relative inline-block">
                Opening Hours
                <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-white"></div>
              </h3>
              <p>Mon – Sat, 11AM – 7PM</p>
              <p>Sunday: Closed</p>
            </div>

            {/* Follow Us */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6 relative inline-block">
                Follow Us
                <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-white"></div>
              </h3>
              <div className="flex justify-center gap-6">
                <a href="#" className="hover:text-pink-200 transition-colors text-xl">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-pink-200 transition-colors text-xl">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-pink-200 transition-colors text-xl">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-16 pt-8 border-t border-pink-400">
            <p>© Domain. All Rights Reserved. Designed by Bindi's Cupcakery</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button - Update z-index */}
      <button 
        className="scroll-to-top"
        style={{ zIndex: 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  )
}

export default HomePage
