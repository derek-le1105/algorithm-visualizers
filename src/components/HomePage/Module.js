import "./Module.css";

import { Link } from "react-router-dom";

const changeGif = (title, gif) => {
  document.getElementById(title).src = gif;
};

//TODO: figure out hover to show gif

const Module = ({ image, gif, title, link }) => {
  return (
    <>
      <div className="module">
        <Link to={`/${link}`} style={{ color: "black" }}>
          <div className="title-container">
            <span>{title}</span>
            <div className="horizontal-bar"></div>
          </div>
          <img className="module-image" src={image} alt="alt"></img>
        </Link>
      </div>
    </>
  );
};

export default Module;
