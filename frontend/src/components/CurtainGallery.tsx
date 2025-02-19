import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const scrollGalleryImages = [
  'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274475/111_rtm1vj.jpg',
  'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274473/222_u7w8gn.jpg',
  'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274473/333_i0ae0e.jpg',
  'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274474/444_oapcps.jpg',
  'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274480/555_bsghyy.jpg',
  'https://res.cloudinary.com/duqllfqxd/image/upload/v1739274480/666_hjsal2.jpg',
];

const buttonColors = [
  'bg-pink-200', 'bg-pink-300', 'bg-pink-400', 'bg-pink-500', 'bg-pink-600','bg-pink-700'
];

const buttonText = [
  'Order Now: Cake', 
  'Order Now: Cookies', 
  'Order Now: Waffles', 
  'Order Now: Rasmalai', 
  'Order Now: Fudge', 
  'Order Now: Cupcake'
];

const CurtainGallery = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const imageIndex = Math.floor(scrollY / window.innerHeight);
    setActiveImageIndex(imageIndex);
  }, [scrollY]);

  return (
    <div className="relative min-h-[600vh]">
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
        {scrollGalleryImages.map((image, index) => {
          // Calculate how much each image should move based on scroll
          const movePercent = Math.max(
            0,
            Math.min(
              100,
              ((scrollY - (index * window.innerHeight)) / window.innerHeight) * 100
            )
          );
          
          return (
            <div
              key={index}
              className="absolute top-0 w-full h-full rounded-b-3xl bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                transform: `translateY(-${movePercent}%)`,
                zIndex: scrollGalleryImages.length - index,
              }}
            />
          );
        })}
      </div>

      {/* The "Order Now" button with navigation and cursor pointer */}
      <button
        onClick={() => navigate('/menu')}
        className={`fixed bottom-4 left-4 py-12 px-24 text-white text-2xl rounded-full font-bold transition-all duration-500 ease-in-out cursor-pointer ${buttonColors[activeImageIndex]}`}
        title={buttonText[activeImageIndex]}
      >
        {buttonText[activeImageIndex]}
      </button>
    </div>
  );
};

export default CurtainGallery;
