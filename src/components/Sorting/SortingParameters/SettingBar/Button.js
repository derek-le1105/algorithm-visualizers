import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = (props) => {
  const taskClick = () => {
    props.task();
    if (props.setArrayComparisons) props.setArrayComparisons(0);
    if (props.setArrayAccesses) props.setArrayAccesses(0);
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
