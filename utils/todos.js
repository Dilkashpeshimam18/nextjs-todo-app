import { promises } from 'fs';
import path from 'path';

const todoFilePath = path.join(process.cwd(), 'data', 'todos.json');

async function ensureFileData() {
  try {
    await promises.access(todoFilePath);
  } catch {
    await promises.writeFile(filePath, JSON.stringify([]));
  }
}
export async function getAllTodos() {
  await ensureFileData();

  const todos = await promises.readFile(todoFilePath, 'utf-8');
  return JSON.parse(todos);
}

export async function addTodoInFile(todos) {
  await promises.writeFile(todoFilePath, JSON.stringify(todos, null, 2));
}
export async function addTodos(data) {
  const todos = await getAllTodos();
  const todo = { id: Date.now().toString(), data };
  todos.push(todo);

  await addTodoInFile(todos);

  return todo;
}

export async function updateTodo(id, updateData) {
  const todos = await getAllTodos();
  const updated = todos.map((t) => (t.id === id ? { ...t, ...updateData } : t));
  await addTodoInFile(updated);
  return updated.find((t) => t.id === id);
}
export async function deleteTodo(id) {
  const todos = await getAllTodos();
  const filtered = todos.filter((t) => t.id !== id);
  await addTodoInFile(filtered);
  return true;
}
