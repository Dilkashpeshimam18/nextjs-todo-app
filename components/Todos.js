"use client";

import { useState } from "react";

export default function Todos({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState("");

  async function addTodo() {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text: input }),
      headers: { "Content-Type": "application/json" },
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setInput("");
  }

  async function toggleTodo(id, completed) {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed }),
      headers: { "Content-Type": "application/json" },
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  }

  async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new todo..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <span
              onClick={() => toggleTodo(todo.id, !todo.completed)}
              className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

