'use client';

import { useState } from 'react';

export default function Todos({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState('');

  async function addTodo() {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text: input }),
      headers: { 'Content-Type': 'application/json' },
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setInput('');
  }

  async function toggleTodo(id, completed) {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
      headers: { 'Content-Type': 'application/json' },
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  }

  async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add new todo..." />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.content}- Status:{todo.completed? 'true':'false'}</span>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
              ✕
            </button>
            <button onClick={() => toggleTodo(todo.id, !todo.completed)} style={{ cursor: 'pointer' }}>
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
