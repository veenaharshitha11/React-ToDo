import { useState } from 'react';
import './TodoInput.css'

const TodoInput = ({ todo, setTodo, addTodo }) => {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        name="todo"
        value={todo}
        className='todo-input'
        placeholder="Create a new todo"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button className="add-button" onClick={addTodo}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;