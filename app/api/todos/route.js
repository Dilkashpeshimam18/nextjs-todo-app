import { NextResponse } from "next/server";
import { getAllTodos,addTodos } from "@/utils/todos";

export async function GET() {
  const todos = await getAllTodos();
  return NextResponse.json(todos);
}

export async function POST(req) {
  const { text } = await req.json();
  if (!text) return NextResponse.json({ error: "Text required" }, { status: 400 });

  const todo = await addTodos(text);
  return NextResponse.json(todo);
}
