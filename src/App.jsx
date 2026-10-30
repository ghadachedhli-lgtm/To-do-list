import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  const handleAddTodo = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    setTodos([...todos, { completed: false, text }]);
    inputRef.current.value = "";
  };

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      completed: !newTodos[index].completed,
    };
    setTodos(newTodos);
  };

  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h2>To Do List</h2>
      <div className="row enterTask">
        <div className="col">
          <input
            className="todo-iput"
            ref={inputRef}
            placeholder="Enter a task ..."
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          />
          <button className="btn btn-primary" type="button" onClick={handleAddTodo}>
            Add
          </button>
        </div>

        <ul>
          {todos.map(({ text, completed }, index) => (
            <div className="row" key={index}>
              <div className="col-2">
                <input
                  type="checkbox"
                  className="todo-check"
                  checked={completed}
                  onChange={() => handleItemDone(index)}
                  aria-label={`Mark "${text}" as done`}
                />
              </div>
              <div className="col-8">
                <li
                  className={completed ? "done" : ""}
                  onClick={() => handleItemDone(index)}
                >
                  {text}
                </li>
              </div>
              <div className="col-2">
                <span onClick={() => handleDeleteItem(index)}>X</span>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
