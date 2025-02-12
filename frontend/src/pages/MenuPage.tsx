import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const MenuPage = () => {
    const [items, setItems] = useState<{ _id: string; image: string; name: string; type: string; price: number; available: boolean }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("All");
    const navigate = useNavigate();

    interface Item {
        name: String, 
  type: String, 
  image: String, 
  price:  Number, 
  available:  Boolean, 
    }
    useEffect(() => {
        fetchItems();
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/item');
            if (response.ok) {
                const data = await response.json();
                setItems(data.data);
                setLoading(false);
            } else {
                setError('Failed to fetch items');
                setLoading(false);
            }
        } catch (error) {
            setError('Error fetching items: ' + error.message);
            setLoading(false);
        }
    };

    // Filtered Items based on category selection
    const filteredItems = category === "All" ? items : items.filter(item => item.type === category);

    const handleAddToCart = (item: any) => {
        // Get existing cart items from localStorage
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Check if item already exists in cart
        const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem._id === item._id);
        
        if (existingItemIndex !== -1) {
            // If item exists, increment quantity
            existingCart[existingItemIndex].quantity += 1;
        } else {
            // If item doesn't exist, add it with quantity 1
            existingCart.push({
                ...item,
                quantity: 1
            });
        }
        
        // Calculate total items
        const totalItems = existingCart.reduce((sum: number, item: any) => sum + item.quantity, 0);
        
        // Save updated cart and total back to localStorage
        localStorage.setItem('cart', JSON.stringify(existingCart));
        localStorage.setItem('cartCount', totalItems.toString());
        console.log('Added to cart:', item.name);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ backgroundColor: "#FDE2F4", padding: "40px", fontFamily: "'Poppins', sans-serif" }}>
            {/* Filter Bar */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px" }}>
                {["All", "Cake", "Cupcakes", "Pastry"].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "20px",
                            border: "none",
                            backgroundColor: category === cat ? "#7A3E3E" : "#F4D0D0",
                            color: category === cat ? "white" : "#7A3E3E",
                            fontSize: "1rem",
                            cursor: "pointer",
                            transition: "0.3s",
                            fontWeight: "bold"
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Fancy Heading with SVG Lines */}
            <h1 style={{
                textAlign: "center",
                color: "#7A3E3E",
                fontSize: "4rem",
                fontFamily: "'Monsieur La Doulaise', serif",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px"
            }}>
                ~~~ Our Delicious Creations ~~~
             </h1>

            {/* Items Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px", padding: "20px" }}>
                {filteredItems.map((item) => (
                    <div key={item._id} style={{
                        backgroundColor: "#FFF5F7",
                        borderRadius: "15px",
                        padding: "20px",
                        textAlign: "left",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease-in-out",
                        border: "2px solid #EAC4D5"
                    }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{
                                width: "100%",
                                height: "250px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                borderBottom: "4px solid #EAC4D5"
                            }}
                        />
                        <h2 style={{ color: "#7A3E3E", fontSize: "1.8rem", marginTop: "15px" }}>{item.name}</h2>
                        <p style={{ color: "#B56576", fontSize: "1.2rem", fontWeight: "500" }}>Type: {item.type}</p>
                        <p style={{ color: "#6D6875", fontSize: "1.2rem" }}>Price: <span style={{ fontWeight: "bold", color: "#7A3E3E" }}>${item.price}</span></p>
                        <p style={{
                            backgroundColor: item.available ? "#D8E2DC" : "#FFC2D1",
                            color: "#7A3E3E",
                            fontSize: "1rem",
                            padding: "8px 15px",
                            borderRadius: "8px",
                            display: "inline-block",
                            fontWeight: "600"
                        }}>
                            {item.available ? "Available" : "Out of Stock"}
                        </p>
                        <button 
                            className="m-8"  
                            style={{
                                backgroundColor: item.available ? "#D8E2DC" : "#FFC2D1",
                                color: "#7A3E3E",
                                fontSize: "1rem",
                                padding: "8px 15px",
                                borderRadius: "8px",
                                cursor: 'pointer',
                                display: "inline-block",
                                fontWeight: "600"
                            }}
                            onClick={() => item.available && handleAddToCart(item)}
                            disabled={!item.available}
                        >
                            {item.available ? "ADD to Cart" : "Out of Stock"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;