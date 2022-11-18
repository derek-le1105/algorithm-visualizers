import asyncTimeout from '../HelperFunctions/asyncTimeout';
import checkArray from '../HelperFunctions/checkArray';

const prevColor = '#C9B79C';
const compareColor = '#574638';
const iterColor = '#B42D43';

let arrayCopy = [];
let comparisons = 0,
  accesses = 0;
//TODO: Set up color coding

const mergeSort = async ({
  randomArray,
  setRandomArray,
  sortSpeed,
  setArrayComparisons,
  setArrayAccesses,
}) => {
  let leftIdx = 0,
    rightIdx = randomArray.length;
  arrayCopy = randomArray.slice();
  await splitArray(
    leftIdx,
    rightIdx,
    setRandomArray,
    sortSpeed,
    setArrayComparisons,
    setArrayAccesses
  );
  await checkArray(arrayCopy);
  comparisons = 0;
  accesses = 0;
};

const splitArray = async (
  leftIdx,
  rightIdx,
  setRandomArray,
  sortSpeed,
  setArrayComparisons,
  setArrayAccesses
) => {
  if (rightIdx - leftIdx <= 1) return;

  let middle = Math.floor((leftIdx + rightIdx) / 2);
  await splitArray(
    leftIdx,
    middle,
    setRandomArray,
    sortSpeed,
    setArrayComparisons,
    setArrayAccesses
  );
  await splitArray(
    middle,
    rightIdx,
    setRandomArray,
    sortSpeed,
    setArrayComparisons,
    setArrayAccesses
  );

  await mergeArray(
    leftIdx,
    middle,
    rightIdx,
    setRandomArray,
    sortSpeed,
    setArrayComparisons,
    setArrayAccesses
  );
};

const mergeArray = async (
  leftIdx,
  middle,
  rightIdx,
  setRandomArray,
  sortSpeed,
  setArrayComparisons,
  setArrayAccesses
) => {
  let i = 0,
    j = 0;

  let leftArr = arrayCopy.slice(leftIdx, middle);
  let rightArr = arrayCopy.slice(middle, rightIdx);
  let tempArray = [];
  let leftBar, rightBar, bar1, bar2;

  leftBar = document.getElementById(`bar-${leftIdx}`);
  leftBar.style.background = compareColor;

  rightBar = document.getElementById(`bar-${rightIdx - 1}`);
  rightBar.style.background = compareColor;

  while (i < leftArr.length && j < rightArr.length) {
    await asyncTimeout({ timeout: sortSpeed / 3 });
    comparisons++;
    accesses += 2;
    if (leftArr[i] <= rightArr[j]) {
      if (bar1) bar1.style.backgroundColor = prevColor;
      if (leftIdx !== leftIdx + i)
        bar1 = document.getElementById(`bar-${leftIdx + i}`);
      else bar1 = document.getElementById(`bar-${leftIdx + i + 1}`);
      bar1.style.backgroundColor = iterColor;
      tempArray.push(leftArr[i]);
      i++;
    } else {
      if (bar2) bar2.style.backgroundColor = prevColor;
      bar2 = document.getElementById(`bar-${middle + j}`);
      bar2.style.backgroundColor = iterColor;
      tempArray.push(rightArr[j]);
      j++;
    }
    setArrayComparisons(comparisons);
    setArrayAccesses(accesses);
  }
  if (bar1) bar1.style.backgroundColor = prevColor;
  if (bar2) bar2.style.backgroundColor = prevColor;

  while (i < leftArr.length) {
    tempArray.push(leftArr[i]);
    setArrayAccesses(++accesses);
    i++;
  }
  while (j < rightArr.length) {
    tempArray.push(rightArr[j]);
    setArrayAccesses(++accesses);
    j++;
  }
  let newBar;

  let bar3 = document.getElementById(`bar-${middle}`);
  bar3.style.background = compareColor;

  for (let iter = leftIdx, k = 0; iter < rightIdx; iter++, k++) {
    arrayCopy[iter] = tempArray[k];
    setArrayAccesses(++accesses);
    await asyncTimeout({ timeout: sortSpeed / 3 });
    if (newBar) newBar.style.background = prevColor;
    if (iter !== leftIdx) {
      newBar = document.getElementById(`bar-${iter}`);
      newBar.style.background = iterColor;
    }
    setRandomArray(arrayCopy.concat());
    await asyncTimeout({ timeout: sortSpeed / 3 });
  }
  leftBar.style.background = prevColor;
  rightBar.style.background = prevColor;
  newBar.style.background = prevColor;
};

export default mergeSort;
