import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, TaskStatus } from "@/types";

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, description?: string) => void;
  updateTask: (id: string, updates: Partial<Pick<Task, "title" | "description" | "status">>) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (title, description = "") => {
        const task: Task = {
          id: crypto.randomUUID(),
          title: title.trim(),
          description,
          status: "todo",
          createdAt: Date.now(),
        };
        set((state) => ({ tasks: [task, ...state.tasks] }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
      },

      clearCompleted: () => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.status !== "done"),
        }));
      },
    }),
    {
      name: "tasks-storage", // localStorage key
    }
  )
);
