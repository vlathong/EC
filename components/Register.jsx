import "../css/Register.css"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [tel, settel] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    function registerUser()
{
  axios({
    method: 'post',
    url: 'http://localhost:4001/auth/register',
    data: {
      username: username,
      pass:password,
      fName:fName,
      lName:lName,
      tel: tel
    }
  })
  .then(result=>{

    if(result.data.success==false)
    {
      alert(result.data.message)
    }
    else
    {
      navigate("/Login")
    }
  }
  )
  .catch(result=>{
    alert(result)
  })

}

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
      };
    
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (!username || !password || !confirmPassword) {
        setErrorMessage("Please fill in all required fields.");
      } else if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
      } else {
        setErrorMessage("");
        // Submit form data
      }
    };
  return (
    <div>
      <header className="header">
        <a href="/login" className="login-link">Login</a>
        
      </header>
      <h1>Registration</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}></form>
      
        <div className="form-group">
          <label htmlFor="username">Email *</label>
          <input type="text" id="username" name="username" value={username}
            onChange={handleUsernameChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name </label>
          <input type="text" id="lastname" name="lastname" required onChange={(e)=>setlName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name </label>
          <input type="text" id="firstname" name="firstname" required onChange={(e)=>setfName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="button" onClick={handleShowPassword}>
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password *</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmpassword"
            name="confirmpassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <button type="button" onClick={handleShowConfirmPassword}>
            {showConfirmPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="email">Tel</label>
          <input type="text" id="email" name="email" required onChange={(e)=>settel(e.target.value)}/>
        </div>
        <button type="submit" onClick={registerUser}>Register</button>
    </div>
  );
};