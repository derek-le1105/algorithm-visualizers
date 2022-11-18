import { useState } from 'react';
import './AlgorithmDropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

const AlgorithmDropDown = ({ algorithm, setAlgorithm }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="dropdown" style={{ margin: '15px' }}>
      <button
        onClick={handleMenuOpen}
        style={{ height: `100%`, minWidth: '120px' }}
      >
        <span>{algorithm} </span>
        {
          //got rotate transition from here
          //https://stackoverflow.com/questions/69656883/i-want-the-arrow-icon-to-flip-up-and-down-every-time-the-state-changes-and-i-wan
          <FontAwesomeIcon
            icon={faCaretUp}
            style={{
              transition: 'all 0.5s ease',
              transform: `rotate(${menuOpen ? 0 : `0.5turn`})`,
            }}
          ></FontAwesomeIcon>
        }
      </button>
      {menuOpen && (
        <ul className="algorithm-menu">
          <li className="menu-item">
            <button
              onClick={() => {
                setAlgorithm('Bubble Sort');
                setMenuOpen(!menuOpen);
              }}
            >
              Bubble Sort
            </button>
          </li>
          <li className="menu-item">
            <button
              onClick={() => {
                setAlgorithm('Merge Sort');
                setMenuOpen(!menuOpen);
              }}
            >
              Merge Sort
            </button>
          </li>
          <li className="menu-item">
            <button
              onClick={() => {
                setAlgorithm('Selection Sort');
                setMenuOpen(!menuOpen);
              }}
            >
              Selection Sort
            </button>
          </li>
          <li className="menu-item">
            <button
              onClick={() => {
                setAlgorithm('Quick Sort');
                setMenuOpen(!menuOpen);
              }}
            >
              Quick Sort
            </button>
          </li>
          <li className="menu-item">
            <button
              onClick={() => {
                setAlgorithm('Bogo Sort');
                setMenuOpen(!menuOpen);
              }}
            >
              Bogo Sort
            </button>
          </li>
          <li className="menu-item">
            <button
              onClick={() => {
                setAlgorithm('Cocktail Sort');
                setMenuOpen(!menuOpen);
              }}
            >
              Cocktail Sort
            </button>
          </li>
          <li className="menu-item">
            <button
              onClick={() => {
                setAlgorithm('Insertion Sort');
                setMenuOpen(!menuOpen);
              }}
            >
              Insertion Sort
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AlgorithmDropDown;
