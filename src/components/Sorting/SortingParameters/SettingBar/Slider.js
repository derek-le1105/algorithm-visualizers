import { useState } from 'react';
import ElementMaker from './ElementMaker';

const Slider = (props) => {
  const [size, setSize] = useState(props.defaultValue);
  const [changeInput, setChangeInput] = useState(false);

  const changeSize = (e) => {
    if (e.target.value > props.max) setSize(props.max);
    else setSize(e.target.value);
    props.onSlide(parseInt(e.target.value));
    //document.getElementById(props.id).innerHTML = this.value;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '210px',
      }}
    >
      <span style={{ color: 'white' }}>{props.text}: </span>
      <input
        type="range"
        disabled={props.isRunning}
        onChange={changeSize}
        min={props.min}
        max={props.max}
        defaultValue={props.defaultValue}
        value={size}
      ></input>
      <span>
        <ElementMaker
          value={size}
          handleChange={changeSize}
          handleDoubleClick={() => setChangeInput(true)}
          handleBlur={() => setChangeInput(false)}
          changeInput={changeInput}
        ></ElementMaker>
      </span>
    </div>
  );
};

export default Slider;
