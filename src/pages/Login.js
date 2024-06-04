import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import loginImage from "../assets/images/login-img.png";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate()

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })




const handleChange = (event)=>{
const{name, value} = event.target;
setLoginDetails((prev) => {
  return {...prev, [name]:value}
})
}


const handleSubmit = async(event) =>{
  event.preventDefault()


let { data, error } = await supabase.auth.signInWithPassword({
  email: loginDetails.email,
  password: loginDetails.password
})

navigate("./view-recipes")

}

  return (
    <div>
      <div className="">
        <div className="grid grid-cols-2 items-center">
          <div className="imageSection h-[100vh] bg-[#12bca2] flex flex-col items-center">
            <img  className="w-[75%] m-auto h-[75%] rounded-full border-[10px] border-white shadow-lg shadow-black" src={loginImage} alt="food" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col items-center">
              <h2 className="text-3xl text-[#12bca2] font-medium text-left">Welcome</h2>
              <div className="my-[10px]">
                <label className="my-[10px]">Email</label>
                <div >
                  <input 
                    type="text"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={loginDetails.email}
                    name="email"
                    className="border-gray border-[1px] rounded-lg w-full px-5 py-2 my-[5px]"
                  />
                </div>
              </div>

              <div className="my-[5px]">
                <label className="my-[10px]">Password</label>
                <div>
                  <input 
                    type="text"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={loginDetails.password}
                    name="password"
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
                  Sign in
              </button>
            </div>

            <div>
              <button className="register-btn border-[#12bca2] border-[1px] w-[300px] px-10 py-2 text-[18px] rounded-xl text-[#12bca2] my-[10px]"> <Link to="/register">Create Account </Link> </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
