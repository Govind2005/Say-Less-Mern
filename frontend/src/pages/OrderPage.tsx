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
    <div className="p-6 mt-32">
      <h1 className="text-4xl font-bold text-center mb-6">Order List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order for {order.name}</h2>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Paid {!order.paid && "false"}</h2>
            <p className="text-gray-600 mb-2"><strong>Phone Number:</strong> {order.phoneNumber}</p>
            <p className="text-gray-600 mb-2"><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-700">Items:</h3>
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <span className="text-gray-500">{item.quantity} x</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p><strong>Special Instructions:</strong> {item.special || 'N/A'}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-900">Total: ${order.total.toFixed(2)}</span>
              <button
                className="bg-blue-200 text-white px-4 py-2 rounded-lg hover:bg-blue-300"
                onClick={() => deleteOrder(order._id)}
                >
                <div className="flex items-center">
      <FaCheckCircle className="text-green-500 text-4xl" /> {/* Checkmark icon with styling */}
      <span className="ml-2">Order Picked</span> {/* Text next to the icon */}
    </div>
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
