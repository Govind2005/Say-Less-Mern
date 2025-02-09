import { useState,useEffect } from "react";

const MenuPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/item');
            if (response.ok) {
                const data = await response.json();
                setItems(data.data); // Assuming your API returns { success: true, data: [...] }
                setLoading(false);
            } else {
                setError('Failed to fetch items');
                setLoading(false);
            }
        } catch (error) {
            setError('Error fetching items: ' + error.message);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Item List</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
                {items.map((item) => (
                    <div key={item._id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '15px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <img 
                            src={item.image} 
                            alt={item.name}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '4px'
                            }}
                        />
                        <h2>{item.name}</h2>
                        <p>Type: {item.type}</p>
                        <p>Price: ${item.price}</p>
                        <p>Available: {item.available}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;