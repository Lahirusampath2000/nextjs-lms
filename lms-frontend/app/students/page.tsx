import {useState, useEffect} from "react";
import React from 'react'
import axios from "axios";

function Student() {

    const [students, setStudents] = useState([]);

    // get all students
    const getStudents=async()=>{
        try{
            const res=await axios.get("http://localhost:5000/api/students");
            setStudents(res.data);
        }catch(error){
            console.log(error);
        }
    }


  return (
    <div>page</div>
  )
}

export default Student