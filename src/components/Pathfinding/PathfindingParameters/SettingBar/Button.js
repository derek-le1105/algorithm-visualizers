const Button = (props) => {
  const taskClick = () => {
    props.task();
  };

  const buttonColor = () => {
    return props.color ? props.color : "white";
  };

  const textColor = () => {
    return props.color ? "white" : "black";
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
          backgroundColor: buttonColor(),
          color: textColor(),
        }}
      >
        {props.title}
      </button>
    </>
  );
};

export default Button;
