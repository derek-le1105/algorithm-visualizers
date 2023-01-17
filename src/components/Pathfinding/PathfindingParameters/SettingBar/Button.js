const Button = (props) => {
  const taskClick = () => {
    props.task();
  };

  return (
    <>
      <button
        onClick={taskClick}
        style={{
          margin: "15px",
          padding: "0 30px",
          fontWeight: "bold",
          borderRadius: "5px",
        }}
      >
        {props.title}
      </button>
    </>
  );
};

export default Button;
