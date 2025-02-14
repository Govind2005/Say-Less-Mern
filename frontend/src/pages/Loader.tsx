import React, { useEffect } from 'react';

const PancakeLoader = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.loader')?.classList.add('fade-out');
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="animate-[slide-plate-out_6s_infinite_ease-forwards]">
        <div className="w-12 h-3 bg-yellow-400 mx-auto rounded-sm shadow-inner"></div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-48 h-4 bg-yellow-300 mx-auto rounded-xl shadow-inner animate-[element-drop_6s_infinite_ease-in_forwards]"
            style={{ animationDelay: `${0.4 + i * 0.22}s` }}
          ></div>
        ))}
        <div className="relative w-56 h-3 bg-teal-300 rounded-t-lg animate-[slide-plate-in_6s_infinite_ease-forwards]">
          <div className="absolute top-full left-1/2 -ml-20 w-40 h-2 bg-teal-400 rounded-b-lg"></div>
          <div className="absolute top-[130%] left-1/2 -ml-24 w-48 h-2 bg-black opacity-20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PancakeLoader;

/* Tailwind Keyframes (add to tailwind.config.js if needed) */
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         'element-drop': {
//           '0%,100%': { transform: 'translateY(-100vh) scaleY(.7)', opacity: '1' },
//           '11%': { transform: 'translateY(20%) scaleY(1.2)' },
//           '13%': { transform: 'translateY(-30%) scaleY(.9)' },
//           '14%,67%': { transform: 'translateY(0) scaleY(1)', opacity: '1' },
//           '68%': { transform: 'translateY(-100vh) scaleY(.7)', opacity: '0' }
//         },
//         'slide-plate-in': {
//           '0%': { transform: 'translateX(100vw)' },
//           '15%,100%': { transform: 'translateX(0)' }
//         },
//         'slide-plate-out': {
//           '65%': { transform: 'translateX(0)' },
//           '85%,100%': { transform: 'translateX(-100vw)' }
//         }
//       },
//       animation: {
//         'element-drop': 'element-drop 6s infinite ease-in forwards',
//         'slide-plate-in': 'slide-plate-in 6s infinite ease forwards',
//         'slide-plate-out': 'slide-plate-out 6s infinite ease forwards'
//       }
//     }
//   }
// }