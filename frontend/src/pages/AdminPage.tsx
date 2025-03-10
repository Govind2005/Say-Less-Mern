import { Link} from 'react-router-dom';
import { Cake, ShoppingCart, Box, Activity, Coffee, Mail, Phone, MapPin} from "lucide-react";
import { Card } from '../components/ui/card';
import AdminNavbar from '../components/AdminNavbar';
import LoginPage from './LoginPage';


const AdminPage = () => {

    return (
      <>
      {localStorage.getItem('isLoggedIn') === 'false' && <LoginPage/>
         }
{localStorage.getItem('isLoggedIn') === 'true' &&
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      {/* Header */}
      <AdminNavbar/>

      {/* Main Content */}
      <main className="px-6 mt-16 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-pink-700 mb-2">Welcome back, Bakery Admin!</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-pink-500">
            <Coffee className="h-4 w-4" />
            Bakery Dashboard
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif text-pink-700 text-center mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cake, bg: 'bg-pink-200', text: 'text-pink-600', title: 'Add New Pastry', desc: 'Add a new item to the menu',link:"/add" },
              { icon: Box, bg: 'bg-purple-200', text: 'text-purple-600', title: 'Edit Current Items', desc: 'Make Changes in current items',link:"/edit" },
              { icon: ShoppingCart, bg: 'bg-green-200', text: 'text-green-600', title: 'Orders', desc: 'View current orders',link:"/order" },
              { icon: Activity, bg: 'bg-yellow-200', text: 'text-yellow-600', title: 'Reviews', desc: 'View sales statistics',link:"/review" }
            ].map((action, index) => (
                <Link to={action.link}>
              <Card key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${action.bg} ${action.text}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-700">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.desc}</p>
                  </div>
                </div>
              </Card>
                </Link>
            ))}
          </div>
        </section>

        {/* Bakery Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-pink-700 mb-6 text-center">Bakery Information</h2>
          <Card className="p-8 bg-white rounded-xl shadow-lg">
            <div className="grid gap-6 md:grid-cols-2">
              {[{ icon: Coffee, label: 'Bakery Name', value: "Bindi's Cupcakery" },
                { icon: Mail, label: 'Instagram', value: '@bindis_cupcakery' },
                { icon: Phone, label: 'Contact', value: '9978677790' },
                { icon: MapPin, label: 'Location', value: 'Cloud kitchen in parle point , surat' },
              ].map((info, index) => (
                <div key={index} className="flex items-center gap-4 bg-pink-50 p-4 rounded-lg">
                  <info.icon className="h-5 w-5 text-pink-600" />
                  <div>
                    <div className="text-sm text-gray-500">{info.label}</div>
                    <div className="font-medium text-gray-700">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

      </main>
    </div>}
              </>
    );
};

export default AdminPage;
