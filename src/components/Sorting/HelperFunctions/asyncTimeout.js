const asyncTimeout = ({ timeout } = {}) => {
  //prettier-ignore
  return new Promise(
    (resolve, reject) => setTimeout(
        () => resolve(), timeout
    )
  );
};

export default asyncTimeout;
