import "./NavBar.css";

import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <NavLink to="/" className="link-component">
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
    </div>
  );
};

export default NavBar;
