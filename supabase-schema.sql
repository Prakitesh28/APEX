-- Supabase Schema for APEX Protocol

CREATE TABLE users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  gender text,
  age integer,
  height_cm float,
  weight_kg float,
  activity_level text,
  goal text,
  created_at timestamptz default now()
);

CREATE TABLE workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  name text,
  type text,
  notes text,
  date timestamptz default now()
);

CREATE TABLE exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid references workouts(id) on delete cascade,
  name text,
  sets integer,
  reps integer,
  weight_kg float
);
