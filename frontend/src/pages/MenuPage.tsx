import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SweetCravingText = () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 900;
      const fadeEnd = 1100;

      let newOpacity = 0;
if (scrollY > fadeStart) {
  newOpacity = Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart));  // Fade in after scroll
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
        top: '40%',
        right: '5%',
        color: 'pink',
       
        fontFamily: '"Bodoni Moda", serif',
        fontSize: '4rem',
        zIndex: 3,
        transition: 'color 0.5s ease, opacity 0.5s ease',
        opacity: opacity,
      }}
    > <div style={{  gap: '0.5rem' }}>
    <span style={{ color: 'white', fontSize: '4rem', fontWeight: 'bold' }}>CRAVING</span><br></br>
    <span style={{ color: 'pink', fontSize: '4rem', fontWeight: 'bold' }}> SOMETHING <br></br>SWEET?</span><br></br>
    <span style={{ color: 'white', fontSize: '4rem', fontWeight: 'bold' }}>WE'VE </span>
    <span style={{ color: 'pink', fontSize: '4rem', fontWeight: 'bold' }}>GOT YOU.</span>
  </div>
    </div>
  );
};

const ButWhyUs = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;const fadeStart = 1200;
      const fadeEnd = 1400;
      

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
        right: '13%',
        zIndex: 3,
        transition: 'opacity 0.5s ease',
        opacity: opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        animation: 'fadeIn 1s ease-in-out',
      }}
    >
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <span style={{ color: 'lightgreen', fontSize: '4rem', fontWeight: 'bold' }}>BUT</span>
        <span style={{ color: 'white', fontSize: '4rem', fontWeight: 'bold' }}>WHY US?</span>
      </div>

      <div style={{ display: 'flex', marginTop: '1rem', gap: '1rem' }}>
        <img src="/handmade.jpg" alt="Reason 1" style={{ width: '300px', borderRadius: '50%', objectFit: 'cover' }} />
        <img src="/veg2.png" alt="Reason 2" style={{ width: '300px', borderRadius: '50%', objectFit: 'cover' }} />
        <img src="/nopre.jpg" alt="Reason 3" style={{ width: '300px', borderRadius: '50%', objectFit: 'cover' }} />
      </div>
    </div>
  );
};

const AnimatedCircle = () => {
  const [circleStyle, setCircleStyle] = useState({
    transform: 'translate(0, 0) scale(3)',
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
        transform: `translate(${translateX}px, ${-translateY}px) scale(${scale})`,
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
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/admin" className="nav-link">Admin</Link>
          <Link to="/about" className="nav-link">About</Link>
          <div className="logo-container cursor-pointer">
            <Link to="/">
              <img src="https://res.cloudinary.com/duqllfqxd/image/upload/v1739274748/logo_pzf5wc.png" alt="logo" />
            </Link>
          </div>
          <Link to="/menu" className="nav-link">Product</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
        </div>
      </nav>
      <div
        style={{
          height: '300vh',
          position: 'relative',
          backgroundImage: 'url("/224.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
        }}
      >
        <div
          className="circle"
          style={{
            position: 'fixed',
            bottom: '-240px',
            left: '-400px',
            width: '302px',
            height: '302px',
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
            ...circleStyle,
          }}
        >
          {circleTextVisible && (
            <div
              style={{
                transition: 'opacity 1s ease',
                fontSize: '1.8rem',
                opacity: circleTextVisible ? 1 : 0,
                position: 'relative',
                zIndex: 3,
              }}
            >
              <Link to="/menuitems" className='bold' style={{ fontWeight: 'bold' ,  color: 'black', textDecoration: 'none' }}>
                VIEW <br />
                OUR MENU <br />
                HERE
              </Link>
            </div>
          )}
        </div>

        <ButWhyUs />
        <SweetCravingText />

        <div style={{ height: '200vh' }}></div>
      </div>
    </>
  );
};

export default AnimatedCircle;
