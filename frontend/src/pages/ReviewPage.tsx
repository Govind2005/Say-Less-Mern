import { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';

const ReviewPage = () => {
  const [reviews, setReviews] = useState<{ _id: string; comment: string; name: string; star: number, visible: boolean}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews from the API
  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/review');
      
      if (response.ok) {
        const data = await response.json();
        setReviews(data.data); // Assuming the response is the reviews array directly
        setLoading(false);
      } else {
        setError('Failed to fetch reviews');
        setLoading(false);
      }
    } catch (error) {
      setError('Error fetching reviews: ' + (error as Error).message);
      setLoading(false);
    }
  };

  // Handle the deletion of a review
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/review/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews(reviews.filter(review => review._id !== id)); // Update the state by removing the deleted review
      } else {
        setError('Failed to delete review');
      }
    } catch (error) {
      setError('Error deleting review: ' + (error as Error).message);
    }
  };

  // Handle toggling the visibility of a review
  const handleVisibilityToggle = async (id: string, currentVisibility: boolean) => {
    try {
      const response = await fetch(`http://localhost:4000/api/review/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visible: !currentVisibility }), // Toggle the visibility
      });

      if (response.ok) {
        setReviews(reviews.map(review => 
          review._id === id ? { ...review, visible: !currentVisibility } : review
        ));
      } else {
        setError('Failed to toggle visibility');
      }
    } catch (error) {
      setError('Error toggling visibility: ' + (error as Error).message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []); // Empty dependency array ensures this only runs once on component mount

  return (
    <>
      <AdminNavbar />
      <div className="p-4 mt-32">
        <h1 className="text-3xl font-semibold text-center mb-6">Customer Reviews</h1>

        {loading && <p className="text-center text-xl">Loading reviews...</p>}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{review.name}</h3>
                <p className="text-gray-700 mt-2">{review.comment}</p>
                <p className="mt-2 text-yellow-500">
                  {"⭐".repeat(review.star)} {/* Display star ratings */}
                </p>

                {/* Visibility Toggle Button */}
                <button 
                  onClick={() => handleVisibilityToggle(review._id, review.visible)} 
                  className={`mt-2 ${review.visible ? 'text-green-500' : 'text-gray-500'} hover:text-green-700`}>
                  {review.visible ? 'Hide' : 'Show'} Review
                </button>

                {/* Delete Button */}
                <button 
                  onClick={() => handleDelete(review._id)} 
                  className="mt-2 text-red-500 hover:text-red-700 ml-2">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewPage;
