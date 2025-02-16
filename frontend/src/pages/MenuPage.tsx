import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';


const SweetCravingText = () => {
  const [opacity, setOpacity] = useState(1);
  const [showNewText, setShowNewText] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 700;
      const fadeEnd = 900;

      let newOpacity = 1;
      if (scrollY > fadeStart) {
        newOpacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }

      setOpacity(newOpacity);
      setShowNewText(scrollY > fadeEnd + 50); // Show new text after old text fades out
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '30%',
          right: '5%',
          color: 'pink',
          fontFamily: '"Bodoni Moda", serif',
          fontSize: '4rem',
          zIndex: 3,
          transition: 'color 0.5s ease, opacity 0.5s ease',
          opacity: opacity,
        }}
      >
        CRAVING SOMETHING SWEET? <br />
        WE'VE GOT YOU.
      </div>

      {showNewText && (
  <div
    style={{
      position: 'fixed',
      top: '30%',
      right: '13%',
      zIndex: 3,
      transition: 'opacity 0.5s ease',
      opacity: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}
  >
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <span style={{ color: 'black', fontSize: '4rem', fontWeight: 'bold' }}>BUT W</span>
      <span style={{ color: 'white', fontSize: '4rem', fontWeight: 'bold' }}>HY US?</span>
    </div>

    <div style={{ display: 'flex', marginTop: '1rem', gap: '1rem' }}>
      <img src="/handmade.jpg" alt="Reason 1" style={{ width: '300px', borderRadius: '50%', objectFit: 'cover' }} />
      <img src="/veg2.png" alt="Reason 2" style={{ width: '300px',  borderRadius: '50%', objectFit: 'cover' }} />
      <img src="/nopre.jpg" alt="Reason 3" style={{ width: ' 300px',  borderRadius: '50%', objectFit: 'cover' }} />
     </div>
  </div>
)}



    </>
  );
};


const AnimatedCircle = () => {
  const [circleStyle, setCircleStyle] = useState({
    transform: 'translate(0, 0) scale(3)'
  });
  const [circleTextVisible, setCircleTextVisible] = useState(false);
  const circleOpacity = 1;
  
 
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const translateX = Math.min(scrollY * 0.4, window.innerWidth / 2);
      const translateY = Math.min(scrollY * 0.35, window.innerHeight / 2);
      const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Monsieur+La+Doulaise&family=Bodoni+Moda:ital,wght@0,400;1,400&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);

      const scale = Math.max(4 - scrollY * 0.015, 1.5);
      setCircleStyle({
        transform: `translate(${translateX}px, ${-translateY}px) scale(${scale})`
      });
      
      if (scrollY > 600) {
        setCircleTextVisible(true);
      } else {
        setCircleTextVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <nav >
        <div className="rain-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="raindrop" />
          ))}
        </div>
        <div className="nav-links">
          <Link to="/admin" >Admin</Link>
          <Link to="/about" >About</Link>
          <div className="logo-container cursor-pointer">
          <Link to="/" >
            <img src="https://res.cloudinary.com/dgtxyhdwa/image/upload/v1739618267/logo_kssytz.png" alt="logo" />
          </Link>
          </div>
          <Link to="/menu" >Product</Link>
          <Link to="/gallery" >Gallery</Link>
        </div>
      </nav>
      {/* <CartBox cart={cartItems} setCart={setCartItems} /> */}
    <div
      style={{
        height: '300vh',
        position: 'relative',
        backgroundImage: 'url("/224.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll'
      }}
      >
      <div
        className="circle"
        style={{
          position: 'fixed',
          bottom: '-180px',
          left: '-310px',
          width: '202px',
          height:'202px',
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '3rem',
          zIndex: 2,
          transition: 'transform 0.2s ease-out, opacity 0.5s ease',
          
          opacity: circleOpacity,
          ...circleStyle
        }}
        >
        {circleTextVisible && (
          <div style={{
             transition: 'opacity 1s ease',
            fontSize:'1.2rem',
            opacity: circleTextVisible ? 1 : 0,
            position: 'relative',
            zIndex: 3
          }}>
            <Link to="/menuitems" className='italic' style={{ fontFamily: '"Bodoni Moda", serif', color: 'black', textDecoration: 'none' }}>VIEW <br>
            </br>OUR MENU <br></br> HERE</Link>
          </div>
        )}
      </div>

      <SweetCravingText />

      <div style={{ height: '200vh' }}></div>
    </div>
    
      </>
  );
};

export default AnimatedCircle;

