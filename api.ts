import { Task } from "./types/tasks";

const baseUrl = "https://59vr62-3001.csb.app";

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${baseUrl}/tasks`, {
    cache: "no-store",
  });
  const todos = await response.json();

  return todos;
};

export const addTask = async (todo: Task): Promise<Task> => {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const newTodo = await response.json();

  return newTodo;
};

export const updateTask = async (todo: Task): Promise<Task> => {
  const response = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const updatedTodo = await response.json();

  return updatedTodo;
};

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
};
