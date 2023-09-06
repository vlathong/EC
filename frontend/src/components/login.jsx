import { useState } from "react";
import "../App.css";
import img from '../asset/img/img-01.png';
import vector from '../asset/img/right-long-solid.svg'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export const Login = () => {
  
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const navigate=useNavigate()
  const state = { redirect: null };
  function loginUser()
{
  axios({
    method: 'post',
    url: 'http://localhost:4001/auth/login',
    data: {
      username:email,
      password:password
    }
  })
  .then(result=>{
    if(result.data.success==false)
    {
      alert(result.data.message)
    }
    else{
      console.log(result)
      localStorage.setItem('session', result.data.session);
      navigate("/Detailsproduct")
    }
  
  }
  )
  .catch(result=>{
    alert(result)
  })

}
  return (
    <div className="desktop-1">
        <div className="desktop-1-item">
        <div className="member-login">Member Login</div>
        
        <input class="input100" type="email" name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input class="input200" type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        
        
        <button onClick={loginUser}className="rectangle-div">
        <div className="login">LOGIN</div>
        </button>
        
        <div className="forgot-usernamepassword">
        
        </div>
        <img className="img-01-1-icon" src={img}/>
        <div className="New_account">
          <a href="/register">Create your account</a>
          <img className="vector" src={vector}></img>
          </div>
          </div>
    </div>
  );
};

