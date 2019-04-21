import React from "react";

const TodoItem = props => {
  return (
    <div>
        {props.isFinish ? <strike>{props.item}</strike> : <span>{props.item}</span>}
       <button onClick={() => {
          props.handleDelete(props.item);
      }}>x</button>
      <button onClick={() => {
          props.handleFinish(props.item); 
      }}>+</button>

      {/* {props.children} */} 
    </div>
  );
};

export default TodoItem;
