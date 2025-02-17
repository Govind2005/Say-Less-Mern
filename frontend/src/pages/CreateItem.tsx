import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const CreateItem = () => {
    const [newItem, setNewItem] = useState({
        name: "",
        type: "",
        image: "",
        price: 0,
        available: ""
    });

    const [message, setMessage] = useState({ text: "", type: "" });

    const handleAddItem = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem)
            });

            if (response.ok) {
                const data = await response.json();
                setMessage({ text: "Item added successfully!", type: "success" });
                setNewItem({
                    name: "",
                    type: "",
                    image: "",
                    price: 0,
                    available: ""
                });
            } else {
                setMessage({ text: "Failed to add item. Please try again.", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Error adding item. Please check your connection.", type: "error" });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value
        }));
    };

    return (
        <div className="min-h-screen">
            <AdminNavbar />
            <div className="flex min-h-screen">
                {/* Left half with background image */}
                <div 
                    className="hidden md:block w-1/2 bg-cover bg-center relative"
                    style={{
                        backgroundImage: "url('/bakery.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-brown-800/20" />
                </div>
                
                {/* Right half with form */}
                <div className="w-full md:w-1/2 bg-[#FFF5EE]">
                    <div className="max-w-md mx-auto px-4 pt-24 pb-12"> <br></br> <br></br> <br></br> <br></br> 
                        <h1 className="text-3xl md:text-4xl font-serif text-center mb-8 text-[#8B7355]">
                            Add New Bakery Item
                        </h1>

                        {message.text && (
                            <div className={`mb-4 p-3 rounded-lg text-center ${
                                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                                {message.text}
                            </div>
                        )}

                        <div className="bg-white rounded-2xl shadow-lg border border-[#FFE4E1] p-6 md:p-8">
                            <div className="space-y-5">
                                {[
                                    { name: "name", type: "text", placeholder: "Item Name" },
                                    { name: "type", type: "text", placeholder: "Category (e.g., Pastry, Bread, Cake)" },
                                    { name: "image", type: "text", placeholder: "Image URL" },
                                    { name: "price", type: "number", placeholder: "Price" },
                                    { name: "available", type: "text", placeholder: "Available (true/false)" }
                                ].map((field) => (
                                    <input 
                                        key={field.name}
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={newItem[field.name]}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-[#FFE4E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB7B2] bg-white placeholder-[#C4A484] transition-all duration-200"
                                    />
                                ))}
                                
                                <button 
                                    onClick={handleAddItem}
                                    className="w-full bg-gradient-to-r from-[#C4A484] to-[#8B7355] text-white p-4 rounded-lg hover:from-[#8B7355] hover:to-[#C4A484] transition duration-300 shadow-md font-serif text-lg"
                                >
                                    Add to Bakery Menu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateItem;