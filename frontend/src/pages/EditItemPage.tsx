import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditItemPage = () => {
    const [items, setItems] = useState<{ _id: string; image: string; name: string; type: string; price: number; available: boolean }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [category, setCategory] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/item');
            if (response.ok) {
                const data = await response.json();
                setItems(data.data);
                setLoading(false);
            } else {
                setError('Failed to fetch items');
                setLoading(false);
            }
        } catch (error) {
            setError('Error fetching items: ' + (error as Error).message);

            setLoading(false);
        }
    };

    // Filtered Items based on category selection
    const filteredItems = category === "All" ? items : items.filter(item => item.type === category);

    const handleDeleteItem = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:4000/api/item/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setItems((prevItems) => prevItems.filter(item => item._id !== id)); // Remove item from the list
                console.log(`Item with ID ${id} deleted successfully`);
            } else {
                setError("Failed to delete the item");
            }
        } catch (error) {
            setError('Error deleting items: ' + (error as Error).message);

        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ backgroundColor: "#FDE2F4", padding: "40px", fontFamily: "'Poppins', sans-serif" }}>
            {/* Filter Bar */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px" }}>
                {["All", "Cake", "Cupcakes", "Pastry", "Donut", "Cookie"].map((cat) => (
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
                            fontWeight: "bold"
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Fancy Heading with SVG Lines */}
            <h1 style={{
                textAlign: "center",
                color: "#7A3E3E",
                fontSize: "4rem",
                fontFamily: "'Monsieur La Doulaise', serif",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px"
            }}>
                ~~~ Our Delicious Creations ~~~
            </h1>

            {/* Items Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px", padding: "20px" }}>
                {filteredItems.map((item) => (
                    <div key={item._id} style={{
                        backgroundColor: "#FFF5F7",
                        borderRadius: "15px",
                        padding: "20px",
                        textAlign: "left",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease-in-out",
                        border: "2px solid #EAC4D5"
                    }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{
                                width: "100%",
                                height: "250px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                borderBottom: "4px solid #EAC4D5"
                            }}
                        />
                        <h2 style={{ color: "#7A3E3E", fontSize: "1.8rem", marginTop: "15px" }}>{item.name}</h2>
                        <p style={{ color: "#B56576", fontSize: "1.2rem", fontWeight: "500" }}>Type: {item.type}</p>
                        <p style={{ color: "#6D6875", fontSize: "1.2rem" }}>Price: <span style={{ fontWeight: "bold", color: "#7A3E3E" }}>${item.price}</span></p>
                        <p style={{
                            backgroundColor: item.available ? "#D8E2DC" : "#FFC2D1",
                            color: "#7A3E3E",
                            fontSize: "1rem",
                            padding: "8px 15px",
                            borderRadius: "8px",
                            display: "inline-block",
                            fontWeight: "600"
                        }}>
                            {item.available ? "Available" : "Out of Stock"}
                        </p>

                        {/* Edit and Delete buttons */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                            <button
                                onClick={() => navigate(`/edit/${item._id}`)}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#7A3E3E",
                                    color: "white",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    transition: "0.3s"
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteItem(item._id)}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#B56576",
                                    color: "white",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    transition: "0.3s"
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditItemPage;
