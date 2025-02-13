import { useState } from 'react';

function SendMessage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [messageStatus, setMessageStatus] = useState('');

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleButtonClick = async () => {
    if (phoneNumber) {
      try {
        const response = await fetch('http://localhost:4000/send-whatsapp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber }),
        });

        const data = await response.json();
        console.log(data)
        if (data.success) {
          setMessageStatus('Message sent successfully!');
        } else {
          setMessageStatus('Failed to send message.');
        }
      } catch (error) {
        console.error(error);
        setMessageStatus('Error occurred while sending message.');
      }
    } else {
      setMessageStatus('Please enter a phone number.');
    }
  };

  return (
    <div>
      <h1>Send WhatsApp Message</h1>
      <input
        type="text"
        value={phoneNumber}
        onChange={handleInputChange}
        placeholder="Enter phone number"
      />
      <button onClick={handleButtonClick}>Send WhatsApp Message</button>
      <p>{messageStatus}</p>
    </div>
  );
}

export default SendMessage;
