import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Components/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (user) {
    return navigate("/account");
  }

  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/api/login",
  //       {
  //         email,
  //         password,
  //       },
  //       { withCredentials: true }
  //     );
  //     setUser(response.data.userDoc);
  //     console.log(response);
  //     if (response.data.success) {
  //       //   save the authtoken and redirect
  //       localStorage.setItem("token", response.data.token);
  //     }
  //     alert("Registration Successfull. Now you can login in");
  //     navigate("/");
  //   } catch (error) {
  //     alert("Login Failed!");
  //   }
  // };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // API Calls
      const response = await fetch(`http://localhost:4000/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const json = await response.json();
      console.log(json);
      setUser(json.userDoc);
      if (json.success) {
        //   save the authtoken and redirect
        let strToken = JSON.stringify(json.token);
        console.log(strToken);
        localStorage.setItem("token", strToken);
        alert("Registration Successfull. Now you can login in");
        navigate("/");
      }
    } catch (error) {
      alert("Login Failed!");
      console.log(error);
    }
  };
  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="-mt-32">
          <h1 className="text-4xl text-center ">Login</h1>
          <form className="max-w-md mx-auto mt-5" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary">Login</button>
            <div className="text-center py-2 text-gray-500">
              Dont have an account yet?{" "}
              <Link to="/register" className="text-black underline">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
