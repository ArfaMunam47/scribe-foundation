
delete from public.post_tags where true;
delete from public.bookmarks where true;
delete from public.posts where true;
delete from public.authors where true;
delete from public.categories where true;

insert into public.categories (name, slug, description) values
('Community','community','Neighbourhood work, volunteering and the practical craft of organising people.'),
('Education','education','Learning spaces, literacy, tutoring and access to schooling.'),
('Social Impact','social-impact','How programmes are funded, measured and sustained over time.'),
('Awareness','awareness','Public information work on health, safety and rights.'),
('Human Stories','human-stories','First-hand accounts from the people our programmes are built with.'),
('Foundation Updates','foundation-updates','Notes on how the foundation works, what we publish and how we are governed.');

insert into public.authors (name, slug, role_title, bio, avatar_url) values
('Scrib Editorial Desk','editorial-desk','Editorial desk',$b$The editorial desk commissions, edits and fact-checks everything published by the Scrib Foundation. Where an article draws on interviews or field visits, the desk records how the material was gathered.$b$,null),
('Programmes Desk','programmes-desk','Programmes team',$b$The programmes team designs and runs the foundation''s community, education and awareness work, and writes about the practical lessons that come out of it.$b$,null),
('Field Notes','field-notes','Field reporting',$b$Field Notes collects reporting written on site: community centres, workshops, open days and the ordinary weekday sessions where most of the work actually happens.$b$,null);

insert into public.posts (title, slug, excerpt, content, cover_image, author_id, category_id, status, featured, reading_time, published_at) values

('Why a small community library changes what a neighbourhood believes is possible','community-library-neighbourhood',
'A reading room is rarely just a reading room. It is a warm, free, unsupervised-but-safe place to be — and that combination is unusually hard to find.',
$md$A community library is one of the few remaining places a person can enter without being asked to buy anything, prove anything, or explain why they came. That single quality does more work than any programme built on top of it.

## The room before the books

When we help a neighbourhood set up a reading space, the first conversations are almost never about titles. They are about heating, opening hours, lighting, chairs, and whether a parent with a pushchair can get through the door. A collection that nobody can comfortably sit with is a storage problem, not a library.

The practical checklist we return to again and again:

- Predictable opening hours, published in a place people already look
- Seating for adults as well as children, because families arrive together
- Enough light to read in during winter afternoons
- A staffed desk, even if the staff member is a trained volunteer
- A quiet corner that is genuinely quiet

None of this is glamorous. All of it determines whether the space is used in week six.

## What people actually come for

Borrowing is only one of the uses. Over a normal week, a small reading room absorbs homework, job applications, form-filling, printing, language practice, and a great deal of conversation. Treating those uses as distractions from the "real" purpose is a mistake — they are the reason the room stays busy enough to justify keeping it open.

### Homework is the anchor

Where children have somewhere warm and lit to work, attendance patterns change at home as well as at school. Parents who might not attend a workshop will come to collect a child, and while they wait they read the notice board. A library becomes a distribution point for everything else a neighbourhood needs to know.

> The most useful thing a small library does is give people a reason to walk into a building they will later ask for help in.

## Collections built with, not for

The fastest way to make a collection feel foreign is to choose it entirely off-site. We ask three questions locally before buying anything:

1. What languages are actually spoken on this street?
2. What are people studying for right now — exams, licences, citizenship tests, trades?
3. What do children ask for when nobody is grading their choice?

The answers rarely match the assumptions in the funding proposal. Comics, cookery, driving theory and practical trade manuals routinely out-circulate literary fiction, and a collection that admits this is a collection people trust.

## Keeping it open

The failure mode for community libraries is not lack of interest. It is the moment the founding volunteer moves away. Sustainability, in practice, means:

- **Two people trained for every role**, so no single absence closes the door
- **A written opening routine** simple enough to hand to someone new
- **A named relationship** with a school, clinic or council office that can vouch for the space
- **Small, boring, recurring funding** rather than one large grant

## What we watch

We do not claim a reading room transforms outcomes on its own, and we are wary of numbers that suggest otherwise. What we do record is straightforward: how many hours the space was open, how many sessions ran, whether the same faces return, and what people asked for that we could not provide. That last list is usually the most useful document we produce all year.

## In closing

The argument for community libraries is not nostalgic. It is that a neighbourhood with one accessible, unconditional indoor space has somewhere to put every other good idea. Without it, each new programme has to find a room, a heater and a reason for people to trust it — from scratch, every time.$md$,
'/images/scrib-education.jpg',(select id from public.authors where slug='programmes-desk'),(select id from public.categories where slug='education'),'published',true,8,now() - interval '2 days'),

('Designing after-school programmes that families keep attending','after-school-programmes-attendance',
'Enrolment is easy. Attendance in week nine is the real design problem — and it is usually solved by logistics rather than curriculum.',
$md$Most after-school programmes are designed around what will be taught. Most after-school programmes lose half their attendance by the second month. These two facts are related.

## Attendance is a transport problem first

Before content, ask how a ten-year-old gets from the school gate to the room, and how they get home in the dark. If the answer involves an unlit walk, an unaffordable fare, or an adult who is still at work, the curriculum is irrelevant.

Interventions that reliably help:

- Running sessions in the school building rather than nearby
- Aligning finish times with a parent''s realistic pick-up time
- Group walking arrangements with two known adults
- A snack, provided without ceremony

## The second month problem

Novelty carries a programme for roughly six weeks. After that, children stay for one of three reasons: they are good at something there, they are needed there, or a friend is there. Design for all three.

### Being good at something

Rotate activities so that different kinds of ability get to be visible. A child who is slow at reading may be the fastest at building, and a programme that only rewards one axis quietly tells everyone else to leave.

### Being needed

Give returning attendees genuine responsibilities: setting up, running the sign-in sheet, showing newcomers where things are. Responsibility is the cheapest retention mechanism available.

### Friends

Allow children to enrol in pairs. It costs nothing and it changes the arithmetic of a nervous first week.

## Session shape that works

A repeatable, boring structure beats an inventive one:

1. Ten minutes of arrival and food
2. Twenty-five minutes of focused work, quiet, one task
3. Twenty minutes of active or collaborative work
4. Ten minutes of closing, tidying and a look ahead to next week

Children who cannot yet manage their own time can manage a rhythm they recognise. Volunteers who are not trained teachers can run a rhythm too.

## Working with, not around, schools

A programme that duplicates the school day is exhausting; a programme that ignores it is unhelpful. The workable middle is regular, low-formality contact with one named teacher who can say which children are struggling and with what. That relationship also protects the programme when a room is double-booked.

> Sustained attendance is a sign that the logistics are right. It is not, on its own, evidence of learning — and we try not to confuse the two.

## What we measure, and what we do not

We track attendance consistency, volunteer retention and whether children move on to something further. We do not publish claims about grade improvement from programmes that were never designed or resourced to measure it. Where we do not know, we say so.

## Closing thought

The most successful after-school sessions we have seen were unremarkable to watch: a warm room, a predictable hour, adults who knew everyone''s name, and a task that could be finished. Ambition in this work belongs in the consistency, not in the concept.$md$,
'/images/scrib-youth.jpg',(select id from public.authors where slug='programmes-desk'),(select id from public.categories where slug='education'),'published',true,7,now() - interval '5 days'),

('What good volunteer coordination actually looks like','volunteer-coordination-practice',
'Enthusiasm is abundant. What is scarce is the unglamorous administration that turns willing people into reliable help.',
$md$Every organisation says it values volunteers. Fewer are honest that badly coordinated volunteering costs more than it contributes — in staff time, in rework, and in the goodwill of people who turned up and were not used well.

## The first hour decides everything

A volunteer''s first session predicts whether there will be a second. The pattern that works is dull and repeatable:

- Someone is expecting them, by name
- There is a task ready before they arrive
- The task is finishable within the session
- Someone tells them what happened as a result

The most common failure is not rudeness. It is a room where everyone is busy and nobody has ten minutes to explain the job.

## Match the commitment to the task

Not all help is the same shape, and asking for the wrong shape wastes it.

1. **Episodic** — an open day, a delivery, a clean-up. High turnout, low training, no continuity required.
2. **Recurring** — a weekly session. Needs training, a reference check where children or vulnerable adults are involved, and a rota.
3. **Skilled** — accounts, legal review, translation, photography. Small time commitment, high value, usually wasted on tasks anyone could do.

Sorting people into the right category at the point of enquiry avoids most later frustration.

## Rotas are a promise

A rota published late is a rota nobody trusts. Publish at least a month ahead, allow swaps without asking permission, and make cancellation easy. A volunteer who can cancel cleanly is a volunteer who comes back; one who feels trapped simply stops replying.

> Reliability is created by systems, not by character. If half your volunteers are unreliable, look at the rota before you look at the people.

## Safeguarding is not optional paperwork

Where work involves children or vulnerable adults, checks, training and a clear reporting route come before the first session — not after a problem. This slows recruitment. It should. The alternative is an organisation that cannot honestly answer a parent''s reasonable question.

## Recognition without theatre

Annual awards evenings are pleasant and largely beside the point. What people report valuing:

- Being told what their work led to, specifically
- Being asked their opinion about how the session runs
- Being trusted with a key, a code, or a decision
- A reference when they apply for a job

## Counting honestly

Volunteer hours are an input, not an outcome. We record hours because we need them for planning and for funders, but we try never to present them as evidence of impact. A hundred badly used hours is a cost.

## Closing

Good coordination is mostly a filing problem solved with respect. Know who is coming, know what they will do, tell them how it went. Everything else in volunteering is downstream of those three habits.$md$,
'/images/scrib-community.jpg',(select id from public.authors where slug='programmes-desk'),(select id from public.categories where slug='community'),'published',false,7,now() - interval '8 days'),

('Listening first: how consultation changes what gets built','listening-first-consultation',
'A programme designed in a meeting room and a programme designed after forty conversations rarely resemble each other.',
$md$Consultation has a reputation problem. Too often it means presenting a finished plan and inviting comment on the colour scheme. Done properly, it is the stage where the plan is still capable of changing.

## Ask before you have an answer

The useful moment to consult is uncomfortable: early, when you do not yet know what you intend to do. Questions at that stage are open and slightly embarrassing to ask.

- What is difficult about this month, specifically?
- What have you already tried?
- Who already helps, and what stops them helping more?
- What would you want us not to do?

That final question consistently produces the most valuable answers.

## Go where people already are

Attendance at a public meeting selects for people with free evenings, confidence and transport. That is not the community; it is a slice of it. Consultation that matters happens at school gates, in waiting rooms, in shops, at the end of existing sessions, and on doorsteps.

### The quiet correction

Almost every time we have consulted broadly, the priority order changed. Requests we expected to hear — new equipment, new buildings, more events — routinely came second to timing, cost, childcare and safety of the route home. Those are cheaper problems, and solving them unlocks the rest.

> If consultation never changes your plan, it was not consultation.

## Recording without flattening

Notes should keep disagreement visible. When a summary reports that "the community wants X", it has usually erased a real argument between people with different needs. Better practice:

1. Record the range of views, including the minority ones
2. Note who was not reached, and why
3. State which views the design followed, and which it did not
4. Say what would change the decision

## Coming back

The fastest way to poison future consultation is to disappear after it. People remember being asked. Returning with a short, plain account of what was heard and what was done — including the parts that were rejected and why — costs an afternoon and buys years of credibility.

## Consent and care

Personal stories gathered during consultation are not automatically publishable material. We ask separately for permission to publish, we allow people to withdraw, and we do not use identifying details of children. Where a story cannot be told safely, it does not get told.

## Closing

Listening is not a soft preliminary to the real work. It is the part of the work that determines whether everything afterwards is worth doing. Programmes fail far more often from misreading a need than from executing badly.$md$,
'/images/scrib-hero.jpg',(select id from public.authors where slug='editorial-desk'),(select id from public.categories where slug='community'),'published',false,6,now() - interval '11 days'),

('Health information travels through people, not posters','health-information-people',
'Public information work fails when it is designed as broadcast. It succeeds when it moves along relationships that already exist.',
$md$A poster in a corridor is a reassurance to the organisation that put it there. It is rarely how anyone changes what they do. Information that changes behaviour almost always arrives from a person the listener already trusts.

## The trust chain

Ask people where they heard something important about health and the answer is usually a chain: a neighbour, a relative, a pharmacist, a teacher, a community health worker. Formal sources appear late in the chain, often to confirm rather than to introduce.

This has a practical implication. Awareness work should invest less in materials and more in the people the chain already runs through.

## Who the intermediaries are

In most neighbourhoods a short list of people absorb and pass on information:

- Pharmacy staff, who see people weekly and are asked direct questions
- School office staff, who talk to every parent
- Faith and community group organisers
- Shopkeepers on the main street
- Older residents who have lived there longest

Briefing twenty such people properly reaches further than a thousand leaflets, and it allows questions — which leaflets do not.

## Say the useful thing first

Public information is often written in the order the institution thinks in: background, then caveat, then instruction. People read the first line. Invert it.

1. What to do
2. Where to do it, with opening hours
3. What it costs, including if it is free
4. Who to ask if unsure

### Language

Write at a reading level below the one you assume. Translate into the languages actually spoken locally, and have the translation checked by someone who lives there rather than only by a translation service. Idiom matters: a technically correct translation can still read as officialdom.

> Distrust is usually rational. It is built from previous experiences of being spoken down to, given wrong information, or charged unexpectedly.

## Answering rumour without contempt

Correction that mocks the belief it corrects entrenches it. What works better is acknowledging the reasonable core of a concern, being specific about what is known and unknown, and naming the limits of the evidence. People forgive uncertainty far more readily than they forgive being managed.

## What we avoid

We do not publish fear-based material, and we do not use statistics we cannot source. Where the evidence is contested, we say it is contested. Awareness work borrows credibility from every other part of an organisation, and it can spend it very quickly.

## Closing

Effective awareness work looks less like a campaign and more like a network of well-briefed, ordinary conversations. It is slower, harder to photograph, and considerably more likely to survive contact with real life.$md$,
'/images/scrib-health.jpg',(select id from public.authors where slug='editorial-desk'),(select id from public.categories where slug='awareness'),'published',false,7,now() - interval '14 days'),

('The quiet economics of a skills workshop','economics-of-a-skills-workshop',
'Training programmes are often judged on completion rates. The number that decides whether they matter is what a participant can charge afterwards.',
$md$A skills workshop is easy to run badly and expensive to run well. The difference is rarely the teaching. It is whether the programme takes seriously the economics that a participant walks back into.

## Certificates are not income

A completion certificate has value only where employers or customers recognise it. In many local economies they do not. What converts training into income is more mundane:

- Tools the participant keeps
- A first paid job, arranged rather than hoped for
- A way to be found by customers
- Someone to ask when something goes wrong in month two

A programme that delivers instruction and nothing else has done the cheapest part of the job.

## The cost nobody budgets

Attending training has a price: lost earnings, transport, childcare. For someone working informally, a full-time course is often simply unaffordable, which is why cohorts skew towards those who need help least. Designs that widen access include evening and weekend sessions, modular courses that can be paused, on-site childcare, and travel reimbursement paid the same day.

## Teaching to the market that exists

Curriculum should follow demand that can be verified locally, not demand described in a national strategy document. Practical checks before committing:

1. Talk to employers and customers in the area about what they are actually paying for
2. Find out what work is currently being sent out of the neighbourhood
3. Ask existing tradespeople what they cannot keep up with
4. Check what tools and materials are locally available and affordable

> The most common design error is training people for jobs that exist elsewhere, then treating their departure as a success.

## Aftercare is the programme

The months after a course determine everything. Low-cost aftercare that works:

- A monthly drop-in clinic for graduates
- A shared tool library
- A group chat where questions get answered by peers first
- Introductions, made deliberately, to buyers and to more experienced workers

## Measuring without flattering

Completion and satisfaction are easy to measure and easy to make look good. Harder, more honest indicators: whether participants are still doing the work six months later, whether they are earning from it, and whether they would recommend the course to someone whose income depends on the answer. Where we cannot follow up properly, we report the gap rather than estimating around it.

## Closing

The value of a workshop is realised outside the workshop. Programmes that budget for tools, aftercare and introductions produce results that survive the closing ceremony; programmes that budget only for teaching produce photographs.$md$,
'/images/scrib-livelihoods.jpg',(select id from public.authors where slug='programmes-desk'),(select id from public.categories where slug='social-impact'),'published',false,7,now() - interval '17 days'),

('Small grants, long horizons: how support gets funded','small-grants-long-horizons',
'Short funding cycles quietly shape what community organisations are able to attempt. The consequences are visible in every abandoned pilot.',
$md$Ask why a promising local project stopped and the answer is seldom that it failed. More often the funding ran for twelve months, the reporting consumed the coordinator, and the renewal decision arrived after the staff had already found other work.

## What short cycles do to programmes

Funding shapes design long before any money is spent:

- Projects are proposed at the size a grant will cover, not the size the problem is
- Novelty is rewarded, because renewal is harder to win than a new pilot
- Staff are hired on contracts too short to build local relationships
- Evaluation is written for the funder, not for the team

The result is a landscape full of pilots and short of anything that has been allowed to become ordinary.

## What smaller, longer funding changes

A modest grant over three years behaves differently from a large one over one. It permits hiring a person rather than commissioning a burst of activity, it survives an unproductive quarter, and it lets an organisation say no to work outside its purpose.

### The overheads argument

Refusing to fund core costs does not make an organisation efficient. It makes it fragile, and it pushes administration onto unpaid time. Rent, insurance, accounting and coordination are the programme; they are simply the parts that do not photograph well.

> An organisation that cannot pay for its own bookkeeping will eventually have a bookkeeping problem, and it will be the funder who is surprised.

## Reporting proportionate to the grant

A reasonable rule: the reporting burden should scale with the money, and never consume more than a small fraction of it. Practical alternatives to heavy reporting:

1. A short written update, twice yearly, in plain language
2. One site visit instead of a written narrative
3. Reuse of the organisation''s own internal reporting
4. Agreed indicators chosen at the start, not added later

## For organisations seeking funds

Some habits make small organisations more fundable without distorting them:

- Keep clean, current accounts, however small the turnover
- Write down what you do and do not do
- Record activity as you go, not at reporting time
- Be candid about what did not work; funders who penalise candour are the wrong funders

## Closing

Patience is a design feature, not a virtue. The programmes that end up mattering are usually the ones that were allowed to be unexciting for long enough to become part of how a place works.$md$,
'/images/scrib-community.jpg',(select id from public.authors where slug='editorial-desk'),(select id from public.categories where slug='social-impact'),'published',false,6,now() - interval '20 days'),

('A morning at the community open day','morning-community-open-day',
'Notes from a folding table between the housing advice stand and the tea urn, where most of the real business of the day happened.',
$md$The tables went up at half past seven, in the sort of grey light that makes everyone doubt the turnout. By nine the yard held perhaps forty people, which the organisers described as normal and privately treated as a relief.

## The geography of a yard

Where a table stands determines what it does. The housing advice stand had been placed at the far end, and for the first hour it was empty; people do not walk the length of a yard towards a subject they find humiliating. Moved beside the tea urn after eleven, it did not stop being busy.

This is not a small observation. Services that require someone to publicly declare a need should be positioned so that approaching them is unremarkable.

## What people asked about

The clipboard at the front desk recorded the questions, roughly in order of frequency:

- Opening hours for the after-school sessions
- Whether the food support required proof of anything
- Help with an online form
- Whether anyone could look at a letter
- Where the toilets were

Three of those five are administrative. A great deal of community work turns out to be reading official correspondence out loud and explaining what it means.

### The letters

A retired teacher spent most of the morning at the end table with a pen, working through envelopes people had brought. Some had been carried around for weeks. The service being offered was not legal advice; it was a calm second reading by someone who was not frightened of the paper.

> One woman said she had understood the letter perfectly well. She had wanted someone to confirm it was as bad as she thought, so she could stop rehearsing it.

## Children as infrastructure

The children''s corner — paper, glue, two volunteers — was not a side attraction. It was what allowed adults to stand still long enough to have a conversation of more than two minutes. Every functioning open day we have attended has had one, and the ones without have shorter conversations and worse outcomes.

## What did not work

- The sign-up sheet for the newsletter, which collected four names
- The presentation scheduled for ten o''clock, which nobody sat down for
- Laminated information sheets that could not be taken home

The pattern is consistent: anything requiring people to commit attention in a fixed block failed; anything that could be picked up while moving succeeded.

## The end of the morning

By one o''clock the tables were folded and the yard was a car park again. Forty conversations, eleven letters, two referrals to the housing team, and a quantity of tea. No part of it would appear in an impact report as anything other than an event.

That is a measurement problem, not a value problem. The next time one of those forty people needs help, they will know a face and a building — and that is the whole point of the morning.$md$,
'/images/scrib-events.jpg',(select id from public.authors where slug='field-notes'),(select id from public.categories where slug='human-stories'),'published',true,6,now() - interval '23 days'),

