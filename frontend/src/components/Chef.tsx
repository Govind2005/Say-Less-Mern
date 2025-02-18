import React, { useState, useEffect } from 'react';

const CircularChefsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
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

  const rotate = () => {
    setCurrentIndex((prev) => (prev + 1) % chefs.length);
  };

  // Auto rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(rotate, 3000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const getTitleCard = () => (
    <div className="flex flex-col items-center justify-center h-80 w-80 bg-pink-50 rounded-full border-4 border-pink-300 p-8">
      <h2 className="text-3xl font-serif text-center text-gray-800">
        Our Expert Chefs
      </h2>
      <p className="text-lg text-pink-600 text-center mt-3">
        Meet our culinary masters
      </p>
    </div>
  );

  const getChefCard = (chef) => (
    <div className="flex flex-col items-center justify-center h-80 w-80">
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-pink-300">
        <img
          src={chef.image}
          alt={chef.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-serif text-gray-800 mt-3">{chef.name}</h3>
      <p className="text-sm font-medium text-pink-600">{chef.designation}</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex items-center justify-end pr-72 bg-blue-300">
      <div className="relative w-[800px] h-[500px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[500px] h-[500px]">
            {[{ isTitle: true }, ...chefs].map((item, index) => {
              // Calculate angle to evenly distribute the cards in a circle
              const angle = (index * (360 / chefs.length)) % 360;
              const radian = (angle * Math.PI) / 180;
              const radius = 160; // Radius for the cards to be placed around the center
              const x = radius * Math.sin(radian);
              const y = -radius * Math.cos(radian);

              // Make all cards the same size and scale them based on the position
              const isActive = index === currentIndex;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-500 ease-in-out"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.7})`,
                    zIndex: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0.6,
                  }}
                >
                  <div className={isActive ? 'opacity-100' : 'opacity-0'}>
                    {item.isTitle ? getTitleCard() : getChefCard(item)}
                  </div>
                  {!isActive && (
                    <div className="w-16 h-16 rounded-full bg-pink-200 border-2 border-pink-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularChefsCarousel;
