import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav">
      <NavLink to={"/"} style={{ textDecoration: "none" }}>
        <p className="nav-head">Hotel Booking</p>
      </NavLink>
      <NavLink to={"/register"} style={{ textDecoration: "none" }}>
        <p className="nav-button">Book Now!</p>
      </NavLink>
    </nav>
  );
};

export default NavBar;
