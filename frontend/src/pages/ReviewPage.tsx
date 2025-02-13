import { useState, useEffect } from 'react';

const ReviewPage = () => {
  const [reviews, setReviews] = useState<{ _id: string; comment: string; name: string; star: number}[]>([]);
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

  useEffect(() => {
    fetchReviews();
  }, []); // Empty dependency array ensures this only runs once on component mount

  return (
    <div className="p-4">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
