import "../css/Detailsproduct.css"
import Nav from "./nav"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

export const Detailsproduct = () => {
    const [productDetail,setProductDetail ] = useState([{productDetail:[]}]);
    const currentUrl = window.location.href.slice(37, window.location.href.length);
    const navigate=useNavigate()
    var size=[] 
    var color=[]
    const [imageData, setImageData] = useState(Buffer.from('...'));
    const [sizePick, setSize] = useState(1)
    const [colorPick, setColor] = useState('')
    function addToCart(){
      var product_id = '';
      for(let i=0;i<productDetail.length;i=i+1){
        console.log(productDetail)
        if(productDetail[i].SIZE == sizePick && productDetail[i].COLOR == colorPick) {
          console.log("1")
          product_id = productDetail[i].ID
        }
      }
      console.log(product_id)
      axios({
          method: 'post',
          url: `http://localhost:4001/cart`,
          data: {
              PRODUCT_ID: product_id.trim(),
              SESSION_ID: localStorage.getItem('session'),
              QUANTITY: amount,
              TOTAL: amount * productDetail[0].PRICE  
            }
        })
      .then(response => {
          alert('success')
      })
      .catch(error => {
          console.log(error);
      });;
  }

  function buyItNow(){
    addToCart()
    navigate("/BagProduct")
  }

  useEffect(()=>{
      axios({
        method: 'get',
        url: `http://localhost:4001/product/customer/${currentUrl}`,
      })
        .then(result => {
          setProductDetail(result.data);
          setImageData(Buffer.from(productDetail[0].IMAGE.data).toString("base64"));
        })
        .catch(error => {
          console.error(error);
        });
      
  }, []);
    library.add(faStar);
    const[amount,setamount]=useState(1)
    const incrementNumber = () => {
        setamount(amount + 1);
      };
      const decreamentNumber = () => {
        setamount(amount - 1);
        if(amount<=1)
        {
            setamount(1);
        }
      };
    function hanldeSize()
    {
      for(let i=0;i<productDetail.length;i=i+1)
      {
        color.push(productDetail[i].COLOR)
        size.push(productDetail[i].SIZE)
      }
      size = Array.from(new Set(size));
      color = Array.from(new Set(color));
    }
    hanldeSize()
    function handleImage(){
      axios({
        method: 'get',
        url: `http://localhost:4001/product/customer/${currentUrl}`,
      })
        .then(result => {
          if(imageData === "object"){
            console.log(imageData)
            setImageData(Buffer.from(imageData).toString('base64'))
          }
          else{
            setImageData(Buffer.from(result.data[0].IMAGE.data).toString("base64"));
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
    handleImage()
    return (
      <div>
        <Nav/>
        <div className="containerDetailsproduct">
        <img src={`data:image/png;base64,${imageData}`} onLoad = {handleImage} alt="" className="product"/>
        <div className="information">
        <div class="bast-shoed">Name: {productDetail[0].PNAME}</div>
        <div class="priced">Price:
            <div class="_106-00">{productDetail[0].PRICE}.00$</div>
        </div>
        
        <div class="sized">
          <p>Size:</p>
        {size.map((size)=> (
            <button type="checkbox" class="rectangled-10" onClick={(e) => {
              var list=document.querySelectorAll(".rectangled-10")
              for(var i=0;i<list.length;i=i+1)
              {
                if(list[i].style.backgroundColor != "")
                {
                  list[i].style.backgroundColor = "white"
                }
              }
              e.target.style.backgroundColor = "blue"
              setSize(size)
              }}>
              {size}
            </button>
          ))}
        </div>

        <div class="colord">
          <p>Color:</p>
        {color.map((colors)=> (
            <button type="checkbox" class="rectangled-13" onClick={(e) => {
              var list=document.querySelectorAll(".rectangled-13")
              for(var i=0;i<list.length;i=i+1)
              {
                if(list[i].style.borderColor != "")
                {
                  list[i].style.borderColor = "white"
                }
              }
              e.target.style.borderColor = "blue"
              setColor(colors)
              }} style={{backgroundColor:`${colors}`}}>
            </button>
          ))}
        </div>

        <div class="quantityd">
          <p>Quantity:</p>
            <button class="rectangled-16">
                <div class=""onClick={decreamentNumber}>-</div>
            </button>
            <div class="rectangled-17">
                <div class="_1">{amount}</div>
            </div>
            <button class="rectangled-18" onClick={incrementNumber}>+</button>
        </div>

        <div class='button'>
        <button onClick = {addToCart} class="rectangled-19">ADD TO CART</button>
        <button onClick = {buyItNow} class="rectangled-20">BUY IT NOW</button>
        </div>
      </div>
      </div>
      </div>
    );
  };