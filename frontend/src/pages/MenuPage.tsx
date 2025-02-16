import { useEffect, useState } from 'react';
import { Link} from 'react-router';
// import CartBox from '../components/CartBox';


const SweetCravingText = () => {
  const [opacity, setOpacity] = useState(1);



  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 500;
      console.log(scrollThreshold)
      const fadeStart = 700;
      const fadeEnd = 900;

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
        backgroundImage: `url('/224.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll'
      }}
      >
      <div
        className="circle"
        style={{
          position: 'fixed',
          bottom: '-200px',
          left: '-350px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          backgroundColor: 'white',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '3rem',
          fontFamily: '"Bodoni Moda", serif',
          zIndex: 2,
          transition: 'transform 0.2s ease-out, opacity 0.5s ease',
          border: '10px solid pink',
          opacity: circleOpacity,
          ...circleStyle
        }}
        >
        {circleTextVisible && (
          <div style={{
            fontFamily: '"Bodoni Moda", serif',
            transition: 'opacity 1s ease',
            fontSize:'2.5rem',
            opacity: circleTextVisible ? 1 : 0,
            position: 'relative',
            zIndex: 10
          }}>
            <Link to="/menuitems" className='italic' style={{ fontFamily: '"Bodoni Moda", serif', color: 'pink', textDecoration: 'none' }}>EXPLORE <br>
            </br>OUR MENU</Link>
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
