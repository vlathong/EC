import "../App.css";
import search from "../asset/img/magnifying-glass-solid.svg"
import bag from "../asset/img/bag-shopping-solid (1).svg"
import slider from "../asset/img/desktop_slider_jun_c37012_w28257_2628x935_c65ff4e69e4346138d017aa6aec0b4e2 1.png"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
export const Nav = () => {
    const navigate=useNavigate()
  return (
    <div className="nav">
        <div className="topNav">
        {localStorage.getItem('session') ? <a onClick={()=>{
            axios({
                method: 'get',
                url: `http://localhost:4001/auth/logout`,
              })
            .then(response => {
              
            });
            navigate("/Login")
        }}>Logout</a> : <a>Login/Register</a>}
            
            <hr></hr>
        </div>
        <div className="midNav">
            <div className="midNavleft">KING SHOES</div>
            <div className="midNavmid">
                <nav>
                <Link to="/ManageProduct">Shop</Link>
                <a href="/Profile">Profile</a>
                <Link to="/Order">History</Link>       
                <a href="/Managepointuser">Revenue</a>
                </nav>
            </div>
            <div className="midNavright">
                <img className="searchNav" src={search}></img>
                <input className="searchInput"type="box" placeholder="Search"></input>
                <Link to="/bagproduct" className="th">
                <img className="bagProduct"src={bag}></img>
      </Link>
                
            </div>
        </div>
        <div className="botNav">
            <img className="slider" src={slider}></img>
        </div>
    </div>

  );
};
export default Nav;

