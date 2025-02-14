import { useState, useEffect, SetStateAction } from 'react';
interface CartItem {
  _id: string;
  name: string;
  image:string;
  quantity: number;
  price:number;
  special?: string;  // Optional special instructions
  customize?: string; // Optional customization
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [messageStatus, setMessageStatus] = useState('');

  useEffect(() => {
    // Load cart items from localStorage when component mounts
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const updateCartCount = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalItems.toString());
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const handleSpecialChange = (itemId: string, value: string) => {
    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, special: value } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCustomizeChange = (itemId: string, value: string) => {
    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, customize: value } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setPhoneNumber(e.target.value);
  };

  const handleNameChange = (e: { target: { value: SetStateAction<string> } }) => {
    setName(e.target.value);
  };

  const paymentHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
      
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const response = await fetch("http://localhost:5000/payment/create-order", {
      method: "POST",
      body: JSON.stringify({
        amount: total,
        currency: "INR",
        receipt: '123123123',
        notes: {}
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {

      key: "rzp_test_mZGFuX4QG8UG7y", // Enter the Key ID generated from the Dashboard
      amount: total, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Bindi Cupcake", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
      handler: async function (response: Response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch("http://localhost:5000/payment/verify-payment", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: phoneNumber.startsWith("+91") ? phoneNumber : "+91 "+phoneNumber
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "pink",
      },
    };
    var rzp1 = new window.Razorpay(options);
  
    rzp1.on("payment.failed", function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  const handleButtonClick = async () => {
    if (phoneNumber && name) {
      try {
        let message = "🎂 *New Order:*\n\n";
        cartItems.forEach(item => {
          message += `*${item.name}* x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
          if (item.special) message += `Special: ${item.special}\n`;
          if (item.customize) message += `Customize: ${item.customize}\n`;
        });
        message += `\n*Total: $${total.toFixed(2)}*`;

        // Send order message to WhatsApp
        const response = await fetch('http://localhost:4000/send-whatsapp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber, message }),
        });

        const data = await response.json();
        console.log(data);
        if (data.success) {
          setMessageStatus('Message sent successfully!');
        } else {
          setMessageStatus('Failed to send message.');
        }

        // Save order data to the database
        const orderData = {
          name,
          phoneNumber,
          items: cartItems,
          total,
        };

        const dbResponse = await fetch('http://localhost:4000/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        const dbData = await dbResponse.json();
        if (dbData.success) {
          console.log("here ", JSON.stringify(orderData, null, 2));

          setMessageStatus('Order saved to database successfully!');
        } else {
          setMessageStatus('Failed to save order to database.');
        }

      } catch (error) {
        console.error(error);
        setMessageStatus('Error occurred while sending message.');
      }
    } else {
      setMessageStatus('Please enter both name and phone number.');
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "'Poppins', sans-serif" }}>
      <h1 style={{
        color: "#7A3E3E",
        fontSize: "2.5rem",
        marginBottom: "30px",
        textAlign: "center"
      }}>
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} style={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              borderBottom: "1px solid #EAC4D5",
              gap: "20px"
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ color: "#7A3E3E", fontSize: "1.2rem" }}>{item.name}</h3>
                <p style={{ color: "#B56576" }}>${item.price}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#F4D0D0",
                    cursor: "pointer"
                  }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#F4D0D0",
                    cursor: "pointer"
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    marginLeft: "20px",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#FFC2D1",
                    cursor: "pointer"
                  }}
                >
                  Remove
                </button>
              </div>

              {/* Special and Customize Fields */}
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Special Instructions (optional)"
                  value={item.special || ''}
                  onChange={(e) => handleSpecialChange(item._id, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "2px solid #EAC4D5",
                    marginBottom: "10px"
                  }}
                />
                <input
                  type="text"
                  placeholder="Customization (optional)"
                  value={item.customize || ''}
                  onChange={(e) => handleCustomizeChange(item._id, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "2px solid #EAC4D5"
                  }}
                />
              </div>
            </div>
          ))}
          <div style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#FFF5F7",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block",
                marginBottom: "8px",
                color: "#7A3E3E",
                fontSize: "1.1rem"
              }}>
                Enter your name:
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "2px solid #EAC4D5",
                  width: "100%",
                  maxWidth: "300px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block",
                marginBottom: "8px",
                color: "#7A3E3E",
                fontSize: "1.1rem"
              }}>
                Enter your mobile number:
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "2px solid #EAC4D5",
                  width: "100%",
                  maxWidth: "300px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px"
            }}>
              <div style={{
                fontSize: "1.5rem",
                color: "#7A3E3E",
                fontWeight: "bold"
              }}>
                Total: ${total.toFixed(2)}
              </div>
              <button
                onClick={handleButtonClick}
                disabled={!(name && phoneNumber)}
                style={{
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#7A3E3E",
                  color: "white",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                Send Order on WhatsApp
              </button>
              <button
                onClick={paymentHandler}
                disabled={!(name && phoneNumber)}
                style={{
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#7A3E3E",
                  color: "white",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
      <p>{messageStatus}</p>
    </div>
  );
};

export default CartPage;
