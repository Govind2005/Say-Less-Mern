import { useState } from "react";

const CreateReview = () => {
    const [newReview,setNewReview] = useState({
        name:"",
        comment:"",
        star:0,
        visible:false
    });
    const handleAddReview = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Item created successfully:', data);
                // Reset form after successful creation
                setNewReview({
                    name: "",
                    comment: "",
                    star: 0,
                    visible:false
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
        
    <h1 className="text-3xl font-semibold text-center mb-6">Add Review</h1>
    
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <input 
            type="text"
            placeholder="Name"
            name="name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}

            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
            type="text"
            placeholder="comment"
            name="comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        
        <input 
            type="number"
            placeholder="Stars"
            name="star"
            value={newReview.star}
            onChange={(e) => setNewReview({ ...newReview, star: Number(e.target.value) })}

            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        
        <button 
            onClick={handleAddReview}
            className="w-full bg-blue-500 text-white p-3  rounded-md hover:bg-blue-600 transition duration-300 mb-4"
        >
            <h2 className="font-bold text-lg">Add Review</h2>
        </button>

    </div>
</>

    )
}
export default CreateReview;