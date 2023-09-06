import "../App.css";
import Nav from './nav';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import icon_search from "../asset/img/magnifying-glass-solid.svg"
import {Buffer} from 'buffer';
import bag from "../asset/img/bag-shopping-solid (1).svg"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
export const ManageProduct = () => {
  const [products, setProducts] = useState([])
  const [productsTemp, setProductsTemp] = useState([])
  const [search, setSearch] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(10);

  const navigate=useNavigate()
library.add(faStar);
const [category, setcategory] = useState([]);
const [brands, setBrands] = useState([]);
  useEffect(()=>{
    axios({
          method: 'get',
          url: 'http://localhost:4001/category/category',
         })
         .then(result=>{
          console.log(result.data)
          setcategory(result.data)})
        .catch(result=>{
          console.log(result)
         })
  },[]);
  useEffect(()=>{
    axios({
          method: 'get',
          url: 'http://localhost:4001/product/product/brand',
         })
         .then(result=>{
          console.log(result.data)
          setBrands(result.data)})
        .catch(result=>{
          console.log(result)
         })
  },[]);
  useEffect(() => {
    axios({
        method: 'get',
        url: `http://localhost:4001/product/product`,
      })
    .then(response => {
      console.log(response.data)
      setProducts(response.data)
      setProductsTemp(response.data)
      //setImageData(Buffer.from(response.data[0].IMAGE.data))     
    });
  }, []);
  //const base64Data = imageData.toString("base64")
  function handleKeyDown(event){
    if (event.key === 'Enter') {
      // 👇 Get input value
        axios({
            method: 'get',
            url: `http://localhost:4001/product/search/${search}`,
          })
        .then(response => {
          setProductsTemp(response.data)  
          setCurrentPage(0)
        });
    }
  };
  return (
    <div>
      <Nav/>
    <div Name="MannageProductCotainer">
    <div className="SearchProduct">
        <img src={icon_search}></img>
        <input type="text" placeholder="search..."className="search" onChange={(event) => setSearch(event.target.value)} onKeyDown={handleKeyDown}>
        </input>
    </div>
    <div className="MannageProductCotainer_big">
    <div className="MannageProductCotainer_small1">
    <div className="areaCategory">
        <div className="square">
        <h2 className="Category">Category</h2>
        <div className="container">
        {category.map((category) => (
                <div
                  className="containerUser2"                  
                >     
                <div className="type" onClick={()=>{
                  
                    var data=[]
                    for(var i=0;i<products.length;i=i+1)
                    {
                      if([products[i].CATE_ID]==category.ID)
                      {
                        data.push(products[i])
                        
                      }
                    }
                  setProductsTemp(data)
                }}>{category.NAME}</div>     
                </div>
                ))}
            </div>
            
        </div>
    </div>
    <div className="Brands">
    <div className="squareBrands">
            <h2 className="Category">Brands</h2>
            
              {brands.map((brand)=>(
                <div className="container">
                  <div className="type" onClick={()=>{
                  
                  var data=[]
                  for(var i=0;i<products.length;i=i+1)
                  {
                    if([products[i].BRAND]==brand.BRAND)
                    {
                      data.push(products[i])
                    }
                  }
                setProductsTemp(data)
              }}>{brand.BRAND}</div>
            </div>
              ))}
              
        </div>
    </div>
    </div>
    <div className="MannageProductCotainer_small2">
    <div className="Product">
      <ul>
    {productsTemp.slice(currentPage * 6, (currentPage + 1) * 6).map((product) => (
    <div className="introduce_product"><Link to={`/Detailsproduct/${product.ID}`} >
        <img src={`data:image/png;base64,${Buffer.from(product.IMAGE.data).toString("base64")}`} alt="" className="image_Product" />
        <p className="NameProduct">{product.PNAME}</p>
        <hr></hr>
        <div className="item_Price">
          <p className="PriceProduct">${product.PRICE}.00</p>
          <img src={bag} alt="" className="bag"/>
        </div>
        </Link>
      </div>))
      }
      </ul>
      <div className="paging1">
        <button onClick={() => setCurrentPage(currentPage - 1>=0?currentPage - 1:5)}>Previous</button>
        <button onClick={() => setCurrentPage(currentPage + 1<=5?currentPage + 1:0)}>Next</button>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

