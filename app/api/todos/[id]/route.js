import { NextResponse } from "next/server";
import { updateTodo, deleteTodo } from "@/utils/todos";

export async function PUT(req, { params }) {
  const updates = await req.json();
  const todo = await updateTodo(params.id, updates);
  return NextResponse.json(todo);
}

export async function DELETE(_, { params }) {
  await deleteTodo(params.id);
  return NextResponse.json({ success: true });
}
