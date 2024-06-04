import React, { useState } from 'react'
import Image from "../assets/images/login-img.png"
import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'

function Register() {
    let [formData, setFormData] = useState({
        name:"",
        email: "",
        password: "",
    })

    const handleChange =(event)=>{
      const {name, value}= event.target;

        setFormData((prev) =>{

            return{
                 ...prev,
                  [name]:value 
            }
        })
    }

    const handleSubmit =async(event)=>{
        event.preventDefault()
try {
    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options:{
            name:formData.name
        }
      })
      alert('check your email for verification link')
    
} catch (error) {
    alert(error)
}

    }
  return (
    <div>

<div>
      <div className="">
        <div className="grid grid-cols-2 items-center">
          <div className="imageSection h-[100vh] bg-[#12bca2] flex flex-col items-center">
            <img  className="w-[75%] m-auto h-[75%] rounded-full border-[10px] border-white shadow-lg shadow-black" src={Image} alt="food" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col items-center">
              <h2 className="text-3xl text-[#12bca2] font-medium text-left">Register</h2>
              <div className="my-[5px]">
                <label className="my-[5px]">Name</label>
                <div >
                  <input 
                  name='name'
                    type="text"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    value={formData.name}
                    className="border-gray border-[1px] rounded-lg w-full px-5 py-2 my-[5px]"
                  />
                </div>
              </div>

              <div className="my-[5px]">
                <label className="my-[5px]">Email</label>
                <div >
                  <input 
                  name='email'
                    type="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={formData.email}
                    className="border-gray border-[1px] rounded-lg w-full px-5 py-2 my-[5px]"
                  />
                </div>
              </div>

              <div className="my-[5px]">
                <label className="my-[5px]">Password</label>
                <div>
                  <input 
                  name='password'
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={formData.password}
                    className="border-gray border-[1px] rounded-lg w-full px-5 py-2 text-left"
                  />
                </div>
              </div>        

            <div className="check flex flex-col justify-left">
              <button className="remember" htmlFor="checkbox">
                <input type="checkbox" /> Remember me
              </button>
            </div>
            <div>
              <button
               className="login-btn bg-[#12bca2] w-[300px] px-10 py-2 text-[18px] rounded-xl text-white my-[10px]" 
               type="submit">
                  Register
              </button>
            </div>

            <div>
              <button className="register-btn border-[#12bca2] border-[1px] w-[300px] px-10 py-2 text-[18px] rounded-xl text-[#12bca2] my-[10px]"> <Link to="/login">Login</Link> </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default Register
