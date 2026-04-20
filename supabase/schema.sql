-- ============================================================================
-- wego — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor → New query → paste → Run.
-- Idempotent: drops existing wego objects first, so it is safe to re-run.
-- ============================================================================

-- 0. Clean slate -------------------------------------------------------------
drop table if exists public.messages cascade;
drop table if exists public.thread_participants cascade;
drop table if exists public.threads cascade;
drop table if exists public.applications cascade;
drop table if exists public.family_profiles cascade;
drop table if exists public.student_profiles cascade;
drop table if exists public.schools cascade;
drop table if exists public.profiles cascade;

drop type if exists public.user_role;
drop type if exists public.active_view;
drop type if exists public.application_status;
drop type if exists public.home_type;

-- 1. Enums -------------------------------------------------------------------
create type public.user_role as enum ('student', 'family', 'both');
create type public.active_view as enum ('student', 'family');
create type public.application_status as enum (
  'draft', 'submitted', 'under_review', 'accepted', 'rejected', 'cancelled'
);
create type public.home_type as enum ('apartment', 'house');

-- 2. profiles  (1:1 with auth.users) -----------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null,
  active_view public.active_view not null default 'student',
  first_name text not null,
  last_name text not null,
  email text not null,
  id_document_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. schools (public catalog, seeded from mock) ------------------------------
create table public.schools (
  id text primary key,
  name text not null,
  city text not null,
  country text not null,
  language text not null,
  orientation text not null,
  image_url text not null,
  gallery jsonb not null default '[]'::jsonb,
  mobility_months int[] not null default '{}'::int[],
  price_per_month int not null,
  spots_left int not null,
  description text not null,
  highlights jsonb not null default '[]'::jsonb,
  testimonials jsonb not null default '[]'::jsonb,
  coordinator jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 4. student_profiles --------------------------------------------------------
create table public.student_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  birthday date,
  city text,
  languages jsonb not null default '[]'::jsonb,       -- ["en","fr","es",...]
  lifestyle jsonb not null default '{}'::jsonb,       -- {diet:"vegetarian",smoker:false,...}
  hobbies text[] not null default '{}'::text[],
  bio text,
  photo_url text,
  gallery jsonb not null default '[]'::jsonb,
  video_url text,
  mobility_duration_months int,
  updated_at timestamptz not null default now()
);

-- 5. family_profiles ---------------------------------------------------------
create table public.family_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  family_name text,
  city text,
  country text default 'Italy',
  home_type public.home_type,
  spare_rooms int,
  has_pets boolean,
  bio text,
  photo_url text,
  members text[] not null default '{}'::text[],
  nationality text default 'it',
  updated_at timestamptz not null default now()
);

-- 6. applications ------------------------------------------------------------
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  school_id text not null references public.schools(id) on delete cascade,
  status public.application_status not null default 'submitted',
  mobility_duration_months int not null,
  report_card_url text,
  motivation text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index applications_student_idx on public.applications(student_id);
create index applications_school_idx on public.applications(school_id);

-- 7. chat: threads + participants + messages ---------------------------------
create table public.threads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create table public.thread_participants (
  thread_id uuid not null references public.threads(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  primary key (thread_id, user_id)
);

create index thread_participants_user_idx on public.thread_participants(user_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now()
);

create index messages_thread_idx on public.messages(thread_id, created_at);

-- 8. updated_at triggers -----------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();
create trigger student_profiles_touch before update on public.student_profiles
  for each row execute function public.touch_updated_at();
create trigger family_profiles_touch before update on public.family_profiles
  for each row execute function public.touch_updated_at();
create trigger applications_touch before update on public.applications
  for each row execute function public.touch_updated_at();

-- 9. Row Level Security ------------------------------------------------------
alter table public.profiles           enable row level security;
alter table public.student_profiles   enable row level security;
alter table public.family_profiles    enable row level security;
alter table public.schools            enable row level security;
alter table public.applications       enable row level security;
alter table public.threads            enable row level security;
alter table public.thread_participants enable row level security;
alter table public.messages           enable row level security;

-- profiles: anyone logged in can read; user can only write own row
create policy "profiles_read_authenticated" on public.profiles
  for select to authenticated using (true);
create policy "profiles_insert_self" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_self" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- student_profiles: read-all, write-self
create policy "student_profiles_read_authenticated" on public.student_profiles
  for select to authenticated using (true);
create policy "student_profiles_insert_self" on public.student_profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "student_profiles_update_self" on public.student_profiles
  for update to authenticated using (auth.uid() = id);

-- family_profiles: read-all, write-self
create policy "family_profiles_read_authenticated" on public.family_profiles
  for select to authenticated using (true);
create policy "family_profiles_insert_self" on public.family_profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "family_profiles_update_self" on public.family_profiles
  for update to authenticated using (auth.uid() = id);

-- schools: public read-only for all authenticated users
create policy "schools_read_authenticated" on public.schools
  for select to authenticated using (true);

-- applications: student sees own; school side (demo) — allow all authenticated read
create policy "applications_read_authenticated" on public.applications
  for select to authenticated using (true);
create policy "applications_insert_self" on public.applications
  for insert to authenticated with check (auth.uid() = student_id);
create policy "applications_update_self" on public.applications
  for update to authenticated using (auth.uid() = student_id);

-- threads / participants / messages:
-- A user can read a thread if they participate in it.
create policy "thread_participants_read_self" on public.thread_participants
  for select to authenticated using (auth.uid() = user_id);
create policy "thread_participants_insert_self" on public.thread_participants
  for insert to authenticated with check (auth.uid() = user_id);

create policy "threads_read_participant" on public.threads
  for select to authenticated using (
    exists (
      select 1 from public.thread_participants tp
      where tp.thread_id = threads.id and tp.user_id = auth.uid()
    )
  );
create policy "threads_insert_authenticated" on public.threads
  for insert to authenticated with check (true);

create policy "messages_read_participant" on public.messages
  for select to authenticated using (
    exists (
      select 1 from public.thread_participants tp
      where tp.thread_id = messages.thread_id and tp.user_id = auth.uid()
    )
  );
create policy "messages_insert_participant" on public.messages
  for insert to authenticated with check (
    auth.uid() = sender_id and exists (
      select 1 from public.thread_participants tp
      where tp.thread_id = messages.thread_id and tp.user_id = auth.uid()
    )
  );

-- 10. Realtime publication (for chat) ---------------------------------------
-- Supabase Realtime uses the supabase_realtime publication; include messages.
alter publication supabase_realtime add table public.messages;

-- ============================================================================
-- Done. Next: run seed.sql to populate the schools catalog.
-- ============================================================================
