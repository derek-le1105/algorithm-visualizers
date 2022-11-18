import asyncTimeout from '../HelperFunctions/asyncTimeout';
import checkArray from '../HelperFunctions/checkArray';

const prevColor = '#C9B79C';
const compareColor = '#574638';
const compareColor2 = '#B42D43';

const insertionSort = async ({
  randomArray,
  setRandomArray,
  sortSpeed,
  setArrayComparisons,
  setArrayAccesses,
}) => {
  let comparisons = 0,
    accesses = 0;
  let pivotBar, bar1, bar2;
  for (let i = 0; i < randomArray.length; i++) {
    let key = randomArray[i];
    let j = i - 1;
    setArrayAccesses(accesses++);

    if (pivotBar) pivotBar.style.backgroundColor = prevColor;
    if (bar1) bar1.style.backgroundColor = prevColor;

    pivotBar = document.getElementById(`bar-${i}`);
    pivotBar.style.backgroundColor = compareColor;
    await asyncTimeout({ timeout: sortSpeed / 3 });

    setArrayComparisons(comparisons++);
    setArrayAccesses(accesses++);
    while (j >= 0 && key < randomArray[j]) {
      bar1 = document.getElementById(`bar-${j}`);
      bar1.style.backgroundColor = compareColor2;
      bar2 = document.getElementById(`bar-${j + 1}`);
      if (j + 1 !== i) bar2.style.backgroundColor = compareColor2;

      randomArray[j + 1] = randomArray[j];
      j -= 1;

      setRandomArray(randomArray.concat());
      await asyncTimeout({ timeout: sortSpeed / 3 });

      accesses += 2;
      setArrayAccesses(accesses);
      setArrayComparisons(comparisons++);

      bar1.style.backgroundColor = prevColor;
      bar2.style.backgroundColor = prevColor;
      pivotBar.style.backgroundColor = compareColor;
    }
    randomArray[j + 1] = key;
    setArrayAccesses(accesses++);
    setRandomArray(randomArray.concat());
    await asyncTimeout({ timeout: sortSpeed / 3 });
  }
  pivotBar.style.backgroundColor = prevColor;

  await checkArray(randomArray);
};

export default insertionSort;
