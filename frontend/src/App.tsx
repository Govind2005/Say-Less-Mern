import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateItem from "./pages/CreateItem";
import MenuPage from "./pages/MenuPage";
import MenuItems from "./pages/MenuItems";
import CartPage from "./pages/CartPage";

import Adminpt2 from './pages/Adminpt2';
import AdminPage from './pages/AdminPage';
import EditItemPage from './pages/EditItemPage';
import ProtectedRoute from './components/ProtectedRoute';
import EditItemDetailsPage from "./pages/EditItem";
import Gallery from "./components/Gallery";
import About from "./components/About";
import ReviewPage from "./pages/ReviewPage";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <BrowserRouter> {/* Wrap everything with BrowserRouter */}
      {/* <Navbar /> */}
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menuitems" element={<MenuItems />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<CartPage />} />
     
        <Route 
          path="/add" 
          element={
           <ProtectedRoute>
              <CreateItem />
            </ProtectedRoute>
          } 
        />
                <Route 
          path="/admindb" 
          element={
            <ProtectedRoute>
              <Adminpt2 />
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
