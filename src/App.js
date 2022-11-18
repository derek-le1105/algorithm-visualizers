import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import SortingVisualizer from "./components/Sorting/SortingVisualizer";
import Home from "./components/HomePage/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting-visualizer" element={<SortingVisualizer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
