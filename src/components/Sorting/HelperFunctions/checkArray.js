import asyncTimeout from './asyncTimeout';

const prevColor = '#C9B79C';
const correctColor = `#899886`;

const checkArray = async (array) => {
  let comparisons = 0,
    accesses = 0;
  for (let i = 0; i < array.length; i++) {
    let currBar = document.getElementById(`bar-${i}`);
    currBar.style.backgroundColor = correctColor;
    await asyncTimeout({ timeout: 10 });
    ++comparisons;
    accesses += 2;
    if (array[i] > array[i + 1]) {
      for (let j = i; j >= 0; --j) {
        currBar = document.getElementById(`bar-${j}`);
        currBar.style.backgroundColor = prevColor;
      }
      return [false, comparisons, accesses];
    }
  }
  return [true, comparisons, accesses];
};

export default checkArray;
