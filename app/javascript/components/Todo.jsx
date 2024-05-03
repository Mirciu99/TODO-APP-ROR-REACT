import React, { useEffect, useState } from "react";

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const url = "/todos/show_all";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setTodos(res));
  }, []);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/todos/create";

    const body = {
      todo: {
        todo: newTodo,
      },
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
        setNewTodo("");
      })
      .catch((error) => console.error("Fetch error:", error.message));
  };

  const handleToggleStatus = (id) => {
    const todo = todos.find((t) => t.id === id);
    const updatedStatus = !todo.status;

    const body = {
      todo: {
        todo: todo,
        status: updatedStatus,
      },
    };

    fetch(`/todos/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          .content,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        console.log(todos);
        setTodos(
          todos.map((t) => (t.id === id ? { ...t, status: updatedStatus } : t))
        );
      });
  };

  const handleDelete = (id) => {
    fetch(`/todos/destroy/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          .content,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        setTodos(todos.filter((t) => t.id !== id));
      })
  }

  return (
    <div className="container custom-height">
      <div className="w-75">
        <h2 className="text-center mb-4 text-white">List of todos</h2>
        <form className="input-group mb-3" onSubmit={onSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" type="submit" id="button-addon2">
            Add Todo
          </button>
        </form>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Todo</th>
              <th scope="col">Status</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          {todos.map((todo) => (
            <tbody>
              <tr>
                <td>{todo.todo}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleToggleStatus(todo.id)}
                  >
                    {todo.status ? "Complete" : "Incomplete"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};
