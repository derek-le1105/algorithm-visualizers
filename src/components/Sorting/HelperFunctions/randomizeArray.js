const randomizeArray = (arraySize) => {
  let array = [];
  if (arraySize > 200) arraySize = 200;
  for (let i = 0; i < arraySize; ++i) {
    array.push(Math.floor(Math.random() * 600) + 10);
  }

  return array;
};

export default randomizeArray;
