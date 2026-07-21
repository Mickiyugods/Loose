-- Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor)

create table if not exists agents (
  id text primary key,
  wallet_address text not null,
  name text not null,
  strategy text not null,
  strategy_name text not null,
  budget text not null,
  risk_level text not null,
  stop_loss text default '10',
  take_profit text default '50',
  auto_restart boolean default true,
  target_address text,
  token_pair text,
  preferred_pool text,
  custom_description text,
  status text default 'running',
  pnl real default 0,
  trades integer default 0,
  created_at bigint not null
);

create table if not exists agent_logs (
  id bigserial primary key,
  agent_id text references agents(id) on delete cascade,
  action text not null,
  confidence integer,
  reason text,
  created_at timestamp with time zone default now()
);

alter table agents enable row level security;
alter table agent_logs enable row level security;

create policy "Users can read own agents" on agents
  for select using (wallet_address = current_setting('request.jwt.claims')::json->>'sub');

create policy "Users can insert own agents" on agents
  for insert with check (true);

create policy "Users can update own agents" on agents
  for update using (true);

create policy "Users can delete own agents" on agents
  for delete using (true);

create policy "Users can read own logs" on agent_logs
  for select using (true);

create policy "Users can insert logs" on agent_logs
  for insert with check (true);
