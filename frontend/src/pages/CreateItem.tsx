import { useState } from "react";

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
        <h1>Create New Item</h1>
        <input 
            type="text"
            placeholder="name"
            name="name"
            value={newItem.name}
            onChange={(e)=> setNewItem({...newItem,name:e.target.value})} 
        />
        <br />
        <br />
        <input 
            type="text"
            placeholder="type"
            name="type"
            value={newItem.type}
            onChange={(e)=> setNewItem({...newItem,type:e.target.value})} 
        />
        <br />
        <br />
        <input 
            type="text"
            placeholder="image link"
            name="image"
            value={newItem.image}
            onChange={(e)=> setNewItem({...newItem,image:e.target.value})} 
        />
        <br />
        <br />
        <input 
            type="number"
            placeholder="price"
            name="price"
            value={newItem.price}
            onChange={(e)=> setNewItem({...newItem,price:e.target.value})} 
        />
        <br />
        <br />
        <input 
            type="string"
            placeholder="available"
            name="available"
            value={newItem.available}
            onChange={(e)=> setNewItem({...newItem,available:e.target.value})} 
        />
        <br />
        <br />
        <button onClick={handleAddItem}><h2>Add</h2></button>
        </>
    )
}
export default CreateItem;