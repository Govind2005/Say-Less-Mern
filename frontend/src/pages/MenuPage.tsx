import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CartPage from "./CartPage";

interface Item {
  _id: string;
  image: string;
  name: string;
  type: string;
  price: number;
  available: boolean;
}

const MenuPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
    const existingCart: Item[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(existingCart);
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/item");
      if (!response.ok) throw new Error("Failed to fetch items");

      const data = await response.json();
      setItems(data.data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = category === "All" ? items : items.filter(item => item.type === category);

  const handleAddToCart = (item: Item) => {
    if(!item.available){
      toast.error("Item is out of stock.", {
        style: {
          border: "1px solid purple",
          padding: "16px",
          color: "pink",
        },
        iconTheme: {
          primary: "pink",
          secondary: "#FFFAEE",
        },
      });
      return;
    }

    const existingCart: Item[] = JSON.parse(localStorage.getItem("cart") || "[]");
    if(existingCart.find(cartItem => cartItem._id === item._id)){
      toast.error("Item already in cart.", {
        style: {
          border: "1px solid purple",
          padding: "16px",
          color: "pink",
        },
        iconTheme: {
          primary: "pink",
          secondary: "#FFFAEE",
        },
      });
      return;
    }
    setCart([...existingCart, item]);

    const existingItemIndex = existingCart.findIndex(cartItem => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex] = {
        ...existingCart[existingItemIndex],
        quantity: (existingCart[existingItemIndex] as any).quantity + 1,
      };
    } else {
      (item as any).quantity = 1;
      existingCart.push(item);
    }

    toast.success("Item added successfully.", {
      style: {
        border: "1px solid purple",
        padding: "16px",
        color: "pink",
      },
      iconTheme: {
        primary: "pink",
        secondary: "#FFFAEE",
      },
    });

    localStorage.setItem("cart", JSON.stringify(existingCart));

    const totalItems = existingCart.reduce((sum, cartItem) => sum + (cartItem as any).quantity, 0);
    localStorage.setItem("cartCount", totalItems.toString());
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ backgroundColor: "#FDE2F4", padding: "40px", fontFamily: "'Poppins', sans-serif" }}>
      <CartPage cart={cart as Item[]} setCart={setCart}/>
      {/* Filter Bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px" }}>
        {["All", "Cake", "Cupcakes", "Pastry", "Donut", "Cookie"].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: category === cat ? "#7A3E3E" : "#F4D0D0",
              color: category === cat ? "white" : "#7A3E3E",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "0.3s",
              fontWeight: "bold",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Fancy Heading */}
      <h1
        style={{
          textAlign: "center",
          color: "#7A3E3E",
          fontSize: "4rem",
          fontFamily: "'Monsieur La Doulaise', serif",
          marginBottom: "20px",
        }}
      >
        ~~~ Our Delicious Creations ~~~
      </h1>

      {/* Items Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "25px",
          padding: "20px",
        }}
      >
        {filteredItems.map(item => (
          <div
            key={item._id}
            style={{
              backgroundColor: "#FFF5F7",
              borderRadius: "15px",
              padding: "20px",
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
              border: "2px solid #EAC4D5",
            }}
            onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
                borderBottom: "4px solid #EAC4D5",
              }}
            />
            <h2 style={{ color: "#7A3E3E", fontSize: "1.8rem", marginTop: "15px" }}>{item.name}</h2>
            <p style={{ color: "#B56576", fontSize: "1.2rem", fontWeight: "500" }}>Type: {item.type}</p>
            <p style={{ color: "#6D6875", fontSize: "1.2rem" }}>
              Price: <span style={{ fontWeight: "bold", color: "#7A3E3E" }}>${item.price}</span>
            </p>
            <p
              style={{
                backgroundColor: item.available ? "#D8E2DC" : "#FFC2D1",
                color: "#7A3E3E",
                fontSize: "1rem",
                padding: "8px 15px",
                borderRadius: "8px",
                display: "inline-block",
                fontWeight: "600",
              }}
            >
              {item.available ? "Available" : "Out of Stock"}
            </p>
            <button
              style={{
                backgroundColor: item.available ? "#D8E2DC" : "#FFC2D1",
                color: "#7A3E3E",
                fontSize: "1rem",
                padding: "8px 15px",
                borderRadius: "8px",
                cursor: item.available ? "pointer" : "not-allowed",
                display: "inline-block",
                fontWeight: "600",
                border: "none",
                marginTop: "10px",
              }}
              onClick={() => item.available && handleAddToCart(item)}
              disabled={!item.available}
            >
              {item.available ? "ADD to Cart" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
