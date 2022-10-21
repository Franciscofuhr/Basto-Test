import React from "react";
import logoPic from "../../utils/logopic.png";
import s from "./NavBar.module.css";
const NavBar = () => {
  return (
    <div className={s.navBarContainer}>
      <div style={{ display: "flex", alignItems: "center" ,marginLeft:"30px"}}>
        <img src={logoPic} style={{ height: "50px", width: "50px" }}></img>
        <h3 style={{fontWeight:"600"}}>Basto</h3>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginRight: "33px" }}
      >
        <i class="fa-solid fa-bell" style={{color:"grey"}}></i>
        <p className={s.notifications}>0</p>
        <i class="fa-solid fa-arrow-right-from-bracket fa-2x"></i>
           </div>
    </div>
  );
};
export default NavBar;
