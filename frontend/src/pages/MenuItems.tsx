import { useState, useEffect } from "react";
import CartBox from "../components/CartBox";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

// interface CartItem {
//   _id: string;
//   name: string;
//   image:string;
//   quantity: number;
//   price:number;
//   special?: string;  // Optional special instructions
//   customize?: string; // Optional customization
// }
const MenuPage = () => {
    const [items, setItems] = useState<{ _id: string; image: string; name: string; type: string; price: number; available: boolean }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
  
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
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearch(searchTerm);
      }, 500);
      return () => clearTimeout(handler); // Cleanup on unmount or new input
  }, [searchTerm]);
    // Filtered Items based on category selection
    // const filteredItems = category === "All" ? items : items.filter(item => item.type === category);
    const filteredItems = items.filter(
      (item) =>
        (category === "All" || item.type.toLowerCase() === category.toLowerCase()) &&
        (debouncedSearch === "" || item.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    );
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
        <CartBox />
        <div style={{backgroundColor:"#fff6fd", padding: "40px", fontFamily: '"Bodoni Moda", serif'}}>
            {/* Filter Bar */}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <div className="flex justify-center gap-2 mb-8 font-bodoni">
      {["All", "Cake", "Truffle Balls", "Brownie & Brownie Tub", "Donut", "Cookie"].map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-5 py-2 rounded-2xl border-none text-base font-bold transition duration-300 cursor-pointer ${
            category === cat ? "bg-[#7A3E3E] text-white" : "bg-[#F4D0D0] text-[#7A3E3E]"
          }`}
        >
          {cat}
        </button>
      ))}

      {isSearching ? (
        // Search Bar (Replaces the search button)
        <div className="flex items-center gap-2 border border-gray-300 rounded-2xl bg-white shadow-md">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 outline-none w-48 sm:w-64"
          />
          <button onClick={() => setIsSearching(false)} className="text-gray-500 hover:text-gray-700 px-2 transition">
            ✖
          </button>
        </div>
      ) : (
        // Search Button
        <button
          onClick={() => setIsSearching(true)}
          className="px-4 py-2 rounded-2xl border-none text-base font-bold transition duration-300 cursor-pointer bg-[#F4D0D0] text-[#7A3E3E]"
        >
          <FaSearch />
        </button>
      )}
    </div>
           {/* Fancy Heading with SVG Lines */}
            <h1 className="text-center text-[#7A3E3E] font-monsieur mb-5 flex items-center justify-center gap-4" style={{
              fontSize: "6rem",
              fontFamily: '"Monsieur La Doulaise", cursive'
            }}>
                ~~~ Our Delicious Creations ~~~
             </h1>

            {/* Items Grid */}
            <div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(400px, 2fr))", // Fewer columns
                gridAutoRows: "10px", // Bigger row height to make images squarer
                gap: "25px", 
                padding: "20px"
              }}
            >
              {filteredItems.map((item) => {
                const randomHeight = Math.floor(Math.random() * 200) + 180; // 180px - 380px
                
                return (
                  <>
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
                      className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"

                      />
                    <div 
                      className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white font-bodoni"
                      >
                      <h2 style={{ color:"white", fontSize: "1.6rem", fontWeight: "bold", fontFamily: '"Bodoni Moda", serif' ,marginBottom: "5px" }}>
                        {item.name}
                      </h2>
                      <p style={{ fontSize: "1rem", fontFamily: '"Bodoni Moda", serif' ,fontWeight: "500" }}>Type: {item.type}</p>
                      <p className="text-base font-bodoni">
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
                    </>
                );
              })}
            </div>

        </div>
  </>
    );
};

export default MenuPage;
