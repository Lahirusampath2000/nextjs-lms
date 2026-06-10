"use client";
import { useState } from "react";
import React from "react";
import axios from "axios";

function register() {
    //usestate
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("student");
    const [grade, setGrade] = useState<string>("");

    //register function
    const register = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = { name, email, password, role, grade };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        payload
      );

      alert("Registration successful");
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
     <div className="min-h-screen flex justify-end items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mr-20">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={register} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <input
            type="text"
            placeholder="Role"
            className="w-full border p-3 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            type="text"
            placeholder="Grade"
            className="w-full border p-3 rounded"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default register





