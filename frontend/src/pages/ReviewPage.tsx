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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto p-6 mt-20">
        {/* Header Section with Decorative Elements */}
        <div className="text-center mb-12 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-1 bg-gradient-to-r from-pink-200 via-pink-400 to-pink-200"></div>
          <h1 className="text-5xl font-bold text-pink-700 mb-3 font-serif">Customer Reviews</h1>
          <p className="text-pink-500 italic">Manage your valuable customer feedback</p>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-pink-200 via-pink-400 to-pink-200"></div>
        </div>
        
        {/* Status Panel with Glass Effect */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-12 border border-pink-100">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-white">
              <p className="text-gray-500 text-sm font-medium mb-1">Status</p>
              <p className="font-bold text-pink-600 text-lg">
                {loading ? 'Loading...' : 'Ready'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-white">
              <p className="text-gray-500 text-sm font-medium mb-1">Total Reviews</p>
              <p className="font-bold text-pink-600 text-lg">{reviews.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-white">
              <p className="text-gray-500 text-sm font-medium mb-1">Visible Reviews</p>
              <p className="font-bold text-pink-600 text-lg">
                {reviews.filter(r => r.visible).length}
              </p>
            </div>
          </div>
        </div>

        {/* Fancy Loading Animation */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200 border-t-pink-500"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="text-pink-500">🧁</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Message with Better Styling */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-8 shadow-md">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <h3 className="text-red-800 font-medium">Error Occurred</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State with Illustration */}
        {!loading && !error && reviews.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-pink-100">
            <span className="text-4xl mb-4 block">🧁</span>
            <h3 className="text-2xl font-semibold text-pink-700 mb-2">No Reviews Yet</h3>
            <p className="text-gray-500">Reviews will appear here once customers share their experiences</p>
          </div>
        )}

        {/* Reviews Grid with Enhanced Cards */}
        {!loading && !error && reviews.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className={`group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl
                  ${review.visible ? 'border-l-4 border-green-400' : 'border-l-4 border-gray-300'}`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{review.name}</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-lg mr-2">
                          {"⭐".repeat(review.star)}
                        </span>
                        <span className="text-sm text-gray-400">
                          {review.star}/5
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-pink-50 text-pink-600">
                      {review.visible ? 'Public' : 'Hidden'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 italic">"{review.comment}"</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-pink-100">
                    <button 
                      onClick={() => handleVisibilityToggle(review._id, review.visible)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                        ${review.visible 
                          ? 'bg-green-50 text-green-600 hover:bg-green-100 group-hover:shadow-md' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 group-hover:shadow-md'
                        }`}
                    >
                      {review.visible ? '👁️ Visible' : '👁️ Hidden'}
                    </button>
                    
                    <button 
                      onClick={() => handleDelete(review._id)}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 group-hover:shadow-md"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ReviewPage;
