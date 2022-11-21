import "./Module.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Module = ({ image, gif, title, link }) => {
  const [isHover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const opacityStyle = {
    opacity: isHover ? 0 : 1,
  };

  return (
    <>
      <div className="module">
        <Link to={`/${link}`} style={{ color: "black" }}>
          <div className="title-container">
            <div className="horizontal-bar">
              <span>{title}</span>
            </div>
          </div>
          <div className="img-asset">
            <img
              className="module-image"
              src={image}
              alt="alt"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={opacityStyle}
            ></img>
            <img className="module-gif" src={gif} alt="gif"></img>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Module;
