import { useState } from "react";
import { NavLink } from "react-router";

const CreateItem = () => {
    const [newItem,setNewItem] = useState({
        name:"",
        type:"",
        image:"",
        price:0,
        available:""
    });
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

    return (
        <>
        
    <h1 className="text-3xl font-semibold text-center mb-6">Create New Item</h1>
    
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <input 
            type="text"
            placeholder="Name"
            name="name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
            type="text"
            placeholder="Type"
            name="type"
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
            type="text"
            placeholder="Image Link"
            name="image"
            value={newItem.image}
            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
            type="number"
            placeholder="Price"
            name="price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
            type="text"
            placeholder="true/false"
            name="available"
            value={newItem.available}
            onChange={(e) => setNewItem({ ...newItem, available: e.target.value })}
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button 
            onClick={handleAddItem}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 mb-4"
        >
            <h2 className="font-bold text-lg">Add Item</h2>
        </button>

        <NavLink to={"/"}>
            <button 
                onClick={() => localStorage.setItem('isLoggedIn', 'false')}
                className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition duration-300"
            >
                Log Out
            </button>
        </NavLink>
    </div>
</>

    )
}
export default CreateItem;