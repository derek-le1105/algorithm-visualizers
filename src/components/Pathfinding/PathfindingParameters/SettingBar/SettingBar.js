import Button from './Button'
import AlgorithmDropDown from '../AlgorithmDropDown/AlgorithmDropDown'
import './SettingBar.css'

const SettingBar = ({
  isFinding,
  algorithm,
  setAlgorithm,
  maze,
  setMaze,
  startPathFind,
  generateMaze,
  resetBoard,
  algoList,
  mazeList,
  resetPath,
}) => {
  return (
    <>
      <div className="setting-bar" style={{ maxWidth: '100%' }}>
        <AlgorithmDropDown
          item={algorithm}
          setItem={setAlgorithm}
          itemList={algoList}
        ></AlgorithmDropDown>
        <AlgorithmDropDown
          item={maze}
          setItem={setMaze}
          itemList={mazeList}
        ></AlgorithmDropDown>
        <Button title="Reset Board" task={resetBoard}></Button>
        <Button title="Generate maze" task={generateMaze}></Button>
        <Button title="Clear Path" task={resetPath}></Button>
        <Button title="Visualize" task={startPathFind}></Button>
      </div>
    </>
  )
}

export default SettingBar
