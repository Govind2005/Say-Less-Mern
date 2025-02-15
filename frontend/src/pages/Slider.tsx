import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  '222.jpg',
  '223.jpg',
  '222.jpg',
  '223.jpg'
];

const OverlappingImageScroll: React.FC = () => {
  const { scrollY } = useScroll();

  return (
    <div className="relative h-[400vh]">
      {images.map((img, index) => {
        const start = index * 100;
        const end = start + 100;
        const y = useTransform(scrollY, [start, end], [0, -100]);

        return (
          <motion.div
            key={index}
            className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
            style={{ y, zIndex: index + 1 }}
          >
            <img
              src={img}
              alt={`Overlapping Image ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default OverlappingImageScroll;
