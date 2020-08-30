import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationTab.css';

function NavigationTab() {

  const [colors, setColors] = useState(['red', 'orange', 'green', 'pink']);
  const logoutHandler = () => {
    localStorage.removeItem('Access-Token');
    window.location.href = "/login";
  }
  return (
    <nav className="navigation" style={{boxShadow: `-1px 1px 56px -10px ${colors[Math.floor(Math.random() * colors.length)]}`}}>
        <div>
          <Link to="/myprofile"> 
            <img className="logo" src="" alt=""/>
            </Link>
        </div>
        <div className="nav__options">
        <Link className="options" to="/home">
            <h4 className="optionh4">Home</h4>
          </Link>
          <Link className="options" to="/myprofile">
            <h4 className="optionh4">My Profile</h4>
          </Link>
          <Link className="options" to="/allgames">
            <h4 className="optionh4">All Games</h4>
          </Link>
          <Link className="options" to="/upload">
            <h4 className="optionh4">Upload</h4>
          </Link>
          <h4 className="optionh4" onClick={logoutHandler}>Logout</h4>
        </div>
    </nav>
  )
}

export default NavigationTab
