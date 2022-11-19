import "./Home.css";

import Module from "./Module";
import sort from "../../Assets/Images/sort.PNG";
import sortGif from "../../Assets/Gifs/sort-gif.gif";
import NavBar from "../NavBar/NavBar";

const Home = () => {
  return (
    <>
      <NavBar location="home"></NavBar>
      <div className="module-container">
        <Module
          image={sort}
          gif={sortGif}
          title={"Sorting Visualizer"}
          link={"sorting-visualizer"}
        ></Module>
        <Module
          image={sort}
          gif={sortGif}
          title={"Pathfinding Visualizer"}
          link={"pathfinding-visualizer"}
        ></Module>
        <Module image={sort} gif={sortGif} title={"asdf"}></Module>
        <Module image={sort} gif={sortGif} title={"asdf"}></Module>
        <Module image={sort} gif={sortGif} title={"asdf"}></Module>
        <Module image={sort} gif={sortGif} title={"asdf"}></Module>
      </div>
    </>
  );
};

export default Home;
