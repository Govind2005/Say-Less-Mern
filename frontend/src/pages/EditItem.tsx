import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const EditItemDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState<any>({ name: "", image: "", type: "", price: 0, available: false });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchItemDetails();
    }, [id]);

    const fetchItemDetails = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/item/${id}`);
            if (response.ok) {
                const data = await response.json();
                setItem(data.data);
                setLoading(false);
            } else {
                setError("Failed to fetch item details");
                setLoading(false);
            }
        } catch (error) {
            setError("Error fetching item: " + (error as Error).message);

            setLoading(false);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/item/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
            if (response.ok) {
                navigate("/edit");
            } else {
                setError("Failed to update item here");
            }
        } catch (error) {
            setError("Error updating item: " + (error as Error).message);

        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <AdminNavbar/>
        <div className="mt-32" style={{ padding: "40px", backgroundColor: "#FDE2F4" }}>
            <h1>Edit Item</h1>
            <div style={{ backgroundColor: "#FFF5F7", padding: "20px", borderRadius: "15px" }}>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                    style={{ marginBottom: "15px", padding: "10px", width: "100%", borderRadius: "8px" }}
                    />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={item.image}
                    onChange={(e) => setItem({ ...item, image: e.target.value })}
                    style={{ marginBottom: "15px", padding: "10px", width: "100%", borderRadius: "8px" }}
                    />
                <input
                    type="text"
                    placeholder="Type"
                    value={item.type}
                    onChange={(e) => setItem({ ...item, type: e.target.value })}
                    style={{ marginBottom: "15px", padding: "10px", width: "100%", borderRadius: "8px" }}
                    />
                <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => setItem({ ...item, price: Number(e.target.value) })}
                    style={{ marginBottom: "15px", padding: "10px", width: "100%", borderRadius: "8px" }}
                    />
                <div>
                    <label>
                        Available
                        <input
                            type="checkbox"
                            checked={item.available}
                            onChange={(e) => setItem({ ...item, available: e.target.checked })}
                            />
                    </label>
                </div>
                <button
                    onClick={handleSaveChanges}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        backgroundColor: "#7A3E3E",
                        color: "white",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                    >
                    Save Changes
                </button>
            </div>
        </div>
</>
    );
};

export default EditItemDetailsPage;
