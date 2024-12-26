import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';
import {PiUserCircle} from  'react-icons/pi'

  
const CheckEmail = () => {
  const [data, setData] = useState({
    email: "",
    
  });
const navigate=useNavigate()
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);
      if(response.data.success)
      {
        setData({
        
          email: "",
       
        })
        navigate('/password', {
          state:response?.data?.data
        })
       
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="mt-5">
    <div className="bg-white w-full max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto">
     <div className="w-fit mx-auto mb-2">
      <PiUserCircle size={80}/> 
     </div>
     
     
     <center><h1 className="text-1xl font-base"><b>Welcome To Chat app</b></h1></center> 
      <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
        

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="enter your email"
            className="bg-slate-100 px-2 py-1 focus:outline-primary"
            value={data.email}
            onChange={handleOnChange}
            required
          />
        </div>


        
        <button
          className='bg-primary text-lg px-4 py-1 bg-[#0ea5e9] hover:bg-cyan-500 rounded mt-3 font-bold text-white'>
          Login
        </button>
      </form>
      <p className='my-3 text-center'>
        New User? <Link to={"/register"} className='hover:text-cyan-500 font-semibold'>Register</Link>
      </p>
    </div>
  </div>
  )
}

export default CheckEmail