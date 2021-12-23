import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (data) {
      setTodos(data);
    }
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    if (todo && toggle) {
      const newTodo = {
        todo,
        id: uuidv4(),
      };
      setTodos([newTodo, ...todos]);
      localStorage.setItem("todos", JSON.stringify([newTodo, ...todos]));
      setTodo("");
    } else if (todo && !toggle) {
      //problems : i can't store the data in localstorage when i edit the data
      setTodos(
        todos.map((item) => {
          if (item.id === editId) {
            return { ...item, todo };
          }
          //localStorage.setItem("todos", JSON.stringify([]));

          return item;
        })
      );

      setTodo("");
      setToggle(true);
      setEditId(null);
    } else {
      alert("Please Add Your Todo");
    }
  };
  const remove = (id) => {
    const newItem = todos.filter((todo) => todo.id !== id);
    setTodos(newItem);
    localStorage.setItem("todos", JSON.stringify(newItem));
  };
  const edit = (id) => {
    const editItem = todos.find((item) => item.id === id);
    setTodo(editItem.todo);
    setToggle(false);
    setEditId(id);
  };
  return (
    <div className="todo">
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          placeholder="Write here...."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        {toggle ? (
          <Button type="submit" className="mb-2 p-2">
            Add Todo
          </Button>
        ) : (
          <Button type="submit" className="mb-2 p-2">
            Edit Todo
          </Button>
        )}
      </form>
      <div className="display-todo">
        {todos.length > 0 ? (
          todos.map((todo) => {
            return (
              <div key={todo.id} className="todos">
                <div className="text">{todo.todo}</div>
                <div className="actions">
                  <button
                    className="btn btn-danger"
                    onClick={() => remove(todo.id)}>
                    Remove
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => edit(todo.id)}>
                    Edit
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Your Todo is Empty</h2>
        )}
      </div>
    </div>
  );
};

export default Todo;
