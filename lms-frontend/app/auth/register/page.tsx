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
    const register=async()=>{
      try {
        const payload={name,email,password,role,grade};
        const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,payload);
        alert("Registration successful");
        console.log(res.data);
        
      } catch (error) {
        console.log(error);
        
      }
    }



  return (
    <div>
      <h1>register</h1>
      <form>  
        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="role" value={role} onChange={(e) => setRole(e.target.value)} />
        <input type="text" placeholder="grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
        <button type="submit">register</button>
      </form>
    </div>
  )
}

export default register





