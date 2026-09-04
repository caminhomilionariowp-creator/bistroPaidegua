-- ============================================================
--  Bistrô Pai d'Égua — esquema do backend (Supabase / Postgres)
--  Rode isto no SQL Editor do projeto Supabase, uma vez.
-- ============================================================

-- Tabela chave->valor: espelha o que antes ficava no localStorage.
create table if not exists public.estado_app (
  chave        text primary key,
  valor        jsonb not null,
  atualizado_em timestamptz not null default now()
);

alter table public.estado_app enable row level security;

-- Ferramenta interna do restaurante: qualquer cliente (anon) do app
-- pode ler e gravar. O acesso já é limitado por quem tem o link + o PIN.
drop policy if exists "app le e grava" on public.estado_app;
create policy "app le e grava"
  on public.estado_app
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- Realtime: publica mudanças da tabela para o app sincronizar entre aparelhos.
alter publication supabase_realtime add table public.estado_app;

-- ------------------------------------------------------------
--  Storage: fotos reais dos pratos / auditoria
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do nothing;

drop policy if exists "fotos leitura publica" on storage.objects;
create policy "fotos leitura publica"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'fotos');

drop policy if exists "fotos upload do app" on storage.objects;
create policy "fotos upload do app"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'fotos');

drop policy if exists "fotos update do app" on storage.objects;
create policy "fotos update do app"
  on storage.objects for update
  to anon, authenticated
  using (bucket_id = 'fotos');

drop policy if exists "fotos delete do app" on storage.objects;
create policy "fotos delete do app"
  on storage.objects for delete
  to anon, authenticated
  using (bucket_id = 'fotos');
