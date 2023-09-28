import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const json = await response.json();
      console.log(json);
      alert("Registration Successfull. Now you can login in");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="-mt-32">
          <h1 className="text-4xl text-center ">Register</h1>
          <form className="max-w-md mx-auto mt-5" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="John Doe"
              autoComplete="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // required
            />
            <input
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
            />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already a member?{" "}
              <Link to="/login" className="text-black underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
