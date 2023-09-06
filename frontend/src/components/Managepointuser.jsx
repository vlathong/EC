import "../css/Managepointuser.css"
import Nav from "./nav"
import icon_search from "../asset/img/magnifying-glass-solid.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import image_Product from "../asset/img/shoe19_720x.webp"
import { faStar} from "@fortawesome/free-solid-svg-icons";
import { Line} from "react-chartjs-2";

import axios from 'axios';
import React, { useState, useEffect } from 'react';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const Managepointuser = () => {
    
  var [revenue3,setRevenue3]=useState({
      labels: ["a","b"],
      datasets: [    
        {
          label: " ",
          data: [1,2],
          fill: false,
          borderColor: "#742774"
        }
      ]
    })
  useEffect(() => {
      console.log(localStorage.getItem('session'))
      var total=[]
      var date=[]
        axios({
          method: 'get',
          url: `http://localhost:4000/point/getRemainPointsDay/${localStorage.getItem('session')}`,
        })
        .then(response => {
          var temp=response.data[0].Accpoint
          for(var i=0;i<response.data.length;i=i+1)
          {
              temp=temp+response.data[i].total
              total.push(temp)
              date.push(response.data[i].date)
          }
        });
        setRevenue3({
          labels: date,
          datasets: [    
            {
              label: " ",
              data: total,
              fill: false,
              borderColor: "#742774"
            }
          ]
        
      })
      console.log(revenue3)
      }
      
      ,[]);
      
      var options = {
        
        scales: {
          y: {
            stepSize: 2,
            beginAtZero: true,
            ticks: {
              autoSkip: true
            }
      
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Revenue'
          },
          
        },
        
      }
    library.add(faStar);
  
    return (
      <div>
        <Nav/>
        <div className="containerpointadmin">
          <div className="container1">
        <div class="rectangle4-11">
          <div class="prieod">Period</div>
            <div  className="Days"for="rectangle4-22"onClick={(e)=>{
          var total=[]
          var date=[]
            axios({
              method: 'get',
              url: `http://localhost:4000/point/getRemainPointsDay/${localStorage.getItem('session')}`,
            })
            .then(response => {
              var temp=response.data[0].Accpoint
              for(var i=0;i<response.data.length;i=i+1)
              {
                  temp=temp+response.data[i].total
                  total.push(temp)
                  date.push(response.data[i].date)
              }
            });
            setRevenue3({
              labels: date,
              datasets: [    
                {
                  label: " ",
                  data: total,
                  fill: false,
                  borderColor: "#742774"
                }
              ]
            
          })
  ;}}>DAYS</div> 
            <div  className="Days"for="rectangle4-39"onClick={(e)=>{
          var total=[]
          var date=[]
            axios({
              method: 'get',
              url: `http://localhost:4000/point/getRemainPointsMonth/${localStorage.getItem('session')}`,
            })
            .then(response => {
              var temp=response.data[0].Accpoint
              for(var i=0;i<response.data.length;i=i+1)
              {
                  temp=temp+response.data[i].total
                  total.push(temp)
                  date.push(response.data[i].date)
              }
            });
            setRevenue3({
              labels: date,
              datasets: [    
                {
                  label: " ",
                  data: total,
                  fill: false,
                  borderColor: "#742774"
                }
              ]
            
          })
  ;}}>MONTHS</div> 
            <div  className="Days"for="rectangle4-41" onClick={(e)=>{
          var total=[]
          var date=[]
            axios({
              method: 'get',
              url: `http://localhost:4000/point/getRemainPointsYear/${localStorage.getItem('session')}`,
            })
            .then(response => {
              var temp=response.data[0].Accpoint
              for(var i=0;i<response.data.length;i=i+1)
              {
                  temp=temp+response.data[i].total
                  total.push(temp)
                  date.push(response.data[i].date)
              }
            });
            setRevenue3({
              labels: date,
              datasets: [    
                {
                  label: " ",
                  data: total,
                  fill: false,
                  borderColor: "#742774"
                }
              ]
            
          })
  ;}}>YEARS</div>                   
        </div>
        </div>
        <div className="container3">  
        <div class="rectangle6-12">      
            <div class="user-list">REVENUE
            <div className="chart-container">
        <Line data={revenue3} options={options} redraw={true}/>
        </div>
        </div>
        </div>
        
      </div>
      </div>
      </div>      
    );
  };