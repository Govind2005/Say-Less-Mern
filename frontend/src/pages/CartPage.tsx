import { useState, useEffect } from 'react';

interface CartItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    type: string;
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [mobileNumber, setMobileNumber] = useState('');
    const [isValidNumber, setIsValidNumber] = useState(false);

    useEffect(() => {
        // Load cart items from localStorage when component mounts
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCart);
    }, []);

    // Validate mobile number (simple 10-digit validation)
    const validateMobileNumber = (number: string) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(number);
    };

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = e.target.value;
        setMobileNumber(number);
        setIsValidNumber(validateMobileNumber(number));
    };

    const handleSendOrder = () => {
        // Create WhatsApp message
        let message = "🎂 *New Order:*\n\n";
        cartItems.forEach(item => {
            message += `*${item.name}* x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        message += `\n*Total: $${total.toFixed(2)}*`;

        // Format phone number (add country code if needed)
        const formattedNumber = `91${mobileNumber}`; // Adding Indian country code
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
    };

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

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div style={{ padding: "40px", fontFamily: "'Poppins', sans-serif" }}>
            <h1 style={{ 
                color: "#7A3E3E", 
                fontSize: "2.5rem", 
                marginBottom: "30px",
                textAlign: "center" 
            }}>
                Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
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
                                        marginLeft: "20px",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        border: "none",
                                        backgroundColor: "#FFC2D1",
                                        cursor: "pointer"
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={{ 
                        marginTop: "30px", 
                        padding: "20px",
                        backgroundColor: "#FFF5F7",
                        borderRadius: "10px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}>
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ 
                                display: "block", 
                                marginBottom: "8px",
                                color: "#7A3E3E",
                                fontSize: "1.1rem"
                            }}>
                                Enter your mobile number:
                            </label>
                            <input
                                type="tel"
                                value={mobileNumber}
                                onChange={handleMobileChange}
                                placeholder="10-digit mobile number"
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    border: "2px solid #EAC4D5",
                                    width: "100%",
                                    maxWidth: "300px",
                                    fontSize: "1rem"
                                }}
                            />
                            {mobileNumber && !isValidNumber && (
                                <p style={{ 
                                    color: "#FF4D4D", 
                                    fontSize: "0.9rem",
                                    marginTop: "4px" 
                                }}>
                                    Please enter a valid 10-digit mobile number
                                </p>
                            )}
                        </div>

                        <div style={{ 
                            display: "flex", 
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "20px"
                        }}>
                            <div style={{ 
                                fontSize: "1.5rem",
                                color: "#7A3E3E",
                                fontWeight: "bold"
                            }}>
                                Total: ${total.toFixed(2)}
                            </div>
                            <button 
                                onClick={handleSendOrder}
                                disabled={!isValidNumber || cartItems.length === 0}
                                style={{
                                    padding: "12px 24px",
                                    borderRadius: "8px",
                                    border: "none",
                                    backgroundColor: isValidNumber ? "#7A3E3E" : "#CCCCCC",
                                    color: "white",
                                    fontSize: "1.1rem",
                                    cursor: isValidNumber ? "pointer" : "not-allowed",
                                    transition: "0.3s",
                                }}
                            >
                                Send Order on WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
