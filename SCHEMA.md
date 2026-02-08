# Supabase Database Schema

Please run the following SQL in your Supabase SQL Editor to set up the necessary tables and storage buckets for the application.

```sql
-- Create a table for profiles (extends auth.users)
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table profiles enable row level security;

create policy "Users can view their own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a table for jobs (screenings)
create table jobs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  title text not null,
  description text not null,
  status text default 'processing' check (status in ('processing', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for jobs
alter table jobs enable row level security;

create policy "Users can view their own jobs" on jobs
  for select using (auth.uid() = user_id);

create policy "Users can insert their own jobs" on jobs
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own jobs" on jobs
  for update using (auth.uid() = user_id);

-- Create a table for candidates
create table candidates (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references jobs(id) on delete cascade not null,
  name text not null,
  email text,
  resume_url text,
  score integer default 0,
  status text default 'new' check (status in ('new', 'hire', 'maybe', 'reject')),
  summary text,
  strengths text[],
  concerns text[],
  experience text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for candidates
alter table candidates enable row level security;

create policy "Users can view candidates for their jobs" on candidates
  for select using (
    exists (
      select 1 from jobs
      where jobs.id = candidates.job_id
      and jobs.user_id = auth.uid()
    )
  );

create policy "Users can insert candidates for their jobs" on candidates
  for insert with check (
    exists (
      select 1 from jobs
      where jobs.id = candidates.job_id
      and jobs.user_id = auth.uid()
    )
  );

-- Create storage bucket for resumes
insert into storage.buckets (id, name, public) 
values ('resumes', 'resumes', false);

-- Policy to allow authenticated uploads to resumes bucket
create policy "Authenticated users can upload resumes"
  on storage.objects for insert
  with check (
    bucket_id = 'resumes' 
    and auth.role() = 'authenticated'
  );

create policy "Users can view their own resumes"
  on storage.objects for select
  using (
    bucket_id = 'resumes'
    and auth.uid() = owner
  );
```
