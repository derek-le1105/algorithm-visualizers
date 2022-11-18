import "./Home.css";

import Module from "./Module";
import sort from "../../Assets/Images/sort.PNG";
import sortGif from "../../Assets/Gifs/sort-gif.gif";

const Home = () => {
  return (
    <>
      <div className="module-container">
        <Module
          image={sort}
          gif={sortGif}
          title={"Sorting Visualizer"}
        ></Module>
        <Module image={sort} gif={sortGif} title={"asdf"}></Module>
        <Module image={sort} gif={sortGif} title={"asdf"}></Module>
        <Module image={sort} gif={sortGif} title={"asdf"}></Module>
        <Module image={sort} gif={sortGif} title={"asdf"}></Module>
        <Module image={sort} gif={sortGif} title={"asdf"}></Module>
        <Module image={sort} gif={sortGif} title={"asdf"}></Module>
        <Module image={sort} gif={sortGif} title={"asdf"}></Module>
      </div>
    </>
  );
};

export default Home;
