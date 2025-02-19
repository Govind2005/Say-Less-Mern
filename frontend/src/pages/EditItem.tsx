import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const EditItemDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState<any>({ name: "", image: "", type: "", price: 0, available: false });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchItemDetails();
    }, [id]);

    const fetchItemDetails = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/item/${id}`);
            if (response.ok) {
                const data = await response.json();
                setItem(data.data);
                setLoading(false);
            } else {
                setError("Failed to fetch item details");
                setLoading(false);
            }
        } catch (error) {
            setError("Error fetching item: " + (error as Error).message);

            setLoading(false);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/item/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
            if (response.ok) {
                navigate("/edit");
            } else {
                setError("Failed to update the item here");
            }
        } catch (error) {
            setError("Error updating item: " + (error as Error).message);

        }
    };

    if (loading) return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-red-600">
                Error: {error}
            </div>
        </div>
    );

    return (
        <>
            <AdminNavbar/>
            <div className="min-h-screen bg-pink-50 pt-24 pb-12 px-4">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-pink-800 text-center mb-8">
                        Edit Item Details
                    </h1>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <div className="space-y-6">
                            {/* Name Input */}
                            <div>
                                <label className="block text-pink-800 font-medium mb-2">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter item name"
                                    value={item.name}
                                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                                />
                            </div>

                            {/* Image URL Input */}
                            <div>
                                <label className="block text-pink-800 font-medium mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter image URL"
                                    value={item.image}
                                    onChange={(e) => setItem({ ...item, image: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                                />
                                {item.image && (
                                    <div className="mt-2 rounded-lg overflow-hidden border border-pink-200">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Type Input */}
                            <div>
                                <label className="block text-pink-800 font-medium mb-2">
                                    Type
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter item type"
                                    value={item.type}
                                    onChange={(e) => setItem({ ...item, type: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                                />
                            </div>

                            {/* Price Input */}
                            <div>
                                <label className="block text-pink-800 font-medium mb-2">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter price"
                                    value={item.price}
                                    onChange={(e) => setItem({ ...item, price: Number(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                                />
                            </div>

                            {/* Available Toggle */}
                            <div className="flex items-center space-x-3">
                                <label className="text-pink-800 font-medium">
                                    Available
                                </label>
                                <div 
                                    onClick={() => setItem({ ...item, available: !item.available })}
                                    className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                        item.available ? 'bg-pink-600' : 'bg-gray-300'
                                    }`}
                                >
                                    <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                                        item.available ? 'translate-x-6' : ''
                                    }`}></div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={handleSaveChanges}
                                className="w-full bg-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-pink-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditItemDetailsPage;
