import "../css/Order.css"
import Nav from "./nav"
import icon_search from "../asset/img/magnifying-glass-solid.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
export const Order = () => {
  const navigate=useNavigate()
    library.add(faStar);
    const [userOrder, setuserOrder] = useState([]);
    useEffect(()=>{
      axios({
            method: 'get',
            url: `http://localhost:4001/order/${localStorage.getItem('session')}`,
           })
           .then(result=>{
            setuserOrder(result.data)})
          .catch(result=>{
           })
    },[]);
    return (
      <div>
        <Nav/>   
        <div class="rectangle2-12">
            <div class="orders-list">ORDERS LIST</div>
            <div className="information2">
            <div class="order-id">Order ID</div>
            <div class="user">User</div>
            <div class="address3">Address</div>
            <div class="status">Status</div>
            <div class="detail">Detail</div>
            </div>
            <div class="line2-3"></div>
            
            {userOrder.map((userOrder)=>(<div className="containerOrder">
            <div class="_1u">{userOrder.ID}</div>
            <div class="user_user">{userOrder.USERNAME}</div>
            <div class="address_user">{userOrder.ADDR_LINE1 + userOrder.CITY}</div>
            <div class="status_goods">{userOrder.STATUS}</div>
            <button className="detail_goods" onClick={(e)=>{
              navigate(`/BagProductHistory/${userOrder.ID}`)
            }}>Details</button>
            </div>))}
            
        </div>
      </div>      
    );
  };
  

