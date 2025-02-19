import { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { FaCheckCircle } from 'react-icons/fa';

// Define the interface for an individual Item
interface Item {
  item: {
    name: string;
  };
  name?: string,
  quantity: number;
  special?: string;
  customize?: string;
}

// Define the interface for the Order
interface Order {
  _id: string;
  name: string;
  phoneNumber: string;
  items: Item[];
  total: number;
  orderDate: string;
  paid: boolean
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from the server
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/order');
        const data = await response.json();
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Delete an order
  const deleteOrder = async (orderId: string) => {
    try {
      // Send a DELETE request to the server to delete the order by its ID
      const response = await fetch(`http://localhost:4000/api/order/${orderId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (data.success) {
        // If the deletion is successful, remove the order from the state
        setOrders(orders.filter(order => order._id !== orderId));
      } else {
        console.error("Failed to delete the order:", data.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-t-4 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <>
    <AdminNavbar/>
    <div className="p-6 mt-16 bg-pink-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-pink-800">Order List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg border border-pink-200 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-pink-800">Order for {order.name}</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.paid 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-gray-100 text-gray-800 border border-gray-300'
              }`}>
                {order.paid ? 'Paid' : 'Payment Pending'}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-pink-700">
                <span className="font-semibold">📱</span>
                <span>{order.phoneNumber}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-pink-700">
                <span className="font-semibold">📅</span>
                <span>{new Date(order.orderDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-6 bg-pink-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium text-pink-800 mb-3">Order Items:</h3>
              <ul className="space-y-3">
                {order.items.map((item, index) => (
                  <li key={index} className="border-b border-pink-100 pb-2">
                    <div className="flex justify-between items-center">
                      <span className="text-pink-700 font-medium">{item.name}</span>
                      <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    {item.special && (
                      <div className="text-sm text-pink-600 mt-1 italic">
                        Special Instructions: {item.special}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-xl font-bold text-pink-800">
                Total: ₹{order.total.toFixed(2)}
              </span>
              <button
                onClick={() => deleteOrder(order._id)}
                className="flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-lg transition-colors duration-300"
                title="Mark order as completed"
              >
                <FaCheckCircle className="text-2xl" />
                <span>Complete Order</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default OrderPage;
