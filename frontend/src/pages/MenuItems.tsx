import { useState, useEffect } from "react";
import CartBox from "../components/CartBox";
import toast from "react-hot-toast";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
  const [specialHampers, setSpecialHampers] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page// State for special hampers filter

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
  
  
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    
    const prevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* Navigation Bar */}
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

      {/* CartBox with higher z-index */}
      <div className="relative z-50">
        <CartBox />
      </div>

      <div className="mt-16" style={{backgroundColor:"#fff6fd", padding: "40px", fontFamily: '"Bodoni Moda", serif'}}>
            
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
            {/* Filter & Hamper Bar (Same Row) */}  
<div className="flex justify-between items-center mb-8 px-4">
  
  {/* Filter Bar (Left) */}
  <div className="flex gap-3 flex-wrap">
    {["All", "Cake", "Truffle Balls", "Brownie & Brownie Tub", "Donut", "Cookie"].map((cat) => (
      <button
        key={cat}
        onClick={() => setCategory(cat)}
        className={`px-5 py-2 rounded-2xl text-base font-bold transition duration-300 cursor-pointer ${
          category === cat ? "bg-[#7A3E3E] text-white" : "bg-[#F4D0D0] text-[#7A3E3E]"
        }`}
      >
        {cat}
      </button>
    ))}

    {/* Search Bar */}
    {isSearching ? (
      <div className="flex items-center gap-2 rounded-2xl bg-[#FDF7F7] border-3 border-[#7A3E3E]">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-1 outline-none w-48 sm:w-64"
        />
        <button onClick={() => setIsSearching(false)} className="text-gray-500 hover:text-gray-700 px-2 transition">
          ✖
        </button>
      </div>
    ) : (
      <button
        onClick={() => setIsSearching(true)}
        className="px-4 py-2 rounded-2xl text-base font-bold transition duration-300 cursor-pointer bg-[#F4D0D0] text-[#7A3E3E]"
      >
        <FaSearch />
      </button>
    )}
  </div>

  {/* Hamper Dropdown (Right) */}
  <select
    value={specialHampers}
    onChange={(e) => setSpecialHampers(e.target.value)}
    className="px-6 py-3 rounded-2xl text-base font-bold transition duration-300 cursor-pointer bg-[#F8E6E6] text-[#7A3E3E] border border-[#7A3E3E] shadow-md outline-none focus:ring-2 focus:ring-[#7A3E3E] hover:bg-[#F4D0D0]"
  >
    <option value="All" className="bg-[#ffeac2]">All Hampers</option>
    <option value="Birthday" className="bg-[#ffeac2]">Birthday</option>
    <option value="Anniversary" className="bg-[#ffeac2]">Anniversary</option>
    <option value="Holi" className="bg-[#ffeac2]">Holi</option>
    <option value="Rakshabandhan" className="bg-[#ffeac2]">Rakshabandhan</option>
  </select>

</div>

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
          {currentItems.length > 0 ? (
            currentItems.map((item) => {
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
                      fontFamily: '"Bodoni Moda", serif',
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
                        fontFamily: '"Bodoni Moda", serif',
                        justifyContent: "flex-end",
                        padding: "15px",
                        color: "#fff"
                      }}
                    >
                      <h2 style={{ color: "white", fontSize: "1.6rem", fontWeight: "bold", fontFamily: '"Bodoni Moda", serif', marginBottom: "5px" }}>
                        {item.name}
                      </h2>
                      <p style={{ fontSize: "1rem", fontFamily: '"Bodoni Moda", serif', fontWeight: "500" }}>Type: {item.type}</p>
                      <p style={{ fontFamily: '"Bodoni Moda", serif', fontSize: "1rem" }}>
                        Price: <span style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: "bold" }}>${item.price}</span>
                      </p>
                      <button
                        style={{
                          background: "transparent",
                          color: "white",
                          fontSize: "1rem",
                          padding: "10px 25px",
                          border: "2px solid white",
                          fontFamily: '"Bodoni Moda", serif',
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
            })):(
              <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#7A3E3E" }}>No items found</p>
            )}
        </div>
        {totalPages > 1 && (
  <div className="flex justify-center items-center mt-6 gap-2">
    {/* Previous Button */}
    <button
      onClick={prevPage}
      disabled={currentPage === 1}
      className={`px-3 py-3 rounded-md transition ${
        currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#ffeac2] hover:bg-[#ffdb91] text-[#7A3E3E]"
      }`}
    >
      <FaArrowLeft/>
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`px-4 py-2 rounded-full transition font-semibold ${
          currentPage === page
            ? "bg-[#b35a7a] text-white"
            : "bg-[#ffeac2] text-[#7A3E3E] hover:bg-[#ffdb91]"
        }`}
      >
        {page}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={nextPage}
      disabled={currentPage === totalPages}
      className={`px-3 py-3 rounded-md transition ${
        currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-[#ffeac2] hover:bg-[#ffdb91] text-[#7A3E3E]"
      }`}
    >
      <FaArrowRight />
    </button>
  </div>
)}

      </div>
      
    </>
  );
};

export default MenuPage;
