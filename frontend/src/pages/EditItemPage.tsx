import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const EditItemPage = () => {
    const [items, setItems] = useState<{ _id: string; image: string; name: string; type: string; price: number; available: boolean }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
        // Load elegant script font
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&family=Poppins:wght@300;400;500;600;700&display=swap";
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
            setError('Error fetching items: ' + (error as Error).message);
            setLoading(false);
        }
    };

    // Filtered Items based on category selection
    const filteredItems = category === "All" ? items : items.filter(item => item.type === category);

    const handleDeleteItem = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:4000/api/item/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setItems((prevItems) => prevItems.filter(item => item._id !== id));
                console.log(`Item with ID ${id} deleted successfully`);
            } else {
                setError("Failed to delete the item");
            }
        } catch (error) {
            setError('Error deleting item: ' + (error as Error).message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <AdminNavbar />
            <div className="mt-24 md:mt-32 min-h-screen bg-gradient-to-br from-amber-50 to-pink-50 px-4 py-8 md:py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Elegant Heading */}
                    <h1 className="text-center text-brown-700 text-4xl md:text-5xl lg:text-6xl font-cursive mb-6 md:mb-8"
                         style={{ fontFamily: "'Monsieur La Doulaise', cursive" }}>
                        ~ Our Delicious Creations ~
                    </h1>
                    
                    {/* Filter Bar */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10">
                        {["All", "Cake", "Cupcakes", "Pastry", "Donut", "Cookie"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`py-2 px-4 md:px-6 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                                    category === cat 
                                        ? 'bg-brown-600 text-white shadow-md transform scale-105' 
                                        : 'bg-pink-100 text-brown-600 hover:bg-pink-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {filteredItems.map((item) => (
                            <div 
                                key={item._id} 
                                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-pink-100"
                            >
                                <div className="relative h-48 md:h-56 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <span 
                                        className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${
                                            item.available 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {item.available ? "Available" : "Out of Stock"}
                                    </span>
                                </div>
                                
                                <div className="p-4 md:p-5">
                                    <h2 className="text-brown-700 text-lg md:text-xl font-medium line-clamp-1">{item.name}</h2>
                                    <p className="text-brown-500 text-sm mt-1">Type: {item.type}</p>
                                    <p className="text-brown-800 font-semibold mt-2">Price: ${item.price.toFixed(2)}</p>
                                    
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => navigate(`/edit/${item._id}`)}
                                            className="flex-1 py-2 bg-brown-600 text-white text-sm rounded hover:bg-brown-700 transition duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(item._id)}
                                            className="flex-1 py-2 bg-pink-500 text-white text-sm rounded hover:bg-pink-600 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditItemPage;