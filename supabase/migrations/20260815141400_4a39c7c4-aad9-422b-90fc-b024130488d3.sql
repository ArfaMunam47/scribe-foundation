-- ENUM ROLES
create type public.app_role as enum ('admin','user');

-- PROFILES
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

-- USER ROLES
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "profiles_select_own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles_select_admin" on public.profiles for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "profiles_update_own" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (auth.uid() = id);

create policy "user_roles_select_own" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "user_roles_select_admin" on public.user_roles for select to authenticated using (public.has_role(auth.uid(),'admin'));

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

-- new user handler: first user becomes admin
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare admin_exists boolean;
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)), new.raw_user_meta_data->>'avatar_url');

  select exists (select 1 from public.user_roles where role = 'admin') into admin_exists;
  insert into public.user_roles (user_id, role)
  values (new.id, case when admin_exists then 'user'::public.app_role else 'admin'::public.app_role end);
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- CATEGORIES
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);
grant select on public.categories to anon, authenticated;
grant insert, update, delete on public.categories to authenticated;
grant all on public.categories to service_role;
alter table public.categories enable row level security;
create policy "categories_public_read" on public.categories for select using (true);
create policy "categories_admin_write" on public.categories for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- AUTHORS
create table public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  role_title text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now()
);
grant select on public.authors to anon, authenticated;
grant insert, update, delete on public.authors to authenticated;
grant all on public.authors to service_role;
alter table public.authors enable row level security;
create policy "authors_public_read" on public.authors for select using (true);
create policy "authors_admin_write" on public.authors for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- POSTS
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  cover_image text,
  author_id uuid references public.authors(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  status text not null default 'draft',
  featured boolean not null default false,
  reading_time integer not null default 5,
  view_count integer not null default 0,
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_status_check check (status in ('draft','published'))
);
create index posts_status_published_idx on public.posts (status, published_at desc);
create index posts_category_idx on public.posts (category_id);
grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;
grant all on public.posts to service_role;
alter table public.posts enable row level security;
create policy "posts_public_read_published" on public.posts for select using (status = 'published');
create policy "posts_admin_read_all" on public.posts for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "posts_admin_write" on public.posts for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger posts_updated_at before update on public.posts
for each row execute function public.set_updated_at();

-- TAGS
create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);
grant select on public.tags to anon, authenticated;
grant insert, update, delete on public.tags to authenticated;
grant all on public.tags to service_role;
alter table public.tags enable row level security;
create policy "tags_public_read" on public.tags for select using (true);
create policy "tags_admin_write" on public.tags for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.post_tags (
  post_id uuid not null references public.posts(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (post_id, tag_id)
);
grant select on public.post_tags to anon, authenticated;
grant insert, update, delete on public.post_tags to authenticated;
grant all on public.post_tags to service_role;
alter table public.post_tags enable row level security;
create policy "post_tags_public_read" on public.post_tags for select using (true);
create policy "post_tags_admin_write" on public.post_tags for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- BOOKMARKS
create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  post_id uuid not null references public.posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, post_id)
);
grant select, insert, delete on public.bookmarks to authenticated;
grant all on public.bookmarks to service_role;
alter table public.bookmarks enable row level security;
create policy "bookmarks_own" on public.bookmarks for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- CONTACT MESSAGES
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);
grant insert on public.contact_messages to anon, authenticated;
grant select, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "contact_insert_anyone" on public.contact_messages for insert to anon, authenticated with check (true);
create policy "contact_admin_read" on public.contact_messages for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "contact_admin_delete" on public.contact_messages for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- NEWSLETTER
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);
grant insert on public.newsletter_subscribers to anon, authenticated;
grant select, delete on public.newsletter_subscribers to authenticated;
grant all on public.newsletter_subscribers to service_role;
alter table public.newsletter_subscribers enable row level security;
create policy "newsletter_insert_anyone" on public.newsletter_subscribers for insert to anon, authenticated with check (true);
create policy "newsletter_admin_read" on public.newsletter_subscribers for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "newsletter_admin_delete" on public.newsletter_subscribers for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- SEED CATEGORIES
insert into public.categories (name, slug, description) values
('Technology','technology','Hardware, software and the systems shaping how we work.'),
('Artificial Intelligence','artificial-intelligence','Research, products and consequences of machine intelligence.'),
('Business','business','Markets, strategy and the mechanics of modern companies.'),
('Design','design','Craft, typography, interfaces and visual culture.'),
('Development','development','Engineering practice, architecture and tooling.'),
('Productivity','productivity','Attention, systems and doing meaningful work.'),
('Startups','startups','Founding, funding and the early-stage reality.');

