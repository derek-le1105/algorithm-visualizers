const ElementMaker = (props) => {
  return (
    <span>
      {props.changeInput ? (
        <input
          type="number"
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          min={5}
          max={100}
          style={{
            width: '40px',
          }}
        />
      ) : (
        <span
          onDoubleClick={props.handleDoubleClick}
          style={{
            display: 'inline-block',
            height: '25px',
            color: 'white',
          }}
        >
          {props.value}
        </span>
      )}
    </span>
  );
};
export default ElementMaker;
