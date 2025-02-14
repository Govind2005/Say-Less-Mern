import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateItem from "./pages/CreateItem";
import Navbar from "./components/Navbar";
import MenuPage from "./pages/MenuPage";

import MenuItems from "./pages/MenuItems";
import CartPage from "./pages/CartPage";
import LoginPage from './pages/LoginPage';
import EditItemPage from './pages/EditItemPage';
import ProtectedRoute from './components/ProtectedRoute';
import EditItemDetailsPage from "./pages/EditItem";
import Gallery from "./components/Gallery";
import About from "./components/About";
import ReviewPage from "./pages/ReviewPage";
import OrderPage from "./pages/OrderPage";
import Slider from "./pages/Slider";
function App() {
  return (
    <BrowserRouter> {/* Wrap everything with BrowserRouter */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menuitems" element={<MenuItems />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/slider" element={<Slider/>} />
        <Route path="/what" element={<WhatsappPage />} />
        
        {/* <Route path="/edit/:id" element={<EditItemDetailsPage />} /> */}
        <Route 
          path="/add" 
          element={
            <ProtectedRoute>
              <CreateItem />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit" 
          element={
            <ProtectedRoute>
              <EditItemPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/review" 
          element={
            <ProtectedRoute>
              <ReviewPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/order" 
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit/:id" 
          element={
            <ProtectedRoute>
              <EditItemDetailsPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
