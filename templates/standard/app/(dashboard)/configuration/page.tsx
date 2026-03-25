import { CheckCircle2, AlertCircle } from "lucide-react";
import { ConfigForm } from "./config-form";

const MIGRATION_SQL = `-- Tasks table with Supabase Auth RLS
-- Run this in your Supabase project: Dashboard → SQL Editor

create type task_status as enum ('todo', 'in_progress', 'done');

create table tasks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  description text,
  status      task_status not null default 'todo',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tasks_updated_at
  before update on tasks
  for each row execute function update_updated_at();

alter table tasks enable row level security;

create policy "Users can view their own tasks"
  on tasks for select
  using (user_id = auth.uid());

create policy "Users can insert their own tasks"
  on tasks for insert
  with check (user_id = auth.uid());

create policy "Users can update their own tasks"
  on tasks for update
  using (user_id = auth.uid());

create policy "Users can delete their own tasks"
  on tasks for delete
  using (user_id = auth.uid());

create index tasks_user_id_idx on tasks(user_id);
create index tasks_created_at_idx on tasks(created_at desc);`;

type ServiceStatus = { label: string; ok: boolean };

function StatusOverview({ services }: { services: ServiceStatus[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {services.map(({ label, ok }) => (
        <span
          key={label}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            ok
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
              : "bg-amber-500/15 text-amber-400 border-amber-500/20"
          }`}
        >
          {ok ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
          {label}
        </span>
      ))}
    </div>
  );
}

export default function ConfigurationPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  const services: ServiceStatus[] = [
    { label: "Supabase", ok: !!(supabaseUrl && supabaseAnonKey) },
  ];

  const allConfigured = services.every((s) => s.ok);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-10">
        <div className="max-w-3xl space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Configuration</h1>
            <p className="text-slate-400">
              Connect your Supabase project. Values are saved to{" "}
              <code className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 text-xs">
                .env.local
              </code>{" "}
              — restart the dev server after saving.
            </p>
          </div>
          <StatusOverview services={services} />
          {allConfigured && (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5 w-fit">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">
                Supabase connected — you&apos;re good to go!
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="px-8 py-8 max-w-3xl">
        <ConfigForm
          supabaseUrl={supabaseUrl}
          supabaseAnonKey={supabaseAnonKey}
          migrationSql={MIGRATION_SQL}
        />
      </div>
    </div>
  );
}
