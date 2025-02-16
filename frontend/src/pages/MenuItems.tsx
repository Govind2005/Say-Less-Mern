import { useState, useEffect } from "react";
import CartBox from "../components/CartBox";
import toast from "react-hot-toast";
import { Link } from "react-router";
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
  const [items, setItems] = useState<{ _id: string; image: string; name: string; type: string; price: number; available: boolean; special?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [specialHampers, setSpecialHampers] = useState("All"); // State for special hampers filter

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
    const filteredItems = items.filter(
      (item) =>
        (category === "All" || item.type.toLowerCase() === category.toLowerCase()) &&
        (debouncedSearch === "" || item.name.toLowerCase().includes(debouncedSearch.toLowerCase())) &&
        (specialHampers === "All" || item.type === specialHampers)
    );

    const handleAddToCart = (item: any) => {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem._id === item._id);
  
      if (existingItemIndex !== -1) {
        toast.error('Item already in cart!', {
          duration: 1000,
          style: {
            border: '1px solid #b35a7a',
            padding: '16px',
            color: '#b35a7a',
            background: '#ffe4eb',
          },
          iconTheme: {
            primary: '#b35a7a',
            secondary: '#ffeac2',
          }
        });
      } else {
        existingCart.push({
          ...item,
          quantity: 1
        });
        toast.success('Added to cart!', {
          duration: 1000,
          style: {
            border: '1px solid #b35a7a',
            padding: '16px',
            color: '#b35a7a',
            background: '#ffe4eb',
          },
          iconTheme: {
            primary: '#b35a7a',
            secondary: '#ffeac2',
          }
        });
      }
  
      const totalItems = existingCart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(existingCart));
      localStorage.setItem('cartCount', totalItems.toString());
      console.log('Added to cart:', item.name);
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  const handleChange = () => {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <>
      <nav>
        <div className="rain-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="raindrop" />
          ))}
        </div>
        <div className="nav-links">
          <Link to="/admin" onClick={handleChange}>Admin</Link>
          <Link to="/about" onClick={handleChange}>About</Link>
          <div className="logo-container cursor-pointer">
            <Link to="/" onClick={handleChange}>
              <img src="https://res.cloudinary.com/dgtxyhdwa/image/upload/v1739618267/logo_kssytz.png" alt="logo" />
            </Link>
          </div>
          <Link to="/menu" onClick={handleChange}>Product</Link>
          <Link to="/gallery" onClick={handleChange}>Gallery</Link>
        </div>
      </nav>
        <CartBox />
        <div style={{backgroundColor:"#fff6fd", padding: "40px", fontFamily: '"Bodoni Moda", serif'}}>
            {/* Filter Bar */}           
          <div style={{ fontFamily: '"Bodoni Moda", serif' , display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px" }}>
                {["All", "Cake", "Truffle Balls", "Brownie & Brownie Tub", "Donut", "Cookie"].map((cat) => (
                  <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2 rounded-2xl border-none text-base font-bold transition duration-300 cursor-pointer ${
                    category === cat ? "bg-[#7A3E3E] text-white" : "bg-[#F4D0D0] text-[#7A3E3E]"
                  }`}                          >
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
        {/* Special Hampers Dropdown */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <select 
            value={specialHampers} 
            onChange={(e) => setSpecialHampers(e.target.value)} 
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: "20px",
              border: "1px solid #7A3E3E",
              backgroundColor: "#F4D0D0",
              fontWeight: "bold",
              color: "#7A3E3E",
              cursor: "pointer"
            }}
          >
            <option value="All">All Hampers</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Holi">Holi</option>
            <option value="Rakshabandhan">Rakshabandhan</option>
          </select>
        </div>
           {/* Fancy Heading with SVG Lines */}
            <h1 style={{
              textAlign: "center",
              color: "#7A3E3E",
              fontSize: "6rem",
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
        </>
    );
  })}
</div>

        </div>
  </>
    );
};

export default MenuPage;
