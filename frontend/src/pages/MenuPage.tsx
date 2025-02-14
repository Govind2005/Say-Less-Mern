import React, { useEffect, useState } from 'react';
const SweetCravingText = () => {
  const [textColor, setTextColor] = useState('white');

  useEffect(() => {
    const handleScroll = () => {
      // Change color after 500px of scrolling
      const scrollThreshold = 500;
      setTextColor(window.scrollY > scrollThreshold ? 'black' : 'white');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '30%',
        right: '10%',
        color: textColor,
        fontFamily: '"Bodoni Moda", serif',
        fontSize: '6rem',
        zIndex: 3,
        transition: 'color 0.5s ease',
      }}
    >
      CRAVING SOMETHING SWEET? <br />
      WE'VE GOT YOU.
    </div>
  );
};

const AnimatedCircle = () => {
  // Initialize state for the circle's transformation
  const [circleStyle, setCircleStyle] = useState({
    transform: 'translate(0, 0) scale(3)', // Initial scale for a larger circle
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Calculate horizontal movement (moves from left to center)
      const translateX = Math.min(scrollY * 0.4, window.innerWidth / 2);

      // Calculate vertical movement (moves from bottom to center)
      const translateY = Math.min(scrollY * 0.35, window.innerHeight / 2);

      // Calculate scaling (shrinks as it moves, but stays larger)
      const scale = Math.max(4 - scrollY * 0.015, 1.5); // Larger final size than before

      // Apply the transformations to the circle
      setCircleStyle({
        transform: `translate(${translateX}px, ${-translateY}px) scale(${scale})`,
      });
    };

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 

  return (
    <div
      style={{
        height: '200vh',
        position: 'relative',
        backgroundImage: `url('/224.jpg')`, // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll', // Keeps the background static
      }}
    >
      {/* Circle with Text */}
      <div
        className="circle"
        style={{
          position: 'fixed',
          bottom: '-150px', // Starts lower to show a larger corner arc
          left: '-150px', // Starts further left to show only a quadrant
          width: '500px', // Increased size
          height: '500px',
          borderRadius: '50%',
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '3rem',
          fontFamily: '"Bodoni Moda", serif',
          zIndex: 2,
          transition: 'transform 0.2s ease-out',
          ...circleStyle,
        }}
      > HAVE A LOOK <br> </br>AT OUR MENU
       
      </div>

      {/* Right-side Text */}
      <SweetCravingText /> 

      {/* Page Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem', color: '#333' }}>
       </div>
    </div>
  );
};

export default AnimatedCircle;