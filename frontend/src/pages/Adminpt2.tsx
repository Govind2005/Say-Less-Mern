import { Package, ShoppingCart, Box, Activity, Building2, Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card } from "../components/ui/card"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="text-xl font-bold">MedShare</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium">
              Home
            </a>
            <a href="#" className="text-sm font-medium">
              Marketplace
            </a>
            <a href="#" className="text-sm font-medium">
              About
            </a>
            <a href="#" className="text-sm font-medium">
              Dashboard
            </a>
            <div className="h-8 w-8 rounded-full bg-purple-600 text-white grid place-items-center">G</div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back, City Hospital</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            Hospital Dashboard
            <span className="mx-2">•</span>
            2/1/2025
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <Box className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Add Item</h3>
                  <p className="text-sm text-muted-foreground">Add new medical supplies</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Market</h3>
                  <p className="text-sm text-muted-foreground">Browse available items</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Total Items</h3>
                  <p className="text-sm text-muted-foreground">0 items listed</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Hospital Information */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Hospital Information</h2>
          <Card className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center gap-4">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Hospital Name</div>
                  <div className="font-medium">City Hospital</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Email Address</div>
                  <div className="font-medium">homehospital@example.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Contact Number</div>
                  <div className="font-medium">+91 9276543210</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium">12.9716, 77.5946</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Member Since</div>
                  <div className="font-medium">2/1/2025</div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* My Listed Items */}
        <section>
          <h2 className="text-lg font-semibold mb-4">My Listed Items</h2>
          <Card className="p-6">{/* Add your listed items content here */}</Card>
        </section>
      </main>
    </div>
  )
}

