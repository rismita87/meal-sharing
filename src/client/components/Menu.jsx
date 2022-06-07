import React, { useState } from "react";
import "./Styles/Menu.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
function Menu(props) {
  const [menuDisplayState, setMenuDisplayState] = useState("MenuCollapse");
  const pushToRoute = (route) => {
    props.history.push(route);
    setMenuDisplayState("MenuCollapse");
  };
  return (
    <div
      className="Menu"
      onClick={(e) => {
        if (menuDisplayState == "MenuCollapse") {
          setMenuDisplayState("MenuExpand");
        } else {
          setMenuDisplayState("MenuCollapse");
        }
      }}
    >
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <div className={menuDisplayState}>
        <Link to="/" className="linkMenu" onClick={() => pushToRoute("/")}>
          Home
        </Link>
        <Link
          to="/meals"
          className="linkMenu"
          onClick={() => pushToRoute("/meals")}
        >
          Meals
        </Link>
        <Link
          to="/newmeal"
          className="linkMenu"
          onClick={() => pushToRoute("/newmeal")}
        >
          NewMeal
        </Link>
      </div>
    </div>
  );
}
export default withRouter(Menu);
