const Button = (props) => {
  const taskClick = () => {
    props.task()
  }

  return (
    <>
      <button onClick={taskClick} style={{ margin: '15px' }}>
        {props.title}
      </button>
    </>
  )
}

export default Button
