import "./Home.css";

import Module from "./Module";
import sort from "../../Assets/Images/sort.PNG";
import sortGif from "../../Assets/Gifs/sort-gif.gif";
import pathfind from "../../Assets/Images/pathfind.PNG";
import pathfindGif from "../../Assets/Gifs/pathfind-gif.gif";
import NavBar from "../NavBar/NavBar";

const Home = () => {
  return (
    <>
      <NavBar location="home"></NavBar>
      <div className="main-body">
        <header>
          <h1>Algorithm Visualizer</h1>
          <hr></hr>
        </header>

        <div className="module-container">
          <Module
            image={sort}
            gif={sortGif}
            title={"Sorting Visualizer"}
            link={"sorting-visualizer"}
          ></Module>
          <Module
            image={pathfind}
            gif={pathfindGif}
            title={"Pathfinding Visualizer"}
            link={"pathfinding-visualizer"}
          ></Module>
          <Module
            image={pathfind}
            gif={pathfindGif}
            title={"8 Tile Solver"}
            link={"pathfinding-visualizer"}
          ></Module>
        </div>
      </div>
    </>
  );
};

export default Home;
