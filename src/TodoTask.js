import React from 'react';

const TodoTask = (props) =>{
    return (
      <li className="task">
      <span
        onClick={()=>{props.toggleTodo(props._id, props.completed)}}
        style={{
          textDecoration: props.completed ? 'line-through' : 'none'
        }}
      >
        {props.name}
      </span>
        <span 
          onClick={()=> props.deleteTodo(props._id)}
          id="deleteSpan"
        >X</span>
      </li>
    )
}


export default TodoTask;