const Button = (props) => {
  const taskClick = () => {
    props.task();
    if (props.setArrayComparisons) props.setArrayComparisons(0);
    if (props.setArrayAccesses) props.setArrayAccesses(0);
  };

  return (
    <>
      <button onClick={taskClick} style={{ margin: '15px' }}>
        {props.title}
      </button>
    </>
  );
};

export default Button;
