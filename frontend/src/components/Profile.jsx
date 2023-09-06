import Nav from './nav';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import "../css/Profile.css";


export const Profile = () => {  
    const [name,setName]=useState('')
    const [address,setAdd]=useState('')
    const [email,setEmail]=useState('')
    const [Tel,setTel]=useState('')

    function updateUser(){
        axios({
            method: 'patch',
            url: `http://localhost:4001/user/${localStorage.getItem('session')}`,
            data: {
                FIRST_NAME:name,
                ADDR_LINE1:address,
                USERNAME: email,
                TEL: Tel,
                ID: localStorage.getItem('session'),
              }
          })
        .then(response => {
            console.log('reached');
        })
        .catch(error => {
            console.log(error);
        });;
    }
      useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:4001/user/${localStorage.getItem('session')}`,
          })
        .then(response => {
          console.log(response)
          setName(response.data[0].FIRST_NAME.trim())
          setAdd(response.data[0].ADDR_LINE1.trim())
          setEmail(response.data[0].USERNAME.trim())
          setTel(response.data[0].TEL.trim())      
        });
      }, []);
   
    return (
        
        <div>
            <Nav/>
            <div className="user-profile">
                <div className="t-user-profile">User Profile</div>
            </div>
            <div className="user-detail">
                <div className='t-user-detail'>User Detail Profile</div>
                <label className="Name"> Name </label>
                  <input type="text" className="input-name" value = {name} onChange={(event) => setName(event.target.value)}>
                </input>
                <label className='address'> Address </label>
                <input type="text" className="input-address" value = {address} onChange={(event) => setAdd(event.target.value)}>
                </input>
                <div></div>
                <label className='email-address'> Email Address </label>
                <input type="text" className="input-email-address" value = {email} onChange={(event) => setEmail(event.target.value)}>
                </input>
                <label className="phone-number"> Phone Number </label>
                <input type="text" className="input-phone-number" value = {Tel} onChange={(event) => setTel(event.target.value)}>
                </input>
            </div>
            
            <button onClick={updateUser} className ="button_back">Save</button>
        </div>
        

    );
}