-- SEED TAGS
insert into public.tags (name, slug) values
('Essay','essay'),('Interview','interview'),('Research','research'),
('Opinion','opinion'),('Guide','guide'),('Longform','longform');

-- SEED AUTHORS
insert into public.authors (name, slug, role_title, bio, avatar_url) values
('Elena Marsh','elena-marsh','Editor-in-Chief','Elena has spent fifteen years covering the intersection of technology and culture, previously at two national dailies.', null),
('Julian Reyes','julian-reyes','Senior Correspondent','Julian writes about machine intelligence and the institutions trying to govern it.', null),
('Amara Okafor','amara-okafor','Design Editor','Amara covers craft, typography and the discipline of interface design.', null),
('Theo Lindqvist','theo-lindqvist','Business Editor','Theo reports on capital, strategy and the long arc of company building.', null);

-- SEED POSTS
insert into public.posts (title, slug, excerpt, cover_image, author_id, category_id, status, featured, reading_time, view_count, published_at, content)
select v.title, v.slug, v.excerpt, v.cover, a.id, c.id, 'published', v.featured, v.reading_time, v.views, now() - (v.days || ' days')::interval, v.content
from (values
('The Quiet Discipline of Building Slowly','the-quiet-discipline-of-building-slowly',
 'Speed is the default metric of modern software. A generation of builders is quietly arguing for something else entirely.',
 '/images/hero-editorial.jpg','elena-marsh','productivity',true,9,4820,1,
 E'## The cost of velocity\n\nFor a decade, the industry measured itself in deploys per day. Velocity became a moral position: to move slowly was to be irrelevant. But the artefacts of that decade — the abandoned platforms, the half-migrated systems, the interfaces nobody defends — suggest the metric was incomplete.\n\n> Speed tells you how fast you are travelling. It says nothing about whether you have chosen a destination worth reaching.\n\n### What slowness actually buys\n\nSlowness is not idleness. In practice it buys three things that speed cannot:\n\n- **Coherence.** Decisions made a quarter apart tend to agree with each other.\n- **Reversibility.** Fewer commitments made under pressure means fewer that must be unwound.\n- **Institutional memory.** Teams that are not sprinting have time to write down why.\n\n## A different scoreboard\n\nThe teams we spoke to over four months share an unfashionable habit: they measure the half-life of their decisions. How long does a choice survive before it must be revisited? A codebase where the answer is measured in years feels, from the inside, remarkably calm.\n\n### The practice\n\nIt begins with a written argument. Not a ticket, not a diagram — a paragraph that a colleague could disagree with. The document is the unit of work; the code is the consequence.\n\nNone of this is anti-speed. It is a claim about where speed should be spent: on the execution of decisions, not on the making of them.'),

('Machine Intelligence Has an Institutional Problem','machine-intelligence-institutional-problem',
 'The hardest questions in AI are no longer technical. They are questions about who decides, and on what authority.',
 '/images/cover-ai.jpg','julian-reyes','artificial-intelligence',true,12,7310,3,
 E'## The capability gap has closed\n\nThe interesting constraint on machine intelligence is no longer the model. It is the absence of institutions capable of making decisions about the model at the speed the model changes.\n\n### Three failures of process\n\n1. **Authority is unclear.** Nobody can say who signed off.\n2. **Evidence is unstandardised.** Every lab publishes a different evaluation.\n3. **Consequences are diffuse.** Harm is real but attribution is expensive.\n\n> A system that cannot explain who decided cannot be corrected. It can only be replaced.\n\n## What good governance looks like from the inside\n\nIn the four organisations we visited, the pattern was consistent: small standing committees with named members, published minutes, and the authority to stop a launch. Unglamorous, and effective.\n\n### The uncomfortable conclusion\n\nMost of the work required to make machine intelligence trustworthy is administrative. It looks like paperwork. It is, in fact, the entire project.'),

('The Return of the Editorial Grid','the-return-of-the-editorial-grid',
 'After a decade of infinite scroll, designers are rediscovering the constraints of the printed page — and the clarity they impose.',
 '/images/cover-design.jpg','amara-okafor','design',true,7,3960,5,
 E'## Constraint as a feature\n\nThe printed page had one advantage the browser has spent twenty years trying to escape: it ended. Its edges forced hierarchy, and hierarchy is the mechanism by which a reader knows what matters.\n\n### Reading the classics again\n\nSwiss grid systems were never about aesthetics. They were an argument that composition is a form of reasoning — that where a thing sits on the page is a claim about its importance.\n\n- A single dominant image establishes subject.\n- A measured column establishes pace.\n- Generous margins establish confidence.\n\n> Whitespace is not empty. It is the sound of an editor deciding something was not necessary.\n\n## Applying it on screen\n\nThe practical translation is narrow: cap the measure near 70 characters, commit to one typographic voice per level, and resist the urge to fill the viewport simply because it exists.'),

('What Founders Get Wrong About Their First Ten Hires','founders-first-ten-hires',
 'The first ten people do not just do the work. They set the constitution of the company, whether anyone writes it down or not.',
 '/images/cover-business.jpg','theo-lindqvist','startups',false,10,2870,8,
 E'## Hiring is constitutional\n\nEvery early hire is a precedent. The first person who ships without review establishes that reviews are optional. The first person promoted for heroics establishes that heroics are the path.\n\n### The three questions\n\n1. What behaviour does this hire make normal?\n2. What behaviour does it make expensive?\n3. Who will imitate them in eighteen months?\n\n> You are not filling a role. You are casting a culture that will outlive your involvement in it.\n\n## The mechanics\n\nWrite the scorecard before the conversation. Interview against evidence rather than impression. And treat the reference call as the primary source it actually is.'),

('The Interface Is the Product','the-interface-is-the-product',
 'When capability becomes commodity, the surface where a person meets the system carries almost all of the remaining value.',
 '/images/cover-design.jpg','amara-okafor','technology',false,8,3140,11,
 E'## Commodity underneath, craft on top\n\nInfrastructure has been commoditised so thoroughly that two competitors are often running the same primitives. What differs is the surface, and the surface is not decoration.\n\n### Where value actually accrues\n\n- Latency the user can feel\n- Defaults that make the right thing easy\n- Error states written by someone who cared\n\n> The interface is where your product makes its argument. Everything else is a supporting document.\n\n## The discipline of defaults\n\nA default is a decision made on the user\'\'s behalf. Teams that treat defaults as a design surface rather than a configuration detail consistently produce software that feels lighter.'),

('Engineering for the Team That Comes After You','engineering-for-the-team-after-you',
 'Architecture is a message to strangers. Most systems fail not at runtime but at the point of handover.',
 '/images/cover-business.jpg','julian-reyes','development',false,11,2440,15,
 E'## Handover as a design constraint\n\nMost systems are written for the people who already understand them. That is why they collapse the moment those people leave.\n\n### Signals of a legible system\n\n1. A new engineer can trace a request end to end in an afternoon.\n2. The directory structure describes the domain, not the framework.\n3. Every non-obvious decision has a paragraph attached.\n\n> If your architecture requires a guided tour, the architecture is incomplete.\n\n## Practical moves\n\nPrefer boring interfaces at boundaries. Keep the number of ways to do a thing at one. And write the decision record on the day of the decision, not the week after.'),

('Attention Is the Only Scarce Resource Left','attention-is-the-only-scarce-resource',
 'Capital is abundant, tooling is free, and talent is global. What remains genuinely scarce is sustained attention.',
 '/images/hero-editorial.jpg','elena-marsh','productivity',false,6,5210,19,
 E'## The inventory nobody tracks\n\nOrganisations account for money to the cent and for attention not at all. Yet attention is the input that determines whether anything of quality is produced.\n\n### Three leaks\n\n- Meetings that exist to distribute information\n- Notifications that arrive without a decision attached\n- Reorganisations that reset context\n\n> Every interruption charges interest. The debt is paid in shallow work.\n\n## Protecting the resource\n\nThe interventions that work are structural rather than personal: fewer standing meetings, written updates by default, and long uninterrupted blocks defended at the level of the calendar, not the individual.'),

('Capital Discipline Returns to Software','capital-discipline-returns-to-software',
 'A decade of cheap money produced a particular kind of company. The new environment is producing a different one.',
 '/images/cover-business.jpg','theo-lindqvist','business',false,9,1980,24,
 E'## The end of an unusual decade\n\nFor ten years, the cost of capital made growth the only variable that mattered. Companies were optimised for the metric their investors could underwrite.\n\n### What is changing\n\n1. Gross margin is a topic again.\n2. Payback periods are measured in quarters, not eras.\n3. Headcount is treated as a durable commitment.\n\n> Discipline is not austerity. It is the practice of knowing which spending compounds.\n\n## The companies that adapt\n\nThe firms navigating this well share an operating habit: they can state, in one sentence, what each dollar of spend is expected to return, and by when.')
) as v(title, slug, excerpt, cover, author_slug, cat_slug, featured, reading_time, views, days, content)
join public.authors a on a.slug = v.author_slug
join public.categories c on c.slug = v.cat_slug;

-- SEED POST TAGS
insert into public.post_tags (post_id, tag_id)
select p.id, t.id from public.posts p
join public.tags t on t.slug in ('essay','longform')
where p.featured = true;
insert into public.post_tags (post_id, tag_id)
select p.id, t.id from public.posts p
join public.tags t on t.slug = 'opinion'
where p.featured = false;