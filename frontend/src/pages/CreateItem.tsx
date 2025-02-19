import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
// import cloudinary from '..\Say-Less-Mern\backend\server.js'; // Import the configured Cloudinary

// // Define the return type for the uploadImage function
// const uploadImage = async (filePath: string): Promise<string | undefined> => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: "bakery-shop", // Optional folder in Cloudinary
//     });
//     console.log(result);
//     return result.secure_url; // Return the image URL
//   } catch (error) {
//     console.error("Cloudinary Upload Error:", error);
//   }
// };


const CreateItem = () => {
    const [newItem,setNewItem] = useState({
        name:"",
        type:"",
        image:"",
        price:0,
        available:""
    });
    const [preview, SetPreview] = useState("");
    const handleAddItem = async (e:any) => {
        e.preventDefault();
        if (!preview) return;
        try {
            const response = await fetch('http://localhost:4000/api/item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...newItem, image_url: preview })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Item created successfully:', data);
                // Reset form after successful creation
                setNewItem({
                    name: "",
                    type: "",
                    image: "",
                    price: 0,
                    available: ""
                });
                // You might want to add a success message or redirect here
            } else {
                console.error('Failed to create item');
            }
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };
    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        if (!file) return;
      
        const reader = new FileReader();
        reader.onloadend = function () {
          const result = reader.result;
          if (result && typeof result === "string") {
            SetPreview(result);
          }
        };
        reader.readAsDataURL(file);
      };
      
      function refreshPage() {
        window.location.reload();
      }
    return (
        <>
        <AdminNavbar/>
        <div className="mt-16 min-h-screen bg-pink-50 py-10">
            <h1 className="text-4xl font-semibold text-center mb-8 text-pink-800">Create New Item</h1>
            
            <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-pink-200">
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full p-3 mb-4 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300"
                />
                
                <input 
                    type="text"
                    placeholder="Type"
                    name="type"
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    className="w-full p-3 mb-4 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300"
                />

                <div className="mb-4">
                    <input 
                        type="file"
                        placeholder="Add Your File"
                        name="image"
                        onChange={(e) => { handleFileUpload(e); setNewItem({ ...newItem, image: e.target.value }) }}
                        className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                    />
                    {preview && (
                        <div className="mt-4 rounded-lg overflow-hidden border border-pink-200">
                            <img 
                                src={preview} 
                                alt="Item preview" 
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    )}
                </div>
                
                <input 
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="w-full p-3 mb-4 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300"
                />
                
                <input 
                    type="text"
                    placeholder="Available (true/false)"
                    name="available"
                    value={newItem.available}
                    onChange={(e) => setNewItem({ ...newItem, available: e.target.value })}
                    className="w-full p-3 mb-6 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300"
                />
                
                <button 
                    onClick={(e) => { handleAddItem(e); refreshPage(); }}
                    className="w-full bg-pink-600 text-white p-4 rounded-lg hover:bg-pink-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    <span className="font-bold text-lg">Add Item</span>
                </button>
            </div>
        </div>
        </>
    );
};

export default CreateItem;