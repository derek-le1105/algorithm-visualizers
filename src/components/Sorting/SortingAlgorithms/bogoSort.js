import asyncTimeout from '../HelperFunctions/asyncTimeout';
import checkArray from '../HelperFunctions/checkArray';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const bogoSort = async ({
  randomArray,
  setRandomArray,
  sortSpeed,
  setArrayComparisons,
  setArrayAccesses,
}) => {
  let totalComparisons = 0,
    totalAccesses = 0;
  let arr = randomArray.concat();
  let [isSorted, comparisons, accesses] = await checkArray(arr);
  while (!isSorted) {
    totalComparisons += comparisons;
    totalAccesses += accesses;
    setArrayComparisons(totalComparisons);
    setArrayAccesses(totalAccesses);
    shuffleArray(arr);
    setRandomArray(arr.concat());
    await asyncTimeout({ timeout: sortSpeed });
    [isSorted, comparisons, accesses] = await checkArray(arr);
  }
};

export default bogoSort;
