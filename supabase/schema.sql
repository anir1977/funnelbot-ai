-- =============================================================
-- FunnelsLibrary — Database Schema
-- Moroccan WhatsApp e-commerce automation platform
-- =============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- =============================================================
-- profiles
-- One row per authenticated user (mirrors auth.users).
-- Created automatically via trigger on auth.users insert.
-- =============================================================
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  email       text unique not null,
  avatar_url  text,
  plan        text not null default 'trial' check (plan in ('trial','starter','pro','agency')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table profiles is 'Extended user data mirroring auth.users. Created by trigger on signup.';

create index if not exists profiles_email_idx on profiles(email);

-- =============================================================
-- stores
-- Each user can own one or more WhatsApp stores.
-- =============================================================
create table if not exists stores (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references profiles(id) on delete cascade,
  name            text not null,
  business_type   text not null check (business_type in ('parfum','clothes','supplements','food','general')),
  city            text not null,
  whatsapp_number text not null,           -- E.164 without +, e.g. "212661234567"
  bot_tone        text not null default 'friendly' check (bot_tone in ('friendly','pro','funny','brief')),
  welcome_message text,
  active          boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table stores is 'WhatsApp stores owned by a user. One user may run multiple stores.';

create index if not exists stores_user_id_idx on stores(user_id);
create index if not exists stores_whatsapp_number_idx on stores(whatsapp_number);

-- =============================================================
-- products
-- Items the bot can sell, linked to a store.
-- =============================================================
create table if not exists products (
  id           uuid primary key default gen_random_uuid(),
  store_id     uuid not null references stores(id) on delete cascade,
  name         text not null,
  description  text,
  price        numeric(10,2) not null check (price >= 0),
  stock        integer not null default 0 check (stock >= 0),
  category     text,
  sizes        text[],                     -- e.g. {'S','M','L','XL'}
  colors       text[],                     -- e.g. {'أحمر','أسود'}
  image_url    text,
  active       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table products is 'Products available for sale through the WhatsApp bot.';

create index if not exists products_store_id_idx on products(store_id);
create index if not exists products_active_idx   on products(store_id, active);

-- =============================================================
-- delivery_zones
-- Per-store delivery pricing and timing by city.
-- =============================================================
create table if not exists delivery_zones (
  id           uuid primary key default gen_random_uuid(),
  store_id     uuid not null references stores(id) on delete cascade,
  city         text not null,
  price        numeric(8,2) not null check (price >= 0),
  delivery_time text not null,             -- e.g. "24 ساعة", "48–72 ساعة"
  cod_enabled  boolean not null default true,
  active       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (store_id, city)
);

comment on table delivery_zones is 'Delivery price and time per city per store. Drives COD bot replies.';

create index if not exists delivery_zones_store_id_idx on delivery_zones(store_id);

-- =============================================================
-- faqs
-- Frequently asked questions the bot answers automatically.
-- =============================================================
create table if not exists faqs (
  id           uuid primary key default gen_random_uuid(),
  store_id     uuid not null references stores(id) on delete cascade,
  question     text not null,
  answer       text not null,
  category     text,
  hit_count    integer not null default 0, -- incremented each time bot uses this answer
  active       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table faqs is 'Q&A pairs used by the bot for automatic replies. hit_count tracks usage.';

create index if not exists faqs_store_id_idx on faqs(store_id);
create index if not exists faqs_active_idx   on faqs(store_id, active);

-- =============================================================
-- orders
-- Orders captured by the bot via WhatsApp conversation.
-- =============================================================
create table if not exists orders (
  id               uuid primary key default gen_random_uuid(),
  store_id         uuid not null references stores(id) on delete cascade,
  product_id       uuid references products(id) on delete set null,
  customer_name    text not null,
  customer_phone   text not null,
  customer_city    text not null,
  product_snapshot jsonb not null,          -- name, price, variant at time of order
  quantity         integer not null default 1 check (quantity > 0),
  unit_price       numeric(10,2) not null,
  delivery_fee     numeric(8,2) not null default 0,
  total            numeric(10,2) generated always as (quantity * unit_price + delivery_fee) stored,
  status           text not null default 'new' check (status in ('new','confirmed','shipped','cancelled')),
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table orders is 'COD orders placed through the WhatsApp bot. product_snapshot preserves price at order time.';

create index if not exists orders_store_id_idx  on orders(store_id);
create index if not exists orders_status_idx    on orders(store_id, status);
create index if not exists orders_customer_phone_idx on orders(customer_phone);
create index if not exists orders_created_at_idx on orders(created_at desc);

-- =============================================================
-- conversations
-- One row per WhatsApp chat thread between a customer and a store.
-- =============================================================
create table if not exists conversations (
  id              uuid primary key default gen_random_uuid(),
  store_id        uuid not null references stores(id) on delete cascade,
  customer_phone  text not null,
  customer_name   text,
  last_message_at timestamptz,
  unread_count    integer not null default 0,
  status          text not null default 'open' check (status in ('open','resolved')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (store_id, customer_phone)
);

comment on table conversations is 'WhatsApp conversation threads. One per (store, customer_phone) pair.';

create index if not exists conversations_store_id_idx      on conversations(store_id);
create index if not exists conversations_last_message_idx  on conversations(store_id, last_message_at desc);

-- =============================================================
-- messages
-- Individual WhatsApp messages within a conversation.
-- =============================================================
create table if not exists messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role            text not null check (role in ('user','bot','agent')),
  body            text not null,
  read            boolean not null default false,
  created_at      timestamptz not null default now()
);

comment on table messages is 'Individual messages in a conversation. role: user=customer, bot=AI, agent=human operator.';

create index if not exists messages_conversation_id_idx on messages(conversation_id);
create index if not exists messages_created_at_idx      on messages(conversation_id, created_at asc);

-- =============================================================
-- updated_at trigger (reusable)
-- =============================================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Attach trigger to every table that has updated_at
do $$
declare
  t text;
begin
  foreach t in array array[
    'profiles','stores','products','delivery_zones','faqs','orders','conversations'
  ] loop
    execute format(
      'create or replace trigger trg_%s_updated_at
       before update on %s
       for each row execute function set_updated_at()',
      t, t
    );
  end loop;
end;
$$;

-- =============================================================
-- auto-create profile on signup trigger
-- =============================================================
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

create or replace trigger trg_auth_users_new_profile
  after insert on auth.users
  for each row execute function handle_new_user();

-- =============================================================
-- Row-level security
-- =============================================================
alter table profiles       enable row level security;
alter table stores         enable row level security;
alter table products       enable row level security;
alter table delivery_zones enable row level security;
alter table faqs           enable row level security;
alter table orders         enable row level security;
alter table conversations  enable row level security;
alter table messages       enable row level security;

-- profiles: users can only read/update their own row
create policy "profiles: own row" on profiles
  for all using (auth.uid() = id);

-- stores: scoped to owner
create policy "stores: owner" on stores
  for all using (auth.uid() = user_id);

-- products, delivery_zones, faqs: scoped via store ownership
create policy "products: store owner" on products
  for all using (
    exists (select 1 from stores where stores.id = products.store_id and stores.user_id = auth.uid())
  );

create policy "delivery_zones: store owner" on delivery_zones
  for all using (
    exists (select 1 from stores where stores.id = delivery_zones.store_id and stores.user_id = auth.uid())
  );

create policy "faqs: store owner" on faqs
  for all using (
    exists (select 1 from stores where stores.id = faqs.store_id and stores.user_id = auth.uid())
  );

-- orders: scoped via store ownership
create policy "orders: store owner" on orders
  for all using (
    exists (select 1 from stores where stores.id = orders.store_id and stores.user_id = auth.uid())
  );

-- conversations: scoped via store ownership
create policy "conversations: store owner" on conversations
  for all using (
    exists (select 1 from stores where stores.id = conversations.store_id and stores.user_id = auth.uid())
  );

-- messages: scoped via conversation → store ownership
create policy "messages: store owner" on messages
  for all using (
    exists (
      select 1 from conversations c
      join stores s on s.id = c.store_id
      where c.id = messages.conversation_id and s.user_id = auth.uid()
    )
  );
