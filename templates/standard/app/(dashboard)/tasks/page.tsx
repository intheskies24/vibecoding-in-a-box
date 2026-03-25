import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { TaskList } from "@/components/task-list";
import { TaskForm } from "@/components/task-form";
import type { Task } from "@/lib/types";

export default async function TasksPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-10">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold text-white mb-1">Tasks</h1>
          <p className="text-slate-400">Manage your tasks.</p>
        </div>
      </div>
      <div className="px-8 py-8 max-w-3xl space-y-6">
        <TaskForm />
        <TaskList tasks={(tasks as Task[]) ?? []} />
      </div>
    </div>
  );
}
