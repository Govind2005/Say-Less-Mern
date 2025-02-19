import { useState, useEffect, SetStateAction } from 'react';
// import CartBox from '../components/CartBox';
import { FiMinus, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTrashAlt, FaYoutube } from "react-icons/fa";

interface CartItem {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  special?: string;  // Optional special instructions
  customize?: string; // Optional customization
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paid,setPaid] = useState(true);
  const [name, setName] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const [orderDate, setOrderDate] = useState<string>(new Date().toISOString().split('T')[0]); // Set default date to today

  useEffect(() => {
    // Load cart items from localStorage when component mounts
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const updateCartCount = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalItems.toString());
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const handleSpecialChange = (itemId: string, value: string) => {
    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, special: value } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setPhoneNumber(e.target.value);
  };

  const handleNameChange = (e: { target: { value: SetStateAction<string> } }) => {
    setName(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDate(e.target.value);
  };

  const paymentHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const response = await fetch("http://localhost:5000/payment/create-order", {
      method: "POST",
      body: JSON.stringify({
        amount: total,
        currency: "INR",
        notes: {}
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(import.meta.env.VITE_RAZORPAY_KEY)
    console.log(order);

    let options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: total,
      currency: "INR",
      name: "Bindi Cupcake",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response: Response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch("http://localhost:5000/payment/verify-payment", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        name: name,
        email: "webdevmatrix@example.com",
        contact: phoneNumber.startsWith("+91") ? phoneNumber : "+91 " + phoneNumber
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "pink",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  const handleButtonClick = async () => {
    if (phoneNumber && name) {
      try {
        let message = "🎂 *New Order:*\n\n";
        cartItems.forEach(item => {
          message += `*${item.name}* x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}\n`;
          if (item.special) message += `Special: ${item.special}\n`;
          if (item.customize) message += `Customize: ${item.customize}\n`;
        });
        message += "name: " + name;
        message += "\nnumber: " + phoneNumber;
        message += `\n*Total: $${total.toFixed(2)}*`;

        const response = await fetch('http://localhost:4000/send-whatsapp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber, message }),
        });

        const data = await response.json();
        console.log(data);
        if (data.success) {
          setMessageStatus('Message sent successfully!');
        } else {
          setMessageStatus('Failed to send message.');
        }

        const orderData = {
          name,
          phoneNumber,
          items: cartItems,
          total,
          orderDate,
          paid
        };

        const dbResponse = await fetch('http://localhost:4000/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        const dbData = await dbResponse.json();
        if (dbData.success) {
          console.log("here ", JSON.stringify(orderData, null, 2));
          setMessageStatus('Order saved to database successfully!');
        } else {
          setMessageStatus('Failed to save order to database.');
        }

      } catch (error) {
        console.error(error);
        setMessageStatus('Error occurred while sending message.');
      }
    } else {
      setMessageStatus('Please enter both name and phone number.');
    }
    paymentHandler;
  };

  const payLater = async () => {
    try {
      // Set paid to false for pickup orders
      setPaid(false);

      // Prepare order data
      const orderData = {
        name,
        phoneNumber,
        items: cartItems,
        total,
        orderDate,
        paid: false // Use false directly since state update might not be immediate
      };

      // Save to database
      const dbResponse = await fetch('http://localhost:4000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const dbData = await dbResponse.json();
      
      if (dbData.success) {
        setMessageStatus('Order saved successfully!');
        
        // Create WhatsApp message
        let message = "🎂 *New Order:*\n\n";
        cartItems.forEach(item => {
          message += `*${item.name}* x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}\n`;
          if (item.special) message += `Special: ${item.special}\n`;
        });
        message += "\nName: " + name;
        message += "\nNumber: " + phoneNumber;
        message += `\nTotal: ₹${total.toFixed(2)}`;
        message += "\nPayment: On Pickup";
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp with the message
        window.open(`https://wa.me/919119682899?text=${encodedMessage}`, '_blank');
      } else {
        setMessageStatus('Failed to save order to database.');
      }
    } catch (error) {
      console.error(error);
      setMessageStatus('Error occurred while saving order.');
    }
  };

  return (
    <>
    <nav className="fixed top-0 w-full z-40 bg-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/">
              <img 
                src="https://res.cloudinary.com/dgtxyhdwa/image/upload/v1739618267/logo_kssytz.png" 
                alt="Bindi's" 
                className="h-6 sm:h-8 object-contain cursor-pointer" 
              />
            </a>
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-pink-100 hover:text-pink-200">
            <span className="sr-only">Open menu</span>
            ☰
          </button>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 text-white text-lg">
              <a href="/menu" className="hover:text-pink-200 transition-colors">Menu</a>
              <a href="/gallery" className="hover:text-pink-200 transition-colors">Gallery</a>
              <a href="/about" className="hover:text-pink-200 transition-colors">About Us</a>
              <a href="/admin" className="hover:text-pink-200 transition-colors">Admin</a>
            </div>
          </div>
        </div>
      </nav>
      {/* <CartBox cart={cartItems} setCart={setCartItems} /> */}
    <div className="p-10 mt-24 font-sans">
      <h1 className="text-center text-5xl mb-8 text-[#7A3E3E]">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center p-5 border-b border-[#EAC4D5] gap-5">
              <img
                src={item.image}
                alt={item.name}
                className="w-35 h-35 object-cover rounded-full border-3 border-[#B56576]"
              />
              <div className="grow">
                <h3 className="text-[#7A3E3E] text-2xl">{item.name}</h3>
                <p className="text-[#B56576] text-lg">${item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  title="Decrease quantity"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="px-3 py-3 rounded-md bg-[#F4D0D0] hover:bg-[#F1A1A1] cursor-pointer"
                >
                  <FiMinus />
                </button>
                <span className='px-2'>{item.quantity}</span>
                <button
                  title="Increase quantity"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="px-3 py-3 rounded-md bg-[#F4D0D0] hover:bg-[#F1A1A1] cursor-pointer"
                >
                  <FiPlus />
                </button>
                <button
                title='remove'
                  onClick={() => removeFromCart(item._id)}
                  className="ml-3 mr-3 px-3 py-2 text-2xl"
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

              <div>
                <textarea
                  rows={3}
                  cols={40}
                  placeholder="Special Instructions (optional)"
                  value={item.special || ''}
                  onChange={(e) => handleSpecialChange(item._id, e.target.value)}
                  className="p-2 rounded-lg border-2 border-[#EAC4D5] focus:ring-2 focus:ring-[#B56576] outline-none focus:ring-offset-0"
                ></textarea>
              </div>
            </div>
          ))}
          <div className="mt-8 p-5 bg-[#FFF5F7] rounded-lg shadow-md">
            <div className="mb-5">
              <label className="block text-[#7A3E3E] text-lg mb-2">Enter your name:</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className="w-full max-w-xs p-2 rounded-lg border-2 border-[#EAC4D5]"
              />
            </div>

            <div className="mb-5">
              <label className="block text-[#7A3E3E] text-lg mb-2">Enter your mobile number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full max-w-xs p-2 rounded-lg border-2 border-[#EAC4D5]"
              />
            </div>

            {/* Date Picker */}
            <div className="mb-5">
              <label className="block text-[#7A3E3E] text-lg mb-2">Choose your order date:</label>
              <input
                title='date'
                type="date"
                value={orderDate}
                onChange={handleDateChange}
                className="w-full max-w-xs p-2 rounded-lg border-2 border-[#EAC4D5]"
              />
            </div>

            <div className="flex justify-between items-center mt-5">
              <div className="text-[#7A3E3E] text-xl font-bold">
                Total: ${total.toFixed(2)}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={async(e) => {
                    setPaid(true);
                    handleButtonClick(); 
                    paymentHandler(e);
                  }}
                  disabled={!(name && phoneNumber)}
                  className="px-6 py-3 rounded-lg bg-[#7A3E3E] text-white text-lg disabled:bg-gray-400 hover:bg-[#8A4E4E] transition-colors"
                  title="Pay now using online payment"
                >
                  Pay Now
                </button>
                <button
                  onClick={payLater}
                  disabled={!(name && phoneNumber)}
                  className="px-6 py-3 rounded-lg border-2 border-[#7A3E3E] text-[#7A3E3E] text-lg disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-600 hover:bg-[#7A3E3E] hover:text-white transition-colors"
                  title="Contact via WhatsApp for pickup order"
                >
                  Pay on Pickup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className="mt-5 text-center">{messageStatus}</p>
      </div>
      <footer className="w-full bg-[#FF4D8D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Logo Section */}
          <div className="flex justify-center mb-16">
            <div className="w-[200px] bg-[#FFE0E9] p-4 rounded-lg">
              <img 
                src="https://res.cloudinary.com/dgtxyhdwa/image/upload/v1739618267/logo_kssytz.png" 
                alt="Bindi's Cupcakery"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Get In Touch */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6 relative inline-block">
                Get In Touch
                <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-white"></div>
              </h3>
              <p>Parle Point, Surat, Gujarat</p>
              <p>8849130189 - 9978677790</p>
            </div>

            {/* Opening Hours */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6 relative inline-block">
                Opening Hours
                <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-white"></div>
              </h3>
              <p>Mon – Sat, 11AM – 7PM</p>
              <p>Sunday: Closed</p>
            </div>

            {/* Follow Us */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6 relative inline-block">
                Follow Us
                <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-white"></div>
              </h3>
              <div className="flex justify-center gap-6">
                <a href="#" className="hover:text-pink-200 transition-colors text-xl">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-pink-200 transition-colors text-xl">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-pink-200 transition-colors text-xl">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-16 pt-8 border-t border-pink-400">
            <p>© Domain. All Rights Reserved. Designed by Bindi's Cupcakery</p>
          </div>
        </div>
      </footer>
      </>
  );
};

export default CartPage;