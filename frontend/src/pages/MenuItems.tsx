import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


const MenuPage = () => {
    const [items, setItems] = useState<{ _id: string; image: string; name: string; type: string; price: number; available: boolean }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        fetchItems();
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Monsieur+La+Doulaise&family=Bodoni+Moda:ital,wght@0,400;1,400&display=swap";
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
        } catch (error : unknown) {
            setError('Error fetching items: ' + (error as Error).message);
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
      <>
       <nav className="navbar">
      <div className="nav-links">
        <Link to="/admin" className="nav-link">Admin</Link>
        <Link to="/about" className="nav-link">About</Link>
        <div className="logo-container cursor-pointer">
          <Link to="/">
            <img src="https://res.cloudinary.com/duqllfqxd/image/upload/v1739274748/logo_pzf5wc.png" alt="logo" />
          </Link>
        </div>
        <Link to="/menu" className="nav-link">Product</Link>
        <Link to="/gallery" className="nav-link">Gallery</Link>
      </div>
    </nav>
        <div style={{backgroundColor:"#fff6fd", padding: "40px", fontFamily: '"Bodoni Moda", serif'}}>
            {/* Filter Bar */}
            <br></br>
<br></br>
<br></br>
<br></br>
            
            <div style={{ fontFamily: '"Bodoni Moda", serif' , display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px" }}>
                {["All", "Cake", "Truffle Balls", "Brownie & Brownie Tub", "Donut", "Cookie"].map((cat) => (
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
              fontSize: "2rem",
             // fontFamily: '"Monsieur La Doulaise", cursive' ,     
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px"
            }}>
                ~ OUR DELICIOUS CREATIONS ~
             </h1>

            {/* Items Grid */}
            <div 
  style={{ 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 2fr))", // Fewer columns
    gridAutoRows: "600px", // Bigger row height to make images squarer
    gap: "25px", 
    //padding: "20px",
    backgroundColor: "#fff",
    padding: "50px",
    margin: "40px auto",
    maxWidth: "1500px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "15px"
  }}
>
  {filteredItems.map((item) => {
    
    return (
    
      <div 
      key={item._id} 
      style={{
        position: "relative",
        overflow: "hidden",
       // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.3s ease-in-out",
        fontFamily: '"Bodoni Moda", serif',
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%" 
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "100%",
          height: "70%", // Adjust to take only 70% height
          objectFit: "cover",
          transition: "opacity 0.3s ease"
        }}
      />
      <div 
        style={{
          padding: "20px",
          backgroundColor: "#fff6fd", 
          fontFamily: '"Bodoni Moda", serif',
          color: "#7A3E3E",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "30%" // Remaining 30% for text and button
        }}
      >
        <h2 style={{   fontFamily: '"Bodoni Moda", serif',fontSize: "1.6rem", fontWeight: "bold", marginBottom: "5px" }}>
          {item.name}
        </h2>
        <p style={{  fontFamily: '"Bodoni Moda", serif', fontSize: "1rem", fontWeight: "500" }}>Type: {item.type}</p>
        <p style={{   fontFamily: '"Bodoni Moda", serif',fontSize: "1rem" }}>
          Price: <span style={{ fontWeight: "bold" }}>${item.price}</span>
        </p>
        <button 
          style={{
            background: "transparent",
            color: "#7A3E3E",
            fontSize: "1rem",
            padding: "10px 25px",
            border: "2px solid #7A3E3E",
            fontFamily: '"Bodoni Moda", serif',
            borderRadius: "5px",
            fontWeight: "bold",
            textTransform: "uppercase",
            transition: "background 0.3s ease, color 0.3s ease",
            cursor: item.available ? 'pointer' : 'not-allowed'
          }}
          onClick={() => item.available && handleAddToCart(item)}
          disabled={!item.available}
        >
          {item.available ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
    );
  })}
</div>

        </div>
  </>
    );
};

export default MenuPage;