('Planting for shade: neighbourhood greening as everyday infrastructure','planting-for-shade-greening',
'Street trees are discussed as beautification. They function as shade, drainage and somewhere to stand — which is a different argument entirely.',
$md$A row of young trees along a residential street is usually justified with the language of appearance. The residents who asked for them rarely used that language. They talked about walking to the shops in summer, about water pooling at the kerb, and about having somewhere to stop.

## The uses people name

When we ask why a street wants planting, the answers cluster:

- Shade on the route to school, the shops or the bus stop
- Somewhere for older residents to pause on a longer walk
- Less standing water after heavy rain
- A visible sign that the street is looked after

Only the last is aesthetic, and even that is really about safety and neglect.

## Planting is the easy part

A planting day is popular, photogenic and straightforward. The tree''s survival depends on the two years afterwards, which are none of those things.

1. **Watering** through the first two summers, on a rota, in a drought
2. **Protection** from vehicles, mowers and well-meaning pruning
3. **A named person** who notices when one is failing
4. **Replacement** budgeted in advance, because some will die

Schemes that fund the planting and not the aftercare produce a street of stakes.

### Choosing species honestly

Fast-growing species satisfy the desire for visible change and frequently outgrow the space, damaging pavements and triggering removal. Slower, appropriately sized species look disappointing for three years and are still there in thirty. This is a conversation to have with residents rather than for them, because they are the ones who will live with the compromise.

> A tree planted in the wrong place is a future complaint about trees.

## Working with the people who own the ground

Almost every greening project fails at a permission it did not know it needed: highways, utilities, housing management, drainage. Establishing early who owns the verge and what runs underneath it prevents an enthusiastic afternoon becoming an expensive one.

## Beyond trees

Where planting is not possible, smaller interventions do comparable work: planters at junctions, a maintained hedge, a shaded bench, a cleared and lit alley. The measure is not greenery for its own sake but whether being outdoors on that street becomes easier.

## Closing

Greening earns its place when it is argued for as infrastructure: shade, water, rest, care. Framed that way it competes for maintenance budgets on the same terms as everything else on the street — which is the only way it survives the third summer.$md$,
'/images/scrib-environment.jpg',(select id from public.authors where slug='programmes-desk'),(select id from public.categories where slug='awareness'),'published',false,6,now() - interval '26 days'),

('How we work: publishing and governance notes','how-we-work-governance-notes',
'What the Scrib Foundation publishes, how articles are checked, and the rules we hold ourselves to when writing about the people we work with.',
$md$This is a working document rather than a statement of values. It describes what we currently do, and it is updated when the practice changes.

## What we publish

The Scrib Foundation publishes writing about community, education, social impact and public awareness work — principally the practical detail of how such work is designed, funded and sustained. Articles fall into four groups:

- **Practice notes** from our programmes team, describing methods and what we learned
- **Field reporting**, written on site
- **Human stories**, published only with informed consent
- **Foundation updates**, including changes to how we operate

## How articles are checked

Every article is read by at least one person who did not write it. Where a piece describes a programme, someone involved in delivering it reviews it for accuracy before publication. Quotations are read back to the person quoted.

### On numbers

We do not publish impact statistics we cannot source and did not collect properly. Where a figure would be useful and we do not have it, the article says so. This makes some of our writing less persuasive than it could be, and we accept that trade-off deliberately.

> The absence of a number is not a gap to be filled with a plausible one.

## Consent and privacy

- Nobody appears in a story without agreeing to appear in that story
- Consent is asked for again if the piece changes substantially
- People may withdraw before publication, and we honour requests to remove afterwards where it is possible
- Children are not identified
- Circumstances that could put someone at risk are omitted or altered, and the alteration is disclosed

## Corrections

Errors are corrected on the article itself, with a dated note explaining what changed. We do not quietly edit published work. Anyone may raise a correction by email, and we aim to respond within five working days.

## Accounts and independence

Editorial decisions are made by the editorial desk. Funders and partners do not review articles before publication and cannot commission coverage of themselves. Where an article concerns an organisation that funds us, that relationship is disclosed in the article.

## Reuse

Our articles may be reproduced in full for non-commercial purposes with attribution and a link to the original. For anything else, ask — the answer is usually yes.

## Contact

Corrections, questions about a programme, requests to reuse an article, or offers of help all reach the same desk: **nam01alpha@gmail.com**. We read everything, and we reply to most things.$md$,
'/images/scrib-hero.jpg',(select id from public.authors where slug='editorial-desk'),(select id from public.categories where slug='foundation-updates'),'published',false,5,now() - interval '29 days');
