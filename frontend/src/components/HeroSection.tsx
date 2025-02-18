import React, { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
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

  const baseVideoSize = 1000;
  const videoSize = baseVideoSize - (scrollPosition * 400);
  const videoTranslateX = -35 + (scrollPosition * 135);
  const videoTranslateY = 40 - (scrollPosition * 40);

  // Calculate final positions
  const finalVideoPosition: React.CSSProperties = {
    position: 'absolute',
    width: `${baseVideoSize - 400}px`,
    height: `${baseVideoSize - 400}px`,
    transform: 'translate(100%, 0%)',
    left: '0%',
    top: '150vh',
    marginTop: `-${(baseVideoSize - 400)/2}px`,
    overflow: 'hidden',
    borderRadius: '50%',
    zIndex: 30,
  };


  // Add scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-pink-600" style={{ height: '200vh' }} />

      {/* First Page */}
      <section className="h-screen relative">
        {/* Navigation Bar */}
        <nav className="fixed top-0 w-full z-50 bg-pink-700">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <a 
                href="/" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
              >
                <img 
                  src="https://res.cloudinary.com/dgtxyhdwa/image/upload/v1739618267/logo_kssytz.png" 
                  alt="Bindi's" 
                  className="h-8 object-contain cursor-pointer" 
                />
              </a>
            </div>
            <div className="flex items-center gap-8">
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

        {/* Center Text - moved to higher z-index */}
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="text-center">
            <h1 className="text-[20vw] font-bold text-pink-100/90 leading-none tracking-tighter">
              BINDI'S
            </h1>
            <h2 className="text-[10vw] font-bold text-pink-100/60 leading-none tracking-tighter -mt-8">
              CUPCAKERY
            </h2>
          </div>
        </div>

        {/* Right Side Text - moved to higher z-index and lower position */}
        <div className="absolute right-12 bottom-32 text-right z-40">
          <h2 className="text-3xl font-bold text-pink-100 italic mb-2">
            No. 1 Bakery
          </h2>
          <h2 className="text-3xl font-bold text-pink-100 italic mb-2">
            in Surat
          </h2>
          <p className="text-pink-100 text-lg mt-4">
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
        >
          <div className="space-y-8">
            <h3 className="text-6xl font-bold text-pink-100 mb-12">
              Our Promises
            </h3>
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-4xl font-bold text-pink-100">✦ 100% Handmade</p>
                <p className="text-xl text-pink-100/80 pl-6">
                  Every item crafted with love and care by our expert bakers
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-pink-100">✦ Pure Vegetarian</p>
                <p className="text-xl text-pink-100/80 pl-6">
                  Committed to serving 100% vegetarian delights for everyone
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-pink-100">✦ No Preservatives</p>
                <p className="text-xl text-pink-100/80 pl-6">
                  Fresh, natural ingredients for the authentic taste you deserve
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
        >
          <button className="px-10 py-5 bg-pink-100 text-pink-600 rounded-full text-2xl font-bold hover:bg-pink-200 transition-colors">
            Order Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;