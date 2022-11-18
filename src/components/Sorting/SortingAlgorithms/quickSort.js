import asyncTimeout from '../HelperFunctions/asyncTimeout';
import checkArray from '../HelperFunctions/checkArray';

const prevColor = '#C9B79C';
const compareColor = '#574638';
const iteratingColor = '#B42D43';
const swappingColor = `#CF963A`;

let sortSpd;
let comparisons = 0,
  accesses = 0;

const quickSort = async ({
  randomArray,
  setRandomArray,
  sortSpeed,
  setArrayComparisons,
  setArrayAccesses,
}) => {
  sortSpd = sortSpeed;
  let leftIdx = 0,
    rightIdx = randomArray.length - 1;
  await quickSortHelper(
    randomArray,
    leftIdx,
    rightIdx,
    setRandomArray,
    setArrayComparisons,
    setArrayAccesses
  );
  await checkArray(randomArray);
};

const quickSortHelper = async (
  randomArray,
  leftIdx,
  rightIdx,
  setRandomArray,
  setArrayComparisons,
  setArrayAccesses
) => {
  if (leftIdx < rightIdx) {
    let partitionIdx = await partition(
      randomArray,
      leftIdx,
      rightIdx,
      setRandomArray,
      setArrayComparisons,
      setArrayAccesses
    );
    await quickSortHelper(
      randomArray,
      leftIdx,
      partitionIdx - 1,
      setRandomArray,
      setArrayComparisons,
      setArrayAccesses
    );
    await quickSortHelper(
      randomArray,
      partitionIdx + 1,
      rightIdx,
      setRandomArray,
      setArrayComparisons,
      setArrayAccesses
    );
  }
};

const partition = async (
  randomArray,
  leftIdx,
  rightIdx,
  setRandomArray,
  setArrayComparisons,
  setArrayAccesses
) => {
  let pivot = randomArray[rightIdx];
  let i = leftIdx - 1; //becomes second pivot

  let pivotBar = document.getElementById(`bar-${rightIdx}`);
  let ithBar;
  pivotBar.style.backgroundColor = compareColor;

  await asyncTimeout({ timeout: sortSpd / 3 });

  for (let j = leftIdx; j < rightIdx; j++) {
    let iteratorBar = document.getElementById(`bar-${j}`);
    ithBar =
      i >= 0
        ? document.getElementById(`bar-${i + 1}`)
        : document.getElementById(`bar-${0}`);
    if (j !== leftIdx) iteratorBar.style.backgroundColor = iteratingColor;
    ithBar.style.backgroundColor = swappingColor;

    await asyncTimeout({ timeout: sortSpd / 3 });

    comparisons += 1;
    accesses++;
    if (randomArray[j] <= pivot) {
      i++;
      let temp = randomArray[j];
      randomArray[j] = randomArray[i];
      randomArray[i] = temp;
      accesses += 3;
      setRandomArray(randomArray.concat());
      await asyncTimeout({ timeout: sortSpd / 3 });
      ithBar.style.backgroundColor = prevColor;
    }
    iteratorBar.style.backgroundColor = prevColor;
    setArrayComparisons(comparisons);
    setArrayAccesses(accesses);
  }

  let temp = randomArray[i + 1];
  randomArray[i + 1] = randomArray[rightIdx];
  randomArray[rightIdx] = temp;
  accesses += 3;
  setRandomArray(randomArray.concat());

  if (ithBar) ithBar.style.backgroundColor = prevColor;
  pivotBar.style.backgroundColor = prevColor;
  setArrayComparisons(comparisons);
  setArrayAccesses(accesses);

  return i + 1;
};

export default quickSort;
