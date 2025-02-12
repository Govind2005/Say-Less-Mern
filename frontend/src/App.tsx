import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateItem from "./pages/CreateItem";
import Navbar from "./components/Navbar";
import MenuPage from "./pages/MenuPage";
import SignInPage from "./pages/SIgnInPage"; // Correct the file name casing
import CartPage from "./pages/CartPage";

function App() {
  return (

    <BrowserRouter> {/* Wrap everything with BrowserRouter */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<CreateItem />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
