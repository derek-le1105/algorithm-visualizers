import "./NavBar.css";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const handleMenuClick = () => {
    var comps = document.getElementsByClassName("link-component");
    for (let i = 0; i < comps.length; i++) {
      if (comps[i].style.display === "block") comps[i].style.display = "none";
      else comps[i].style.display = "block";
    }
  };

  return (
    <div className="nav-bar">
      <NavLink to="/" className="main">
        <h1>Algorithm Visualizer</h1>
      </NavLink>
      <div className="vertical-bar"></div>
      <NavLink
        to="/sorting-visualizer"
        className="link-component"
        style={({ isActive }) => ({
          color: isActive ? "white" : "grey",
        })}
      >
        <h4>Sorting Visualizer</h4>
      </NavLink>
      <NavLink
        to="/pathfinding-visualizer"
        className="link-component"
        style={({ isActive }) => ({
          color: isActive ? "white" : "grey",
        })}
      >
        <h4>Pathfinding Visualizer</h4>
      </NavLink>
      <NavLink
        to="/eight-tile"
        className="link-component"
        style={({ isActive }) => ({
          color: isActive ? "white" : "grey",
        })}
      >
        <h4>Eight Tile</h4>
      </NavLink>
      <FontAwesomeIcon
        icon={faBars}
        className="mobile-menu"
        onClick={handleMenuClick}
      ></FontAwesomeIcon>
    </div>
  );
};

export default NavBar;
