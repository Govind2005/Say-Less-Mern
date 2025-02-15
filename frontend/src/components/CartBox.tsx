import { useState, useEffect } from 'react';
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

interface CartItem {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  special?: string;  // Optional special instructions
  customize?: string; // Optional customization
}

const CartBox: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Function to update state when localStorage changes
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
      setCart(storedCart);
  }, [cart]);

  const toggleCart = (): void => setIsOpen(!isOpen);

  const updateCartCount = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalItems.toString());
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item._id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateCartCount(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateCartCount(updatedCart);
      return updatedCart;
    });
  };

  return (
    <div className='relative z-10'>
      <button onClick={toggleCart} className="fixed top-4 right-4 bg-pink-500 text-white p-2 rounded-full">
        <FaShoppingCart size={24} />
      </button>
      {isOpen && (
        <motion.div 
          initial={{ x: "100%" }} 
          animate={{ x: 0 }} 
          exit={{ x: "100%" }} 
          transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }} 
          className="fixed top-10 -translateY-[50%] center w-100 right-0  h-[90%] bg-[#ffeac2] shadow-2xl p-4 rounded-bl-xl rounded-tl-xl overflow-y-auto overflow-x-hidden custom-scrollbar"

        >
          <button 
            onClick={toggleCart} 
            className="absolute top-5 right-3 text-xl text-white rounded-full bg-[#d4a517] hover:bg-[#b38e0b] transition cursor-pointer"
          >
            <IoClose />
          </button>

          <p className="text-3xl font-semibold mb-4 text-[#7a3e3e]">Your Cart</p>

          {cart.length === 0 ? (
            <p className="pt-60 text-center text-[1.rem] text-gray-500">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center pb-5 pt-5 border-b border-[#EAC4D5] gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border-2 border-[#EAC4D5] p-0.25" draggable="false"
                  />
                  <div className="flex-1">
                    <h5 className="text-[#7A3E3E] text-xl">{item.name}</h5>
                    <p className="text-[#B56576]">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-2 py-2 rounded-lg bg-white/30 backdrop-blur-lg cursor-pointer hover:bg-white/40"
                  >
                    <FiMinus />
                  </button>

                    <p className="px-1 py-2">{item.quantity}</p>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="px-2 py-2 rounded-lg bg-white/30 backdrop-blur-lg cursor-pointer hover:bg-white/40"
                    >
                      <FiPlus />
                  </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="ml-2 px-2 py-1 cursor-pointer"
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: -15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaTrashAlt className="text-gray-600 transition-transform duration-200" />
                      </motion.div>
                    </button>
                  </div>
                </div>  
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CartBox;
