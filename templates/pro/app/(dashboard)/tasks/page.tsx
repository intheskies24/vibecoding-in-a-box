import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase/server";
import { TaskList } from "@/components/task-list";
import { TaskForm } from "@/components/task-form";
import type { Task } from "@/lib/types";

export default async function TasksPage() {
  const { userId } = await auth();
  const supabase = await createServerClient();

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground">Manage your tasks.</p>
      </div>

      <TaskForm />

      <TaskList tasks={(tasks as Task[]) ?? []} />
    </div>
  );
}
