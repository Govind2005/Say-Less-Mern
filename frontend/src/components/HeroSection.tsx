import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const secondPageRef = useRef<HTMLElement | null>(null);

  

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && secondPageRef.current) {
        const position = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Check if we've reached the second page
        if (position >= viewportHeight) {
          setIsLocked(true);
          setScrollPosition(1);
          // Once we reach second page, prevent further updates
          return;
        }

        setIsLocked(false);
        const progress = position / viewportHeight;
        setScrollPosition(progress);
        
        if (videoRef.current) {
          const targetTime = Math.min(progress * 2, 2);
          if (Math.abs(videoRef.current.currentTime - targetTime) > 0.01) {
            videoRef.current.currentTime = targetTime;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseVideoSize = window.innerWidth < 768 ? 300 : 1000; // Smaller base size for mobile
  const videoSize = baseVideoSize - (scrollPosition * (window.innerWidth < 768 ? 100 : 400));
  const videoTranslateX = window.innerWidth < 768 
    ? -25 + (scrollPosition * 125) 
    : -35 + (scrollPosition * 135);
  const videoTranslateY = window.innerWidth < 768
    ? 20 - (scrollPosition * 20)
    : 40 - (scrollPosition * 40);

  // Adjust final video position for mobile
  const finalVideoPosition: React.CSSProperties = {
    position: 'absolute',
    width: `${window.innerWidth < 768 ? baseVideoSize - 100 : baseVideoSize - 400}px`,
    height: `${window.innerWidth < 768 ? baseVideoSize - 100 : baseVideoSize - 400}px`,
    transform: window.innerWidth < 768 ? 'translate(50%, 0%)' : 'translate(100%, 0%)',
    left: window.innerWidth < 768 ? '25%' : '0%',
    top: '150vh',
    marginTop: `-${(window.innerWidth < 768 ? baseVideoSize - 100 : baseVideoSize - 400)/2}px`,
    overflow: 'hidden',
    borderRadius: '50%',
    zIndex: 30,
  };


  // Add scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add navigation handler
  const handleOrderClick = () => {
    navigate('/menu');
  };

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-pink-600" style={{ height: '200vh' }} />

      {/* First Page */}
      <section className="h-screen relative">
        {/* Navigation Bar */}
        <nav className="fixed top-0 w-full z-50 bg-pink-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <a href="/" onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}>
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

        {/* Video Circle */}
        <div 
          style={isLocked ? finalVideoPosition : {
            position: 'fixed',
            width: `${videoSize}px`,
            height: `${videoSize}px`,
            transform: `translate(${videoTranslateX}%, ${videoTranslateY}%)`,
            left: '0%',
            top: '50%',
            marginTop: `-${videoSize/2}px`,
            transition: 'all 0.3s ease-out',
            overflow: 'hidden',
            borderRadius: '50%',
            zIndex: 30
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
          >
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="text-center px-4">
            <h1 className="text-[15vw] md:text-[20vw] font-bold text-pink-100/90 leading-none tracking-tighter">
              BINDI'S
            </h1>
            <h2 className="text-[8vw] md:text-[10vw] font-bold text-pink-100/60 leading-none tracking-tighter -mt-4 md:-mt-8">
              CUPCAKERY
            </h2>
          </div>
        </div>

        {/* Right Side Text */}
        <div className="absolute right-4 sm:right-12 bottom-16 sm:bottom-32 text-right z-40">
          <h2 className="text-xl sm:text-3xl font-bold text-pink-100 italic mb-2">
            No. 1 Bakery
          </h2>
          <h2 className="text-xl sm:text-3xl font-bold text-pink-100 italic mb-2">
            in Surat
          </h2>
          <p className="text-pink-100 text-sm sm:text-lg mt-4 max-w-[250px] sm:max-w-none">
            Flavours that have convinced more than 8 million
          </p>
        </div>
      </section>

      {/* Second Page */}
      <section ref={secondPageRef} className="h-screen relative">
        {/* Upper Left Text */}
        <div 
          style={isLocked ? {
            position: 'absolute',
            top: 'calc(50vh - 165px)',
            left: '16px',
            opacity: 1,
            zIndex: 50,
            transform: 'none',
            transition: 'all 0.8s ease-out'
          } : {
            position: 'fixed',
            top: '25%',
            left: '16px',
            opacity: Math.max(0, (scrollPosition - 0.5) * 2),
            transform: `translateY(${Math.min(0, (1 - scrollPosition) * 50)}px)`,
            zIndex: 50,
            visibility: scrollPosition > 0.5 ? 'visible' : 'hidden',
            transition: 'all 0.8s ease-out'
          }}
          className="px-4 sm:px-0"
        >
          <div className="space-y-4 sm:space-y-8">
            <h3 className="text-4xl sm:text-6xl font-bold text-pink-100 mb-6 sm:mb-12">
              Our Promises
            </h3>
            <div className="space-y-4 sm:space-y-8">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-2xl sm:text-4xl font-bold text-pink-100">✦ 100% Handmade</p>
                <p className="text-base sm:text-xl text-pink-100/80 pl-6">
                  Every item crafted with love and care
                </p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-2xl sm:text-4xl font-bold text-pink-100">✦ Pure Vegetarian</p>
                <p className="text-base sm:text-xl text-pink-100/80 pl-6">
                  100% vegetarian delights for everyone
                </p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-2xl sm:text-4xl font-bold text-pink-100">✦ No Preservatives</p>
                <p className="text-base sm:text-xl text-pink-100/80 pl-6">
                  Fresh, natural ingredients only
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right Button */}
        <div 
          style={isLocked ? {
            position: 'absolute',
            top: 'calc(50vh + 210px)',
            right: '16px',
            opacity: 1,
            zIndex: 50,
            transform: 'none',
            transition: 'all 0.8s ease-out'
          } : {
            position: 'fixed',
            bottom: '25%',
            right: '16px',
            opacity: Math.max(0, (scrollPosition - 0.5) * 2),
            transform: `translateY(${Math.min(0, (1 - scrollPosition) * 50)}px)`,
            zIndex: 50,
            visibility: scrollPosition > 0.5 ? 'visible' : 'hidden',
            transition: 'all 0.8s ease-out'
          }}
          className="px-4 sm:px-0"
        >
          <button 
            onClick={handleOrderClick}
            className="px-6 sm:px-10 py-3 sm:py-5 bg-pink-100 text-pink-600 rounded-full text-xl sm:text-2xl font-bold hover:bg-pink-200 transition-colors cursor-pointer"
          >
            Order Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;