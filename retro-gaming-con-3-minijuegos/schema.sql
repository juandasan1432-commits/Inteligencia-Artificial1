-- RETRO GAMING · Esquema PostgreSQL para migrar a Supabase (fase 2 del proyecto)
-- Equivale 1 a 1 al modelo de datos de la versión publicada.

create extension if not exists "pgcrypto";

create type app_role as enum ('user', 'moderator', 'admin');
create type library_status as enum ('pendiente', 'jugando', 'completado');
create type report_kind as enum ('review', 'comment');

create table profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique check (username ~ '^[[:alnum:] ._-]{3,20}$'),
  avatar      text not null default '🎮',
  role        app_role not null default 'user',
  banned_at   timestamptz,
  created_at  timestamptz not null default now()
);

create table genres (
  id    serial primary key,
  name  text not null unique check (char_length(name) between 3 and 24)
);

create table games (
  id           text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name         text not null,
  description  text not null,
  genre_id     int not null references genres(id) on delete restrict,
  year         smallint not null check (year between 1994 and 2006),
  developer    text not null,
  publisher    text not null,
  languages    text[] not null default '{}',
  cover_path   text,
  colors       text[] not null default array['#7928CA','#287BFF'],
  featured     boolean not null default false,
  essential    boolean not null default false,
  added_at     timestamptz not null default now()
);
create index games_genre_idx on games(genre_id);
create index games_year_idx on games(year);

create table screenshots (
  id        uuid primary key default gen_random_uuid(),
  game_id   text not null references games(id) on delete cascade,
  path      text not null,
  position  smallint not null default 0
);

create table favorites (
  user_id    uuid references profiles(id) on delete cascade,
  game_id    text references games(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create table reviews (
  user_id    uuid references profiles(id) on delete cascade,
  game_id    text references games(id) on delete cascade,
  rating     smallint not null check (rating between 1 and 5),
  body       text not null default '' check (char_length(body) <= 1000),
  updated_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create table comments (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(id) on delete cascade,
  game_id    text not null references games(id) on delete cascade,
  parent_id  uuid references comments(id) on delete cascade,
  body       text not null check (char_length(body) between 1 and 500),
  created_at timestamptz not null default now()
);
create index comments_game_idx on comments(game_id, created_at desc);

create table library (
  user_id  uuid references profiles(id) on delete cascade,
  game_id  text references games(id) on delete cascade,
  status   library_status not null,
  primary key (user_id, game_id)
);

create table history (
  id        bigserial primary key,
  user_id   uuid not null references profiles(id) on delete cascade,
  game_id   text not null references games(id) on delete cascade,
  viewed_at timestamptz not null default now()
);

create table save_states (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(id) on delete cascade,
  game_id    text references games(id) on delete set null,
  slot       smallint not null check (slot between 0 and 9),
  path       text not null,
  created_at timestamptz not null default now(),
  unique (user_id, game_id, slot)
);

create table reports (
  id          uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references profiles(id) on delete cascade,
  kind        report_kind not null,
  target_id   text not null,
  reason      text not null,
  created_at  timestamptz not null default now(),
  resolved_at timestamptz
);

create table ads (
  id        uuid primary key default gen_random_uuid(),
  title     text not null,
  body      text,
  url       text not null check (url like 'https://%'),
  cta       text not null default 'Ver más',
  active    boolean not null default true,
  created_at timestamptz not null default now()
);

-- Vista de popularidad (misma fórmula que la versión publicada)
create view game_stats as
select g.id,
       avg(r.rating)::numeric(3,2) as avg_rating,
       count(distinct r.user_id) as reviews,
       count(distinct f.user_id) as favorites,
       count(distinct c.id) as comments,
       count(distinct f.user_id) * 3 + count(distinct r.user_id) * 2 + count(distinct c.id) as popularity
from games g
left join reviews r on r.game_id = g.id
left join favorites f on f.game_id = g.id
left join comments c on c.game_id = g.id
group by g.id;

-- Helpers de rol
create or replace function is_admin() returns boolean language sql stable security definer as $$
  select exists (select 1 from profiles where id = auth.uid() and role in ('admin','moderator'));
$$;
create or replace function is_active() returns boolean language sql stable security definer as $$
  select exists (select 1 from profiles where id = auth.uid() and banned_at is null);
$$;

-- Row Level Security
alter table profiles    enable row level security;
alter table genres      enable row level security;
alter table games       enable row level security;
alter table screenshots enable row level security;
alter table favorites   enable row level security;
alter table reviews     enable row level security;
alter table comments    enable row level security;
alter table library     enable row level security;
alter table history     enable row level security;
alter table save_states enable row level security;
alter table reports     enable row level security;
alter table ads         enable row level security;

create policy "lectura pública" on genres      for select using (true);
create policy "lectura pública" on games       for select using (true);
create policy "lectura pública" on screenshots for select using (true);
create policy "lectura pública" on profiles    for select using (true);
create policy "lectura pública" on favorites   for select using (true);
create policy "lectura pública" on reviews     for select using (true);
create policy "lectura pública" on comments    for select using (true);
create policy "anuncios activos" on ads        for select using (active or is_admin());

create policy "admin gestiona" on genres      for all using (is_admin()) with check (is_admin());
create policy "admin gestiona" on games       for all using (is_admin()) with check (is_admin());
create policy "admin gestiona" on screenshots for all using (is_admin()) with check (is_admin());
create policy "admin gestiona" on ads         for all using (is_admin()) with check (is_admin());

create policy "crear perfil propio" on profiles for insert with check (id = auth.uid() and role = 'user');
create policy "perfil propio" on profiles for update using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from profiles where id = auth.uid()));
create policy "admin modera perfiles" on profiles for update using (is_admin());

create policy "favoritos propios" on favorites for all using (user_id = auth.uid()) with check (user_id = auth.uid() and is_active());
create policy "reseñas propias"   on reviews   for all using (user_id = auth.uid()) with check (user_id = auth.uid() and is_active());
create policy "comentarios propios" on comments for insert with check (user_id = auth.uid() and is_active());
create policy "borrar comentario" on comments  for delete using (user_id = auth.uid() or is_admin());
create policy "admin borra reseñas" on reviews for delete using (is_admin());

create policy "biblioteca privada" on library     for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "historial privado"  on history     for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "partidas privadas"  on save_states for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "crear reporte" on reports for insert with check (reporter_id = auth.uid());
create policy "admin ve reportes" on reports for select using (is_admin());
create policy "admin resuelve" on reports for update using (is_admin());
