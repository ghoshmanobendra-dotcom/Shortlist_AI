-- Add terms_accepted column to profiles table
alter table profiles 
add column if not exists terms_accepted boolean default false;

-- Add a policy to allow users to update their own terms_accepted status
-- (This might be covered by existing "Users can update own profile" policy, but let's verify)
-- Existing policy in SCHEMA.md:
-- create policy "Users can update their own profile" on profiles
--   for update using (auth.uid() = id);
-- This should range over all columns, so it should be fine.

-- If we want to be explicit or if RLS is strict about columns:
-- Grant update on terms_accepted? (Postgres doesn't need column specific grant for owner usuallly with the above policy)

-- Just the column addition should be enough if the existing RLS covers updates.
