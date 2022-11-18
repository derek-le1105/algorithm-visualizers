import asyncTimeout from '../HelperFunctions/asyncTimeout';
import checkArray from '../HelperFunctions/checkArray';

const prevColor = '#C9B79C';
const compareColor2 = '#B42D43';

const cocktailSort = async ({
  randomArray,
  setRandomArray,
  sortSpeed,
  setArrayComparisons,
  setArrayAccesses,
}) => {
  let isSwapped = true;
  let start = 0,
    end = randomArray.length;
  let comparisons = 0,
    accesses = 0;

  while (isSwapped) {
    isSwapped = false;
    let bar1, bar2;

    for (let i = start; i < end - 1; ++i) {
      if (bar1) bar1.style.backgroundColor = prevColor;

      comparisons++;
      accesses += 2;

      await asyncTimeout({ timeout: sortSpeed / 6 });
      bar1 = document.getElementById(`bar-${i}`);
      bar2 = document.getElementById(`bar-${i + 1}`);

      bar1.style.backgroundColor = compareColor2;
      bar2.style.backgroundColor = compareColor2;

      await asyncTimeout({ timeout: sortSpeed / 6 });
      if (randomArray[i] > randomArray[i + 1]) {
        let temp = randomArray[i];
        randomArray[i] = randomArray[i + 1];
        randomArray[i + 1] = temp;

        setRandomArray(randomArray.concat());
        isSwapped = true;

        accesses += 3;
      }
      setArrayComparisons(comparisons);
      setArrayAccesses(accesses);
    }
    if (bar2) bar2.style.backgroundColor = prevColor;
    await asyncTimeout({ timeout: sortSpeed / 6 });
    if (!isSwapped) break;
    end -= 1;

    for (let i = end - 1; i >= start; i--) {
      if (bar2) bar2.style.backgroundColor = prevColor;
      comparisons++;
      accesses += 2;

      await asyncTimeout({ timeout: sortSpeed / 6 });
      bar1 = document.getElementById(`bar-${i}`);
      bar2 = document.getElementById(`bar-${i + 1}`);

      bar1.style.backgroundColor = compareColor2;
      bar2.style.backgroundColor = compareColor2;

      await asyncTimeout({ timeout: sortSpeed / 6 });
      if (randomArray[i] > randomArray[i + 1]) {
        let temp = randomArray[i];
        randomArray[i] = randomArray[i + 1];
        randomArray[i + 1] = temp;

        setRandomArray(randomArray.concat());

        isSwapped = true;

        accesses += 3;
      }
      setArrayComparisons(comparisons);
      setArrayAccesses(accesses);
    }
    if (bar1) bar1.style.backgroundColor = prevColor;
    await asyncTimeout({ timeout: sortSpeed / 6 });
    start += 1;
  }

  await checkArray(randomArray);
};

export default cocktailSort;
