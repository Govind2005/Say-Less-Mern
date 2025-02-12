import React, { useState } from "react";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center p-4 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/222.jpg')" }}
    >
    
    </div>
  );
};

export default LoginComponent;
