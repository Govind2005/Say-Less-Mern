import { useState, useEffect } from "react";

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
        } catch (error: unknown) {
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
        <div style={{backgroundColor:"#fff6fd", padding: "40px", fontFamily: '"Bodoni Moda", serif'}}>
            {/* Filter Bar */}
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
                fontSize: "4rem",
 fontFamily: '"Monsieur La Doulaise", cursive' ,     
            marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px"
            }}>
                ~~~ Our Delicious Creations ~~~
             </h1>

            {/* Items Grid */}
            <div 
  style={{ 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fill, minmax(500px, 2fr))", // Fewer columns
    gridAutoRows: "10px", // Bigger row height to make images squarer
    gap: "20px", 
    padding: "20px"
  }}
>
  {filteredItems.map((item) => {
    const randomHeight = Math.floor(Math.random() * 90) + 200; // 280px - 350px

    return (
      <div 
        key={item._id} 
        style={{
          position: "relative",
         // borderRadius: "30px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          transition: "transform 0.3s ease-in-out",
          fontFamily: '"Bodoni Moda", serif' ,
          cursor: "pointer",
          gridRowEnd: `span ${Math.floor(randomHeight / 15)}` // Adjusted row span
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.3s ease"
          }}
        />
        <div 
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
            display: "flex",
            flexDirection: "column",
            fontFamily: '"Bodoni Moda", serif' ,
            justifyContent: "flex-end",
            padding: "15px",
            color: "#fff"
          }}
        >
          <h2 style={{ color:"white", fontSize: "1.6rem", fontWeight: "bold", fontFamily: '"Bodoni Moda", serif' ,marginBottom: "5px" }}>
            {item.name}
          </h2>
          <p style={{ fontSize: "1rem", fontFamily: '"Bodoni Moda", serif' ,fontWeight: "500" }}>Type: {item.type}</p>
          <p style={{fontFamily: '"Bodoni Moda", serif' , fontSize: "1rem" }}>
            Price: <span style={{ fontFamily: '"Bodoni Moda", serif' ,fontWeight: "bold"}}>${item.price}</span>
          </p>
          <button 
            style={{
                background: "transparent",
                color: "white",
                fontSize: "1rem",
                padding: "10px 25px",
                border: "2px solid white",
                fontFamily: '"Bodoni Moda", serif' ,
                borderRadius: "5px",
               // cursor: "pointer",
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
    );
};

export default MenuPage;
