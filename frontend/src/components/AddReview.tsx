import { useState } from "react";

const CreateReview = () => {
  const [newReview, setNewReview] = useState({
    name: "",
    comment: "",
    star: 0,
    visible: false,
  });

  // Handle star click
  const handleStarClick = (index: number) => {
    setNewReview({ ...newReview, star: index + 1 });
  };

  // Submit the review
  const handleAddReview = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Item created successfully:", data);
        // Reset form after successful creation
        setNewReview({
          name: "",
          comment: "",
          star: 0,
          visible: false,
        });
        // You might want to add a success message or redirect here
      } else {
        console.error("Failed to create item");
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  // Toggle visibility of the review form
  const toggleVisibility = () => {
    setNewReview((prevState) => ({ ...prevState, visible: !prevState.visible }));
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Add Review Button with Plus Icon */}
        <button
          onClick={toggleVisibility}
          className="w-full bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition duration-300 mb-4 flex items-center justify-center"
        >
          <span className="mr-2">+</span>
          <h2 className="font-bold text-lg">Add Review</h2>
        </button>

        {/* Review Form Dropdown */}
        <div
          className={`transition-all ease-in-out duration-500 overflow-hidden ${
            newReview.visible ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            className="w-full p-3 mb-4 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50"
          />

          <input
            type="text"
            placeholder="Comment"
            name="comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-3 mb-4 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50"
          />

          {/* Star Rating System */}
          <div className="flex justify-between mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                onClick={() => handleStarClick(index)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={newReview.star > index ? "gold" : "#F0F0F0"} // Light grey for unselected stars
                stroke="#D3D3D3" // Lighter border color
                strokeWidth="1.5" // Thinner border
                className={`w-8 h-8 cursor-pointer ${index === 0 ? "ml-2" : ""} ${index === 4 ? "mr-2" : ""}`} // Add margin to the first and last stars
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.4l3.2 6.4 7.2 1.1-5.2 5.1 1.3 7.6-6.8-3.6-6.8 3.6 1.3-7.6-5.2-5.1 7.2-1.1 3.2-6.4z"
                />
              </svg>
            ))}
          </div>

          <button
            onClick={handleAddReview}
            className="w-full bg-pink-600 text-white p-3 rounded-md hover:bg-pink-700 transition duration-300 mb-4"
          >
            <h2 className="font-bold text-lg">Submit Review</h2>
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateReview;
