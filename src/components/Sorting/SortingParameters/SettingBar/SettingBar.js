import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './SettingBar.css';
import AlgorithmDropDown from '../AlgorithmDropDown/AlgorithmDropDown';
import Slider from './Slider';
import Button from './Button';

const SettingBar = ({
  isRunning,
  randomizeClicked,
  algorithm,
  setAlgorithm,
  startSort,
  changeArraySize,
  changeSortSpeed,
  setArrayComparisons,
  setArrayAccesses,
}) => {
  return (
    <>
      <div className="setting-bar" style={{ maxWidth: '100%' }}>
        <Button
          task={randomizeClicked}
          setArrayComparisons={setArrayComparisons}
          setArrayAccesses={setArrayAccesses}
          title="Randomize Array"
        ></Button>
        <Slider
          isRunning={isRunning}
          text={'Array Size'}
          id={'sizeSlider'}
          onSlide={changeArraySize}
          min={5}
          max={200}
          defaultValue={100}
        />
        <AlgorithmDropDown
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
        ></AlgorithmDropDown>
        <Slider
          isRunning={isRunning}
          text={'Sort Speed'}
          id={'speedSlider'}
          onSlide={changeSortSpeed}
          min={0}
          max={2000}
          defaultValue={50}
        />

        <Button
          task={startSort}
          setArrayComparisons={setArrayComparisons}
          title="Start"
        ></Button>
      </div>
    </>
  );
};

export default SettingBar;
