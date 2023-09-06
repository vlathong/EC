import "../css/BagProduct.css";
import Nav from './nav';
import product from "../asset/img/shoe19_720x.webp"
import React, { useState, useEffect} from 'react';
import Paypal from "../asset/img/196566.png"
import axios from 'axios';
import { Buffer } from "buffer";
import {useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const BagProductHistory = () => {
  const [cartOrder,setCartOrder ] = useState([]);
 const order = useMemo(() => {
    const currentUrl = window.location.href.slice(40, window.location.href.length);
  axios({
    method: 'get',
    url: `http://localhost:4001/cart/cartHistory/${currentUrl}`,
  })
    .then(result => {
      setCartOrder(result.data);
      
    })
    .catch(error => {
      console.error(error);
    });
}, []);

return (
    <div>
    <Nav/>
    <div className="title">
      <text >Payment</text>
      </div>
      <div className="Attributes">
        <text className="stt">#</text>
        <text className="image">Image</text>
        <text className="nameProduct">Name Product</text>
        <text className="amount">Amount</text>
        <text className="price">Price</text>
        <text className="total">Total</text>
      </div>
      
      <hr></hr>
      
      {cartOrder.map((cartOrder,index)=>(
        
         <div className="listProduct">
            <p className="NumberProduct">{index+1}</p>
            <img src={`data:image/png;base64,${Buffer.from(cartOrder.IMAGE.data).toString("base64")}`} alt="" className="image_Product1"/>
            <p className="NameProduct1">{cartOrder.PNAME}</p>
            <div className="amountProduct">
              
            <p className="amount-1" >{cartOrder.QUANTITY}</p>
            </div>
            <p className="price-1">{cartOrder.PRICE}$</p>
            <p className="total-1">{cartOrder.PRICE*cartOrder.QUANTITY}$</p>
            </div>
      ))}
      
       
      
      {/* <div className="total_Address">
        
      <div className="rectangleAddres">
      <div className="payment">
        
      </div>
      <div className="address1">Address</div>
            <label className="address_street">Street:
            <input type="text" list="cars" className="street" onChange = {(event) => setAddressPick(event.target.value)}/>
          {Address.map((add)=>(
            <datalist id="cars">
            <option>{add.ADDR_LINE1}</option>
            </datalist>
          ))}
          </label>
          <div className="address"></div>
            <label className="address_street1">City:
            <input type="text" list="car" className="street1" onChange = {(event) => setCityPick(event.target.value)}/>
          {Address.map((add)=>(
            <datalist id="car">
            <option>{add.City}</option>
            </datalist>
          ))}
          </label>
          
      </div>
      
      <div className="total">
      <div className="rectanglePayment">
            <div className="title-p-t">Payment</div>
            
            <div className="title-p-m">Payment Methods</div>
            <label className="checkboxvnpay">
              <input className="stardust-checkbox__input-2" type="checkbox"></input>
             <img src={Paypal} className="paypal"/>
            </label>
            <div className="use-accumulated-points">Use Accumulated points:</div>
            <input type="text" pattern="[0-9]+" className="use-point"  value={value} onChange={handleChange}></input>
        </div>
        <div className="rectangleTotal">
          <div className="title-p-t">Total</div>
          <div className="title_price" value="1">Price: {sum}</div>
          <div className="price"></div>
          <div className="title_price" value="2">Discounted Price:{sum-value*5} </div>
          <div className="D_price"></div>
          <PayPalButton
        amount={sum-value*5}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
          setdetails(details)
         
          const Element1 = document.getElementsByClassName("amount-1")
          // OPTIONAL: Call your server to save the transaction
          if(details.status=="COMPLETED")
          {
            
            var add_id = '';
            for(let i = 0; i<Address.length;i++){
              if(Address[i].ADDR_LINE1.trim() == addressPick && Address[i].City.trim() == cityPick) 
              {add_id = Address[i].ID}
            }
            axios({
              method: 'post',
              url: `http://localhost:4000/order/order/orderDetails`,
              data: {
                USER_ID: localStorage.getItem('session').trim(),
                ADD_ID: add_id,
                TOTAL: sum
              }
            }).then(result => {
              console.log(typeof(result.data))
              setdataOrder(result.data)
              
            })
            .catch(error => {
              console.error(error);
            });
            
            insertOrder()
            axios({
              method: 'post',
              url: `http://localhost:4000/point/insertPoint`,
              data: {
                USER_ID: localStorage.getItem('session').trim(),
                AMOUNT: Number("-".concat(pointUse))
              }
            })
            axios({
              method: 'post',
              url: `http://localhost:4000/point/insertPoint`,
              data: {
                USER_ID: localStorage.getItem('session').trim(),
                AMOUNT:Math.floor(sum/100)
              }
            })
            for(var i=0;i<Element1.length;i=i+1)
            axios({
              method: 'delete',
              url: `http://localhost:4000/cart/delete`,
              data: {
                PRODUCT_ID: Element1[i].getAttribute("value"),
                SESSION_ID: localStorage.getItem('session').trim()
              }
            })
          }
          
          window.location.reload();
          return fetch("/paypal-transaction-complete", {
            mode: 'no-cors',
            method: "post",
            headers: {
              "Content-Type": "application/json"
         },
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
          
        }}
        onError={()=>{
          
          alert("Error")
        window.location.reload();}
        }
        
      />
        </div>
      </div>
      </div> */}
  </div>
);
}