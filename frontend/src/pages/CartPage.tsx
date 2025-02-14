import { useState, useEffect, SetStateAction } from 'react';
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface CartItem {
  _id: string;
  name: string;
  image:string;
  quantity: number;
  price:number;
  special?: string;  // Optional special instructions
  customize?: string; // Optional customization
}

interface CartPageProps {
  cart: CartItem[];
}

const CartPage: React.FC<CartPageProps> = ({ cart, setCart }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleCart = (): void => setIsOpen(!isOpen);


  const updateCartCount = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalItems.toString());
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter(item => item._id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    console.log(updatedCart)
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
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
          transition={{ type: "tween" }}
          className="fixed center w-100 right-0 h-[90%] bg-white shadow-lg p-4 rounded-bl-xl rounded-tl-xl"

        >
          <button onClick={toggleCart} className="absolute top-2 right-2 text-xl">&times;</button>
          <p className="text-2xl font-semibold mb-4 text-[#7a3e3e]">Your Cart</p>
          {cart.length === 0 ? (
            <p className="text-center text-[1rem]">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item._id} style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  borderBottom: "1px solid #EAC4D5",
                  gap: "20px"
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px"
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: "#7A3E3E", fontSize: "1.2rem" }}>{item.name}</h3>
                    <p style={{ color: "#B56576" }}>${item.price}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#F4D0D0",
                        cursor: "pointer"
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#F4D0D0",
                        cursor: "pointer"
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      style={{
                        marginLeft: "10px",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>                  
                </div>
              ))}
            </div>)}
          </motion.div>
                
        )}
    </div>
  );
};

export default CartPage;
