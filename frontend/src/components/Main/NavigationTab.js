import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./NavigationTab.css";
import CloseIcon from '@material-ui/icons/Close';

function NavigationTab() {
  const logoutHandler = () => {
    localStorage.removeItem("Access-Token");
    window.location.href = "/login";
  };

  const [burgerOpen, setBurgerOpen] = useState(false);



  return (
    <nav className="navigation">

      <div>
        <Link to="/myprofile">
          <h3 className="logo">Indi Gamers</h3>
        </Link>
      </div>
      <div className="nav__options">
        <Link className="options_" to="/home">
          <h4 className="optionh4">Home</h4>
        </Link>
        <Link className="options_" to="/myprofile">
          <h4 className="optionh4">My Profile</h4>
        </Link>
        <Link className="options_" to="/allgames">
          <h4 className="optionh4">All Games</h4>
        </Link>
        <Link className="options_" to="/upload">
          <h4 className="optionh4">Upload</h4>
        </Link>
        <h4 className="optionh4" onClick={logoutHandler}>
          Logout
        </h4>
      </div>
  
      {
        burgerOpen ? (
        <div className="expanded_nav">
          <CloseIcon onClick={()=>setBurgerOpen(false)} className="close"></CloseIcon>
          <Link onClick={()=>setBurgerOpen(false)} className="options" to="/home">
            <h4 className="option">Home</h4>
          </Link>
          <Link onClick={()=>setBurgerOpen(false)} className="options" to="/myprofile">
            <h4 className="option">My Profile</h4>
          </Link>
          <Link onClick={()=>setBurgerOpen(false)}  className="options" to="/allgames">
            <h4 className="option">All Games</h4>
          </Link>
          <Link onClick={()=>setBurgerOpen(false)}  className="options" to="/upload">
            <h4 className="option">Upload</h4>
          </Link>
          <h4 className="options" style={{cursor: 'pointer'}} onClick={logoutHandler}>
            Logout
          </h4>
        </div>
        ) 
        : 
        (
            <div className="burger" onClick={() => setBurgerOpen(true)}>
              <div className="one"></div>
              <div className="two"></div>
              <div className="three"></div>
            </div>
        )
      }

          
    </nav>
  )
  
}

export default NavigationTab;
