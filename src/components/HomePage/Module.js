import "./Module.css";

const changeGif = (title, gif) => {
  document.getElementById(title).src = gif;
};

//TODO: figure out hover to show gif

const Module = ({ image, gif, title }) => {
  return (
    <>
      <div className="module">
        <div className="title-container">
          <span>{title}</span>
          <div className="horizontal-bar"></div>
        </div>

        <img className="module-image" src={image} alt="alt"></img>
      </div>
    </>
  );
};

export default Module;
