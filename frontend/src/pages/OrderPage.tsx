import { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { FaCheckCircle } from 'react-icons/fa';

interface Item {
  item: { name: string };
  quantity: number;
  special?: string;
  customize?: string;
}

interface Order {
  _id: string;
  name: string;
  phoneNumber: string;
  items: Item[];
  total: number;
  orderDate: string;
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const deleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/order/${orderId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
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
      <div className="flex justify-center items-center h-screen bg-pink-100">
        <div className="animate-spin h-12 w-12 border-4 border-t-4 border-pink-400 rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="p-6 mt-32 bg-pink-50 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-6 text-pink-700">Order List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-pink-100 p-6 rounded-2xl shadow-md border border-pink-200 hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-semibold text-brown-800 mb-4">Order for {order.name}</h2>
              <p className="text-brown-700 mb-2"><strong>Phone Number:</strong> {order.phoneNumber}</p>
              <p className="text-brown-700 mb-2"><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <div className="mb-4">
                <h3 className="text-xl font-medium text-brown-800 mb-2">Items:</h3>
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-brown-700">
                      <div className="flex justify-between items-center">
                        <span>{item.item.name}</span>
                        <span className="text-brown-500">{item.quantity} x</span>
                      </div>
                      <div className="text-sm text-brown-600">
  <p><strong>Special Instructions:</strong> <span className="bg-yellow-100 px-2 py-1 rounded-md text-brown-800">{item.special || 'N/A'}</span></p>
  <p><strong>Customization:</strong> {item.customize || 'N/A'}</p>
</div>
  </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-semibold text-brown-900">Total: ${order.total.toFixed(2)}</span>
                <button
                  className="bg-green-200 text-brown-900 px-4 py-2 rounded-xl hover:bg-pink-400 transition-all duration-300"
                  onClick={() => deleteOrder(order._id)}
                >
                  <div className="flex items-center">
                    <FaCheckCircle className="text-brown-500 text-2xl" />
                    <span className="ml-2 font-medium">Order Picked ?</span>
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
