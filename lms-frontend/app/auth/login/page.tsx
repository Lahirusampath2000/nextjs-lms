"use client";
import { useState } from "react";
import React from "react";
import axios from "axios";

function login() {
    //usestate
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
   

    //register function
    const login = async (e: React.FormEvent) => {
        e.preventDefault();

    try {

       const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      console.log(res.data);
      localStorage.setItem("token", res.data.token); //store token in local storage
      alert("Login successful");
      
    } catch (error:any) {
      console.error(error);
      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
      <div className="min-h-screen flex justify-end items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mr-20">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default login





