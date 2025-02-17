import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';



const SweetCravingText = () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = window.innerHeight * 0.9; // Relative to viewport height
      const fadeEnd = window.innerHeight * 1.1;

      let newOpacity = 0;
      if (scrollY > fadeStart) {
        newOpacity = Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }

      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed z-10 text-center"
      style={{
        top: '40%',
        right: '5%',
        opacity: opacity,
        transition: 'color 0.5s ease, opacity 0.5s ease',
      }}
    >
      <div className="flex flex-col gap-2">
        <span className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">CRAVING</span>
        <span className="text-pink-500 font-bold text-2xl md:text-3xl lg:text-4xl">
          SOMETHING <br />SWEET?
        </span>
        <span className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">WE'VE</span>
        <span className="text-pink-500 font-bold text-2xl md:text-3xl lg:text-4xl">GOT YOU.</span>
      </div>
    </div>
  );
};

const ButWhyUs = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = window.innerHeight * 1.2;
      const fadeEnd = window.innerHeight * 1.4;

      let newOpacity = 1;
      if (scrollY > fadeStart) {
        newOpacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }

      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed z-10 w-full px-4 md:px-8 lg:px-12"
      style={{
        top: '30%',
        opacity: opacity,
        transition: 'opacity 0.5s ease',
        animation: 'fadeIn 1s ease-in-out',
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex gap-2 mb-4">
          <span className="text-green-300 font-bold text-2xl md:text-3xl lg:text-4xl">BUT</span>
          <span className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">WHY US?</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <img 
            src="/handmade.jpg" 
            alt="Reason 1" 
            className="w-48 md:w-64 lg:w-72 rounded-full object-cover"
          />
          <img 
            src="/nopre.jpg" 
            alt="Reason 2" 
            className="w-48 md:w-64 lg:w-72 rounded-full object-cover"
          />
          <img 
            src="/veg2.png" 
            alt="Reason 3" 
            className="w-48 md:w-64 lg:w-72 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const AnimatedCircle = () => {
  const [circleStyle, setCircleStyle] = useState({
    transform: 'translate(0, 0) scale(3)',
  });
  const [circleTextVisible, setCircleTextVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
   const isNavbarVisible = useScrollDirection();
  

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const translateX = Math.min(scrollY * 0.4, viewportWidth / 2);
      const translateY = Math.min(scrollY * 0.35, viewportHeight / 2);
      const scale = Math.max(
        4 - scrollY * (isMobile ? 0.02 : 0.015),
        isMobile ? 1.2 : 1.5
      );

      setCircleStyle({
        transform: `translate(${translateX}px, ${-translateY}px) scale(${scale})`,
      });

      setCircleTextVisible(scrollY > viewportHeight * 0.6);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <>
       <nav className={`navbar ${!isNavbarVisible ? 'hidden' : ''}`}>
        <div className="nav-links">
          <Link to="/admin" className={location.pathname === "/" ? "active" : ""}>Admin</Link>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
          <div className="logo-container cursor-pointer">
          <Link to="/" >
            <img src="https://res.cloudinary.com/dgtxyhdwa/image/upload/v1739618267/logo_kssytz.png" alt="logo" />
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

      <div
        className="relative bg-cover bg-center"
        style={{
          height: '300vh',
          backgroundImage: 'url("/224.jpg")',
          backgroundAttachment: 'scroll',
        }}
      >
        <div
          className="fixed rounded-full bg-white flex items-center justify-center text-center z-10"
          style={{
            bottom: isMobile ? '-120px' : '-240px',
            left: isMobile ? '-200px' : '-400px',
            width: isMobile ? '200px' : '302px',
            height: isMobile ? '200px' : '302px',
            transition: 'transform 0.2s ease-out, opacity 0.5s ease',
            ...circleStyle,
          }}
        >
          {circleTextVisible && (
            <div
              className="relative z-20 transition-opacity duration-1000"
              style={{ opacity: circleTextVisible ? 1 : 0 }}
            >
              <Link 
                to="/menuitems" 
                className="font-bold text-black no-underline text-base md:text-lg lg:text-xl"
              >
                VIEW <br />
                OUR MENU <br />
                HERE
              </Link>
            </div>
          )}
        </div>

        <ButWhyUs />
        <SweetCravingText />

        <div className="h-[200vh]"></div>
      </div>
        
    </>
  );
};

export default AnimatedCircle;