import React from "react";
import "./Styles/Header.css";
import logo from "./resource/meal_logo.jpg";

export default function Header() {
  return (
    <div className="HeaderDiv">
      <img className="Logo" src={logo} alt="Logo" />
    </div>
  );
}
