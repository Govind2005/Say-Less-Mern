import React, { useState, useEffect } from "react";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    captcha: ""
  });
  const [result, setResult] = useState("");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleLogin = () => {
    setResult(`Logging in with Username: ${credentials.username}, Password: ${credentials.password}, Captcha: ${credentials.captcha}`);
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('222.jpg')",
      }}
    >
      <div id="login" className="flex flex-col text-2xl items-center px-44 py-16">
        <h2 style={{ fontFamily: "'Monsieur La Doulaise', cursive" }} className="text-8xl font-bold text-white pt-16 mb-6">
          Login
        </h2>
        <div className="p-6 rounded-lg text-xl shadow-lg w-80">
          {Object.keys(credentials).map((key, index) => (
            <label key={index} className="block text-white font-medium mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1) + ":"}
              <input
                type={key === "password" ? "password" : "text"}
                id={key}
                value={credentials[key]}
                onChange={handleChange}
                className="w-full bg-transparent p-2 border rounded mt-1"
              />
            </label>
          ))}
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded hover:bg-red-600"
          >
            Login
          </button>
        </div>
        {result && (
          <div className="bg-white p-4 rounded-lg shadow-lg w-80 mt-6 text-gray-800">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
