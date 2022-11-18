import asyncTimeout from '../HelperFunctions/asyncTimeout';
import checkArray from '../HelperFunctions/checkArray';

const prevColor = '#C9B79C';
const compareColor = '#574638';
const iteratingColor = '#B42D43';
const swappingColor = `#CF963A`;

const selectionSort = async ({
  randomArray,
  setRandomArray,
  sortSpeed,
  setArrayComparisons,
  setArrayAccesses,
}) => {
  let comparisons = 0,
    accesses = 0;
  for (let i = 0; i < randomArray.length; i++) {
    let minIdx = i;
    let pivotBar, iteratingBar, swapBar;
    let newMinFound = false;

    pivotBar = document.getElementById(`bar-${minIdx}`);
    pivotBar.style.backgroundColor = compareColor;
    await asyncTimeout({ timeout: sortSpeed / 5 });

    for (let j = i + 1; j < randomArray.length; j++) {
      iteratingBar = document.getElementById(`bar-${j}`);
      iteratingBar.style.backgroundColor = iteratingColor;
      await asyncTimeout({ timeout: sortSpeed / 5 });
      //if we find an element that is lesser than pivot, make our minIdx(pivot) become that element
      setArrayComparisons(++comparisons);
      accesses += 2;
      setArrayAccesses(accesses);
      if (randomArray[minIdx] > randomArray[j]) {
        if (swapBar) swapBar.style.backgroundColor = prevColor;
        swapBar = document.getElementById(`bar-${j}`);
        swapBar.style.backgroundColor = swappingColor;
        minIdx = j;
        newMinFound = true;
      }

      await asyncTimeout({ timeout: sortSpeed / 5 });
      if (!newMinFound) iteratingBar.style.backgroundColor = prevColor;
      newMinFound = false;
    }
    await asyncTimeout({ timeout: sortSpeed / 5 });
    let temp = randomArray[minIdx];
    randomArray[minIdx] = randomArray[i];
    randomArray[i] = temp;
    setRandomArray(randomArray.concat());

    accesses += 3;
    setArrayAccesses(accesses);

    pivotBar.style.backgroundColor = prevColor;
    if (swapBar) swapBar.style.backgroundColor = prevColor;
    await asyncTimeout({ timeout: sortSpeed / 5 });
  }

  await checkArray(randomArray);
};

export default selectionSort;
