"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Task, TaskStatus } from "@/lib/types";

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-700",
  in_progress: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
};

function TaskItem({ task }: { task: Task }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(status: TaskStatus) {
    setLoading(true);
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask() {
    setLoading(true);
    try {
      await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <select
          value={task.status}
          onChange={(e) => updateStatus(e.target.value as TaskStatus)}
          disabled={loading}
          className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[task.status]}`}
        >
          {(Object.keys(STATUS_LABELS) as TaskStatus[]).map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        <button
          onClick={deleteTask}
          disabled={loading}
          className="text-muted-foreground hover:text-destructive transition-colors text-xs disabled:opacity-50"
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        No tasks yet. Add one above.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
