import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import SortingVisualizer from "./components/Sorting/SortingVisualizer";
import PathfindingVisualizer from "./components/Pathfinding/Pathfinding";
import EightTile from "./components/EightTile/EightTile";
import Home from "./components/HomePage/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting-visualizer" element={<SortingVisualizer />} />
        <Route
          path="/pathfinding-visualizer"
          element={<PathfindingVisualizer />}
        />
        <Route path="/eight-tile" element={<EightTile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
