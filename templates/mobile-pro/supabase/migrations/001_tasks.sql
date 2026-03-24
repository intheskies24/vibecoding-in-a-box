-- Tasks table for mobile template
-- Run this in your Supabase project: https://supabase.com/dashboard/project/_/sql

create type task_status as enum ('todo', 'in_progress', 'done');

create table tasks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  title       text not null,
  description text,
  status      task_status not null default 'todo',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at
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

-- Row Level Security: each user sees only their own tasks
alter table tasks enable row level security;

create policy "Users can view their own tasks"
  on tasks for select using (auth.uid() = user_id);

create policy "Users can insert their own tasks"
  on tasks for insert with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
  on tasks for update using (auth.uid() = user_id);

create policy "Users can delete their own tasks"
  on tasks for delete using (auth.uid() = user_id);

create index tasks_user_id_idx on tasks(user_id);
create index tasks_created_at_idx on tasks(created_at desc);
