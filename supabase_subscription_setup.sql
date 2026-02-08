
-- Enable RLS
alter table profiles enable row level security;

-- Add subscription columns if they don't exist
alter table profiles 
add column if not exists subscription_tier text default 'free',
add column if not exists trials_remaining int default 10;

-- Policy to allow users to view their own profile
create policy "Users can view own profile"
on profiles for select
using ( auth.uid() = id );

-- Policy to allow users to update their own profile (for decrementing trials)
create policy "Users can update own profile"
on profiles for update
using ( auth.uid() = id );
