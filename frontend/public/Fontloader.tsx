import React, { useEffect } from 'react';

const FontLoader: React.FC = () => {
  useEffect(() => {
    // Create and append the font links dynamically
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = "https://fonts.googleapis.com/css2?family=Bodoni+Moda+SC:ital,wght@0,400;0,700;1,400;1,700&family=Bodoni+Moda:ital,wght@0,400;0,700;1,400;1,700&family=Libre+Caslon+Display&display=swap";
    document.head.appendChild(fontLink);

    return () => {
      // Clean up the link when the component unmounts
      document.head.removeChild(fontLink);
    };
  }, []);

  return null; // This component only handles font loading
};

export default FontLoader;
