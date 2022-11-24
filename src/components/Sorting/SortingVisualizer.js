import "./SortingVisualizer.css";
import SettingBar from "./SortingParameters/SettingBar/SettingBar.js";
import NavBar from "../NavBar/NavBar";

import bubbleSort from "./SortingAlgorithms/bubbleSort.js";
import mergeSort from "./SortingAlgorithms/mergeSort";
import selectionSort from "./SortingAlgorithms/selectionSort";
import quickSort from "./SortingAlgorithms/quickSort";
import bogoSort from "./SortingAlgorithms/bogoSort";
import cocktailSort from "./SortingAlgorithms/cocktailSort";
import insertionSort from "./SortingAlgorithms/insertionSort";

import randomizeArray from "./HelperFunctions/randomizeArray";
import React, { useState } from "react";

const Visualizer = () => {
  const defaultArraySize = 100;

  const [randomArray, setRandomArray] = useState(
    randomizeArray(defaultArraySize)
  );
  const [prevArray, setPrevArray] = useState([]);
  const [sortSpeed, setSortSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState("Algorithm");
  const [arrayComparisons, setArrayComparisons] = useState(0);
  const [arrayAccesses, setArrayAccesses] = useState(0);
  const [isRunning, setRunning] = useState(false);

  const generateArray = () => {
    if (!isRunning) {
      const array = randomizeArray(randomArray.length);
      for (let i = 0; i < array.length; i++) {
        let bar = document.getElementById(`bar-${i}`);
        bar.style.backgroundColor = "white";
      }

      setRandomArray(array);
    }
  };

  const changeArraySize = (value) => {
    if (!isRunning) {
      const arrayChange = randomizeArray(value);
      setRandomArray(arrayChange);
    }
    let bars = document.getElementsByClassName("array-bar");
    for (var i = 0; i < bars.length; i++) {
      if (bars[i].style.backgroundColor != "white")
        bars[i].style.backgroundColor = "white";
    }
  };

  const changeSortSpeed = (value) => {
    setSortSpeed(value);
  };

  const startSort = async () => {
    setPrevArray(randomArray.concat());
    if (!isRunning) {
      setRunning(true);
      switch (algorithm) {
        case "Algorithm":
          alert("Please select a sorting algorithm in the dropdown below");
          break;
        case "Bubble Sort":
          await bubbleSort({
            randomArray,
            setRandomArray,
            sortSpeed,
            setArrayComparisons,
            setArrayAccesses,
          });
          break;
        case "Merge Sort":
          await mergeSort({
            randomArray,
            setRandomArray,
            sortSpeed,
            setArrayComparisons,
            setArrayAccesses,
          });
          break;
        case "Selection Sort":
          await selectionSort({
            randomArray,
            setRandomArray,
            sortSpeed,
            setArrayComparisons,
            setArrayAccesses,
          });
          break;
        case "Quick Sort":
          await quickSort({
            randomArray,
            setRandomArray,
            sortSpeed,
            setArrayComparisons,
            setArrayAccesses,
          });
          break;
        case "Bogo Sort":
          await bogoSort({
            randomArray,
            setRandomArray,
            sortSpeed,
            setArrayComparisons,
            setArrayAccesses,
          });
          break;
        case "Cocktail Sort":
          await cocktailSort({
            randomArray,
            setRandomArray,
            sortSpeed,
            setArrayComparisons,
            setArrayAccesses,
          });
          break;
        case "Insertion Sort":
          await insertionSort({
            randomArray,
            setRandomArray,
            sortSpeed,
            setArrayComparisons,
            setArrayAccesses,
          });
          break;

        default:
          break;
      }
      setRunning(false);
    }
  };

  return (
    <>
      <NavBar location="sorting-visualizer"></NavBar>
      <div className="visualizer-container">
        <div className="sorting-information">
          <span>
            Array Comparisons: {arrayComparisons} <br />
            Array Accesses: {arrayAccesses}
          </span>
        </div>

        <div className="bar-container" id="container">
          {randomArray.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              id={`bar-${idx}`}
              style={{
                height: `${value}px`,
                width: `${100 / randomArray.length}%`,
                backgroundColor: "white",
              }}
            ></div>
          ))}
        </div>
      </div>
      <SettingBar
        isRunning={isRunning}
        randomizeClicked={generateArray}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        startSort={startSort}
        changeArraySize={changeArraySize}
        changeSortSpeed={changeSortSpeed}
        setArrayComparisons={setArrayComparisons}
        setArrayAccesses={setArrayAccesses}
      ></SettingBar>
    </>
  );
};

export default Visualizer;
