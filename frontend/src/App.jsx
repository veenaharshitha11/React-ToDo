import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import axios from "axios";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  // const [error, setError] = useState("");
  // const url = 'http://localhost:5000/todos';

  const url = 'https://react-todo-backend-para.onrender.com/todos';

  useEffect(() => {
    axios.get(url).then((res) => {
      setTodos(res.data);
    })
  }, []);

  const addTodo = async () => {
    if (!todo.trim()) {
      alert("Todo cannot be empty!");
      // setError("Todo cannot be empty!"); 
      return;
    }
    try {
      // setError("");
      const response = await axios.post(url, { text: todo });
      setTodos([...todos, response.data]);
      setTodo("");
    } catch (error) {
      console.error("Error adding todo:", error.response?.data?.error || error.message);
    }
  };

  const deleteTodo = async (id) => {
    axios.delete(`${url}/${id}`).then(() => {
      setTodos(todos.filter(todo => todo._id !== id));
    });
  };

  return (
    <div className="App">
      <h1 className="heading">React Todo App</h1>
      <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} />
      {/* {error && <p className="error-message">{error}</p>} Display error if there's any */}
      <TodoList list={todos} remove={deleteTodo} />
    </div>
  );
};

export default App;