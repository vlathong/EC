import "../css/BagProduct.css";
import Nav from './nav';
import product from "../asset/img/shoe19_720x.webp"
import React, { useState, useEffect} from 'react';
import Paypal from "../asset/img/196566.png"
import axios from 'axios';
import { Buffer } from "buffer";
import {useMemo } from "react";
import { PayPalButton } from "@repeatgg/react-paypal-button-v2";
import { da } from "date-fns/locale";
export const BagProduct = () => {
  const [dataOrder, setdataOrder] = useState(0);
  const [value, setValue] = useState("");
  const [cartOrder,setCartOrder ] = useState([]);
  const [Address,setAddress ] = useState([]);
  const [cityPick, setCityPick] = useState("");
  const [orderID, setOrderID] = useState(0);
  const [sdk,setsdk]=useState(false);
  const [addressPick, setAddressPick] = useState("");
  const [details, setdetails] = useState([]);
  const [pointUse, setPointUse] = useState("0");
 const order = useMemo(() => {
  axios({
    method: 'get',
    url: `http://localhost:4000/cart/cart/${localStorage.getItem('session')}`,
  })
    .then(result => {
      setCartOrder(result.data);
      
    })
    .catch(error => {
      console.error(error);
    });
}, []);
const address = useMemo(() => {
  axios({
    method: 'get',
    url: `http://localhost:4000/payment/address/${localStorage.getItem('session')}`,
  })
    .then(result => {
      setAddress(result.data); 
    })
    .catch(error => {
      console.error(error);
    });
}, []);
var point=0
function limitPoint()
{
  axios({
    method: 'get',
    url: `http://localhost:4000/payment/point/${localStorage.getItem('session')}`,
  })
    .then(result => {
      point=result.data[0].point
    })
    .catch(error => {
      console.error(error);
    });
}
 var sum
 function x(){
  let sum=0;
  for(var i=0;i<cartOrder.length;i=i+1)
  {
    sum=sum+cartOrder[i].TOTAL
  }
  return sum
 }
 sum=x()
 limitPoint()
 const handleChange = (e) => {
  const inputValue = e.target.value;
  const x=document.getElementsByClassName("use-point")
  var Element4 = document.getElementsByClassName("title_price")
  if (!/^[0-9]+$/.test(inputValue) ) {
    
    setValue("");
    alert("Vui lòng nhập số!");
    Element4[1].innerHTML=Element4[0].innerHTML.slice(7,Element4[0].innerHTML.length)
    Element4[1].innerHTML='Discounted Price:'+Element4[1].innerHTML
    
  } else if(inputValue>point)
  {
    
    setValue("");
    alert(`Số nhập cượt quá điểm hiện có. Điểm hiện có là: ${point}`);
    Element4[1].innerHTML=Element4[0].innerHTML.slice(7,Element4[0].innerHTML.length)
    Element4[1].innerHTML='Discounted Price:'+Element4[1].innerHTML
  }
   else 
  {
    setValue(x[0].value);
    Element4[1].innerHTML=Element4[0].innerHTML.slice(7,Element4[0].innerHTML.length)-x[0].value*5
    setPointUse(x[0].value);
    console.log(pointUse)
    Element4[1].innerHTML='Discounted Price:'+Element4[1].innerHTML
  }
  if(Number.parseInt(Element4[1].innerHTML.slice(17,Element4[1].innerHTML.length))<0){
    
    setValue("");
    alert(`Điểm sử dụng vượt quá số tiền của món hàng.`);
    Element4[1].innerHTML=Element4[0].innerHTML.slice(7,Element4[0].innerHTML.length)
    Element4[1].innerHTML='Discounted Price:'+Element4[1].innerHTML
  }
};
const [config,setconfig ] = useState([]);
useMemo(()=>{
  axios({
    method: 'get',
    url: `http://localhost:4000/payment/config`,
  })
    .then(result => {
    setconfig(result.data.data)
     const script=document.createElement('script')
     script.type='text/javascript'
     script.src=`https://www.paypal.com/sdk/js?client-id=${config}`
     script.async=true;
     script.onload=()=>{
      setsdk(true)
     }
     document.body.appendChild(script)
    })
    .catch(error => {   
    });
},[])
async function insertOrder()
{
        for(var j=0;j<cartOrder.length;j=j+1){
          console.log("1")
          await axios({
            method: 'post',
            url: `http://localhost:4000/order/order/orderItems`,
            data: {
              PRODUCT_ID: cartOrder[j].PRODUCT_ID.trim(),
              QUANTITY: cartOrder[j].QUANTITY
            }
          })
        }
}
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
              <button className="amount-" onClick={function(){
                const Element1 = document.getElementsByClassName("amount-1")
                
                if(Element1[index].innerHTML!=1)
                {
                Element1[index].innerHTML=Element1[index].innerHTML-1
                const Element2 = document.getElementsByClassName("price-1")
                const Element3 = document.getElementsByClassName("total-1")
                Element3[index].innerHTML=(Element1[index].innerHTML*Element2[index].innerHTML.slice(0,Element2[index].innerHTML.length-1))+'$'
                const Element4 = document.getElementsByClassName("title_price")
                Element4[0].innerHTML=Element4[0].innerHTML.slice(7,Element4[0].innerHTML.length)-(Element2[index].innerHTML.slice(0,Element2[index].innerHTML.length-1))
                
                Element4[0].innerHTML='Price: '+Element4[0].innerHTML
                Element4[1].innerHTML=Element4[1].innerHTML.slice(17,Element4[1].innerHTML.length)-(Element2[index].innerHTML.slice(0,Element2[index].innerHTML.length-1))
                Element4[1].innerHTML='Discounted Price:'+Element4[1].innerHTML
               
                axios({
                  method: 'patch',
                  url: `http://localhost:4000/cart/cart`,
                  data: {
                    PRODUCT_ID: Element1[index].getAttribute("value"),
                    SESSION_ID: localStorage.getItem('session').trim(),
                    QUANTITY: Number.parseInt(Element1[index].innerHTML),
                    TOTAL: Number.parseInt(Element3[index].innerHTML.slice(0,Element3[index].innerHTML.length-1)) 
                  }
                })
              }
              else
              {
                window.confirm("Bạn có muốn xóa nó không ?");
                if(window.confirm("Bạn có muốn xóa nó không ?")==true)
                {
                  axios({
                    method: 'delete',
                    url: `http://localhost:4000/cart/delete`,
                    data: {
                      PRODUCT_ID: Element1[index].getAttribute("value"),
                      SESSION_ID: localStorage.getItem('session').trim()
                    }
                  })
                }
              }
              }}>-</button> 
            <p className="amount-1" value={cartOrder.PRODUCT_ID.trim()}>{cartOrder.QUANTITY}</p>
            <button className="amount_" onClick={function(){
                const Element1 = document.getElementsByClassName("amount-1")
                Element1[index].innerHTML=(Number.parseInt(Element1[index].innerHTML)+1).toString()
                const Element2 = document.getElementsByClassName("price-1")
                const Element3 = document.getElementsByClassName("total-1")
                Element3[index].innerHTML=(Element1[index].innerHTML*Element2[index].innerHTML.slice(0,Element2[index].innerHTML.length-1))+'$'
                const Element4 = document.getElementsByClassName("title_price")
                Element4[0].innerHTML=(Number.parseInt(Element4[0].innerHTML.slice(7,Element4[0].innerHTML.length))+Number.parseInt(Element2[index].innerHTML.slice(0,Element2[index].innerHTML.length-1))).toString()
                
                Element4[0].innerHTML='Price: '+Element4[0].innerHTML
                Element4[1].innerHTML=((Number.parseInt(Element4[1].innerHTML.slice(17,Element4[1].innerHTML.length)))+(Number.parseInt(Element2[index].innerHTML.slice(0,Element2[index].innerHTML.length-1)))).toString()
                Element4[1].innerHTML='Discounted Price:'+Element4[1].innerHTML
                axios({
                  method: 'patch',
                  url: `http://localhost:4000/cart/cart`,
                  data: {
                    PRODUCT_ID: Element1[index].getAttribute("value"),
                    SESSION_ID: localStorage.getItem('session').trim(),
                    QUANTITY: Number.parseInt(Element1[index].innerHTML),
                    TOTAL: Number.parseInt(Element3[index].innerHTML.slice(0,Element3[index].innerHTML.length-1)) 
                  }
                })
                  .then(result => {
                    point=result.data[0].points
                   
                  })
                  .catch(error => {
                  
                  });
              
              }}>+</button>
            </div>
            <p className="price-1">{cartOrder.PRICE}$</p>
            <p className="total-1">{cartOrder.TOTAL}$</p>
            </div>
      ))}
      
       
      
      <div className="total_Address">
        
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
      </div>
  </div>
);
}