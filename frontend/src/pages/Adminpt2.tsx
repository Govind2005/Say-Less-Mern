import { Cake, ShoppingCart, Box, Activity, Coffee, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card } from "../components/ui/card1";
import { NavLink, useNavigate, Link } from 'react-router-dom';

export default function BakeryDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img className="h-10 object-contain" src="./logo.jpg" alt="Bakery Logo" />
            <span className="text-xl font-semibold text-gray-800 tracking-tight">Admin Dashboard</span>
          </div>
          <nav className="flex items-center gap-8">
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-serif">Welcome back, Bakery Admin</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Coffee className="h-4 w-4" />
            <span className="font-medium">Bakery Management Dashboard</span>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-gray-800 font-semibold mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cake, bg: 'bg-pink-100', text: 'text-pink-700', title: 'Add New Pastry', desc: 'Add a new item to the menu', link: '/add' },
              { icon: ShoppingCart, bg: 'bg-green-100', text: 'text-green-700', title: 'Edit', desc: 'Edit an Iten', link: '/edit' },
              { icon: Box, bg: 'bg-purple-100', text: 'text-purple-700', title: 'Orders', desc: 'Check orders and status', link: '/order' },
              { icon: Activity, bg: 'bg-blue-100', text: 'text-blue-700', title: 'Review', desc: 'Check customer reviews ', link: '/review' }
            ].map((action, index) => (
              <Link key={index} to={action.link} className="block">
                <Card className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${action.bg} ${action.text}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-base text-gray-800">{action.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{action.desc}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Bakery Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 text-center">Bakery Information</h2>
          <Card className="p-6 md:p-8 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              {[
                { icon: Coffee, label: 'Bakery Name', value: 'Bindis Cupcakery' },
                { icon: Mail, label: 'Email', value: 'sweettreats@example.com' },
                { icon: Phone, label: 'Contact', value: '+91 9876543210' },
                { icon: MapPin, label: 'Location', value: 'Baker Street, Bangalore' },
                { icon: Clock, label: 'Serving Since', value: '1/5/2022' }
              ].map((info, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-md border border-gray-100">
                  <div className="p-2 rounded-full bg-gray-100 text-gray-700">
                    <info.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-gray-500">{info.label}</div>
                    <div className="font-medium text-gray-800 mt-1">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Listed Bakery Items */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 text-center">My Bakery Items</h2>
          <Card className="p-8 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Cake className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-600">No items available.</p>
              <p className="text-sm text-gray-500 mt-2">Use the "Add New Pastry" action to add bakery items</p>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600">
          <p>© 2025 Sweet Treats Bakery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}