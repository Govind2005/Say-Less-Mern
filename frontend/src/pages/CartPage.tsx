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
                        textAlign: "right",
                        fontSize: "1.5rem",
                        color: "#7A3E3E",
                        fontWeight: "bold"
                    }}>
                        Total: ${total.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
