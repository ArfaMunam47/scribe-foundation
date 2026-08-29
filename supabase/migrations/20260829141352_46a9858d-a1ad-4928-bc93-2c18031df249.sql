
UPDATE public.posts SET reading_time = 11, excerpt = 'A lending shelf in a rented room changed how one neighbourhood talks about study, work and its own children. A field report on what small libraries actually do.', content = $md$
When the shelf arrived it held ninety-four books, most of them donated, several of them water-damaged, and one of them — a battered atlas with a torn spine — destined to become the single most requested item in the collection. The room was rented for the equivalent of two bus fares a day. There was no catalogue, no librarian, and no plan beyond a hand-lettered sign that read: *open after school, everyone welcome.*

Eighteen months later the same room holds more than nine hundred titles, three study tables, a homework club that runs four evenings a week, and a rota of twelve volunteers who between them have never missed an opening. Attendance is not the interesting number. The interesting number is that seventeen households in the surrounding lanes now describe their children as "students" when asked what those children do — a word almost nobody used before.

## What a library is actually for

The case usually made for community libraries is a literacy case: books in, reading scores up. That case is real but it is narrow, and it consistently undersells what these rooms do. In our monitoring, measurable reading gains appeared late and unevenly. What appeared early — within weeks — was something harder to put on a dashboard: a change in what families believed was normal.

A neighbourhood without a study space treats homework as a private struggle conducted at the edge of a kitchen table, in competition with cooking, siblings and television. A neighbourhood with a study space treats homework as a scheduled public activity that other people also do. That shift is social, not academic. It is also the precondition for every academic gain that follows.

> A library does not persuade a family that education matters. It removes the daily friction that makes acting on that belief exhausting.

## The economics nobody mentions

The recurring cost of the room is modest, and it is the least significant line in the budget. The significant costs are the ones organisations tend to leave out of proposals because they look unglamorous:

- **Light.** Two additional fixtures and a functioning ceiling fan raised average sitting time from thirty-five minutes to just over an hour. No programme change achieved anything comparable.
- **Chairs at the right height.** Adult chairs at adult tables push out children under ten. Two low tables changed the age profile of the room entirely.
- **A cupboard that locks.** Volunteers stopped carrying materials home, which meant sessions no longer depended on one person's availability.
- **Someone paid.** One part-time coordinator, paid properly, is worth more than fifteen enthusiastic volunteers with no coordination. This is the line funders cut first and regret last.

Together those items accounted for a fraction of the annual budget and the overwhelming majority of the operational difference. A programme that cannot afford chairs, light and a coordinator is not a cheap programme; it is an unfinished one.

## Borrowing patterns tell you who is missing

Circulation data is the most under-read source of information a small library produces. Ours revealed three things within the first quarter.

First, borrowing peaked on the two days when the room opened earliest — a scheduling fact, not a demand fact. Second, teenage girls borrowed at roughly half the rate of teenage boys until the opening hours moved forward by ninety minutes, after which the gap nearly closed; the constraint was travelling home after dark, and no amount of outreach would have fixed it. Third, the atlas.

The atlas mattered because it was the only book in the collection that was not about somewhere else in the abstract. Children traced routes to cities relatives had migrated to. Adults borrowed it to settle arguments. When we replaced it with three newer atlases, all three went out permanently. Demand, it turns out, is specific. It does not look like the category headings in a donation list.

## Volunteers, and the limits of goodwill

Twelve volunteers sounds like abundance. In practice a volunteer rota degrades in a predictable way: the most reliable person absorbs the gaps, becomes indispensable, and then leaves. We have watched this happen in three separate programmes.

The countermeasures are unromantic. Fix the shift length at two hours. Never let one person hold both keys and the schedule. Write the opening procedure on a laminated card so that competence is a property of the room rather than of a particular individual. Ask people to commit to eight weeks, not to a cause. Goodwill is a starting resource, not an operating model.

## What we would do differently

If we were opening the room again tomorrow, we would spend the first month not acquiring books but sitting in the space at different hours, counting who walks past and asking four of them what would make them come in. We acquired first and asked later, and roughly a third of the original collection has never been borrowed once.

We would also publish the opening hours somewhere permanent and physical, painted rather than printed. Six separate families told us they had assumed the room had closed because a paper notice had come down in the rain.

## The measure that holds up

Two years on, the metric we trust least is footfall and the metric we trust most is repeat attendance across a school holiday. Anyone can fill a room in week one. A room that stays full in the third week of a long holiday, when there is no institutional reason for anyone to be there, has become part of how the neighbourhood organises itself.

That is the threshold we now use when deciding whether to extend support to a new site. Not enthusiasm at the opening. Presence in the quiet weeks.
$md$ WHERE slug = 'community-library-neighbourhood';

UPDATE public.posts SET reading_time = 10, excerpt = 'Enrolment is easy and attendance is hard. What eleven terms of after-school programming taught us about the practical design choices that keep families coming back.', content = $md$
Every after-school programme we have run has filled its places on the first day. Roughly half have still been running in recognisable form a year later. The gap between those two facts is where nearly all the useful learning sits, and almost none of it concerns curriculum.

## Attendance is a household decision, not a child's

The most common design error is treating the child as the participant. The participant is the household. A ten-year-old attends because an adult judged that the two hours were worth the rearrangement of the afternoon — the sibling who now needs collecting, the errand that now happens later, the meal that shifts.

Once you accept that, the questions change. Instead of asking how to make sessions more engaging, you start asking what the programme costs a family that is not measured in money. Our answer, gathered across eleven terms, is that four costs dominate: travel, timing, unpredictability, and the quiet social cost of being the family that needs help.

## Fix the timetable before you fix the content

Three scheduling changes have done more for retention than any content redesign.

1. **End times that match, not precede, adult availability.** A session ending twenty minutes before a parent can arrive creates a supervision problem that the family solves by withdrawing.
2. **The same days every week, permanently.** Rotating schedules read as instability. Families protect themselves against instability by disengaging early.
3. **A published term calendar, including the breaks.** Programmes that simply stop for a holiday lose attenders who assume the stop was permanent. Naming the return date in advance recovers most of them.

> Reliability is a pedagogical feature. A predictable mediocre session outperforms an excellent session that might not happen.

## Attendance data, read honestly

Raw attendance rates flatter programmes. A cohort that averages seventy per cent attendance can conceal two entirely different realities: thirty children attending seven sessions in ten, or twenty-one children attending everything while nine drift away by week four. These require opposite responses, and the average hides which one you have.

We now track three things instead:

- **Cohort retention** — the share of enrolled children still attending in the final third of a term.
- **Gap recovery** — the share of children who return after missing two consecutive sessions. Below fifty per cent, something in the re-entry process is broken; usually nobody made contact.
- **Sibling continuity** — whether younger siblings of past attenders enrol. This is our best available proxy for whether households judged the experience worth repeating.

Gap recovery turned out to be the lever. A single phone call after a second missed session raised return rates from thirty-eight per cent to sixty-one across two terms. The call did not need to be skilful. It needed to exist.

## The first fifteen minutes decide the session

Sessions that begin with an unstructured arrival window are harder to run and harder to attend. Children who arrive first wait, children who arrive late enter a room already in motion, and the facilitator spends their sharpest fifteen minutes on crowd management.

The fix is a low-stakes task available from the moment the door opens — a puzzle sheet, a shared drawing, reading. It costs nothing, gives late arrivals a soft entry point, and converts waiting into participation. Facilitator-reported stress fell noticeably in every site where we introduced it.

## What we stopped doing

**We stopped running certificate ceremonies at the end of every term.** Attendance in the final two weeks rose, then collapsed in the following term among children who had not received one. Recognition tied to completion punishes the households with the least flexibility.

**We stopped mixed-age groups above a four-year spread.** The intention was peer mentoring. The result was that twelve-year-olds stopped coming.

**We stopped asking for feedback on paper.** Response rates were under fifteen per cent and skewed heavily to the most engaged families. Two minutes of conversation at pickup produced better information from the people we were least hearing from.

## Facilitators are the programme

Content can be adequate. Facilitators cannot. Every site that lost a facilitator mid-term saw attendance fall by at least a quarter and recover slowly, if at all — regardless of how carefully the handover was documented.

This has budget implications that programme designers routinely avoid. Paying two facilitators part-time rather than one full-time costs marginally more and eliminates the single point of failure entirely. It also allows sessions to continue through illness, which over a year is not a rare event but a certainty.

## The honest summary

After-school programmes do not fail because the activities were uninspiring. They fail because a family made eleven small logistical judgements over a term and the programme lost most of them. Design for those judgements — the travel, the timing, the phone call after an absence, the facilitator who is still there in March — and the content has room to work.
$md$ WHERE slug = 'after-school-programmes-attendance';

UPDATE public.posts SET reading_time = 10, excerpt = 'Most volunteer programmes are not short of volunteers. They are short of coordination. A practical account of the systems that keep people contributing past week six.', content = $md$
The recruitment problem is largely imaginary. In eight years we have never struggled to find people willing to give time to something visible and local. What we have struggled with — consistently, expensively — is keeping them past the sixth week, and using their time in a way that is worth the hours they gave up.

Volunteer coordination is an operational discipline. Treated as a warm feeling, it produces churn.

## The shape of volunteer attrition

Attrition follows a recognisable curve. A cohort of twenty typically loses four before the first shift, another five between weeks two and six, and then stabilises with a core of eight to eleven who continue for months or years.

The losses before the first shift are almost entirely administrative: a gap of more than nine days between signing up and being given something to do accounted for the majority of our no-shows. The losses between weeks two and six are different and more informative. Exit conversations point overwhelmingly at three causes.

- **Arriving to find no defined task.** Being told to "help out" is not an assignment; it is an invitation to feel surplus.
- **Not knowing whether the work mattered.** Volunteers who never learn what happened to the thing they did assume it did not matter.
- **Being on a rota with people they never met.** Isolated shifts have roughly half the retention of paired shifts in our data.

> People do not leave because the work was hard. They leave because the work felt optional to everyone including us.

## Give the first shift a script

The single highest-return intervention we have made is a written first-shift protocol, no longer than one page, containing: what the volunteer will do, who will meet them, where to put their bag, when the break is, and what happens at the end. It reads as bureaucratically dull. It moved first-to-second-shift conversion from about six in ten to nearly nine in ten.

The reason is straightforward. A new volunteer spends their first session managing uncertainty rather than contributing. Removing the uncertainty returns that capacity to the work, and — more importantly — signals that the organisation is competent enough to be worth committing to.

## Pair everyone, always

Solo shifts look efficient on a rota and are corrosive in practice. Pairing does three things at once: it makes the work sociable, it distributes knowledge so that no single person becomes irreplaceable, and it provides an informal training channel that costs nothing.

Where the work genuinely requires only one pair of hands, we overlap shifts by twenty minutes instead. The handover conversation is often where the most useful operational information in the whole programme is exchanged.

## Close the loop, in specifics

Generic gratitude is inert. "Thank you for your support" is read as a form letter, because it is one. What works is a specific, factual account of consequence, delivered within a fortnight:

- the number of families who used the service on the days that volunteer worked;
- what changed as a result of a suggestion they made;
- the thing that would not have happened without the shift they covered.

We send this as a short monthly note per team, not per individual, which keeps it sustainable. Retention among volunteers who receive it runs materially higher than among those who joined during the months we let it lapse — which we did twice, both times because the coordinator role was vacant.

## Coordination is a paid job

This is the uncomfortable conclusion. Every degradation we have documented traces back to the same structural cause: nobody whose actual job it was to hold the rota, make the calls, write the notes and notice the person who quietly stopped coming.

Volunteer programmes are frequently proposed as a way to deliver services without staff cost. They are not. They are a way to deliver a much larger volume of service for a modest staff cost, and the coordination role is the cost. Removing it does not save money; it converts a functioning programme into a list of names.

## What we ask of volunteers now

Our current commitment request is deliberately small and deliberately concrete: two hours, the same slot, for eight weeks, with a named partner and a defined task. We no longer ask people to volunteer indefinitely, and we no longer ask them to volunteer for a cause. Both requests sound more inspiring and both perform worse.

At the end of the eight weeks we ask again. Most people say yes. The ones who do not have finished something rather than abandoned something, and a surprising number come back a year later.

## A short checklist

1. Contact within forty-eight hours of sign-up; first shift within nine days.
2. One page of written instructions before the first shift.
3. Nobody works alone.
4. A phone call after two consecutive absences.
5. A specific account of impact once a month.
6. One person, paid, accountable for all of the above.

None of it is inspiring. All of it is the difference between a rota and a programme.
$md$ WHERE slug = 'volunteer-coordination-practice';

UPDATE public.posts SET reading_time = 10, excerpt = 'Consultation is usually the stage that gets compressed when budgets tighten. Three projects show what it costs to skip it — and what a well-run listening phase actually looks like.', content = $md$
There is a version of community consultation that exists to be reported. A hall is booked, a presentation is given, comments are recorded, and the project proceeds essentially as designed. We have run that version. It is fast, it produces good photographs, and it changes nothing.

There is a slower version that regularly overturns the plan. It is more expensive up front and considerably cheaper by the end. This is an account of what distinguishes them.

## Three projects, one pattern

**A water point.** The engineering assessment identified the optimal location on hydrological grounds. Six weeks of conversation identified a different location, marginally worse hydrologically, that women could reach without crossing a road that becomes impassable in the rains. The first site would have been correct and unused.

**A skills centre.** The proposal assumed daytime classes. Listening revealed that the target participants were almost all engaged in daytime income-generating work, and that the binding constraint was not motivation or fees but the hours between six and nine in the evening, which nobody had proposed using because the building had no reliable lighting. The intervention that mattered turned out to be electrical.

**A health outreach programme.** Designed around a monthly visiting clinic. Consultation established that a monthly cadence was worse than useless for the conditions concerned, because it created an expectation of care that could not respond to anything acute. The programme was redesigned around training four resident volunteers instead.

In each case the design was competent and the premise was wrong. No amount of implementation quality recovers from a wrong premise.

> The purpose of consultation is not to secure agreement with your plan. It is to discover which parts of your plan were assumptions.

## Who is in the room, and who is not

Public meetings systematically over-represent people who are available at the meeting time, comfortable speaking in groups, and already connected to whoever convened it. That is a specific and predictable demographic, and it is rarely the group whose constraints determine whether a project works.

Our current practice is to treat the public meeting as the least important of four channels:

- **Doorstep conversations** at three different times of day, including one after dark, with a fixed short set of questions.
- **Small group sessions** of six to eight, separated by group where mixed sessions would suppress participation.
- **Conversations at existing gathering points** — the market, the clinic queue, the school gate — rather than at events we create.
- **The public meeting**, held last, used to test conclusions rather than to gather them.

Running the public meeting first inverts this. It anchors everyone, including the project team, to whatever was said loudest in the first hour.

## Questions that produce information

Most consultation questions invite endorsement. "Would a community library be useful here?" returns yes almost universally and tells you nothing. The questions that produce usable information are concrete, personal and past-tense:

- What did you do the last time your child needed help with schoolwork?
- When did you last travel outside the neighbourhood for something you would rather have found here, and how long did it take?
- What is the hardest hour of your week?
- What has been tried here before that stopped, and why do you think it stopped?

That last question is the one we now consider indispensable. Nearly every place we work has a history of interventions that ended, and the reasons they ended are the most accurate available forecast of what will happen to ours.

## Recording without distorting

Note-taking changes what people say. Recording devices change it more. Our compromise: one person converses, does not write, and reconstructs notes within thirty minutes with a second person present. It is slower and the fidelity is worth it.

We also record disagreement explicitly rather than synthesising it away. A consultation report that presents a single community view is almost always a report that has flattened the group whose view was least convenient.

## Reporting back is part of consultation

The stage most often skipped is the return visit. Having asked, you owe an account of what you heard, what you are acting on, and — critically — what you are not acting on and why. Communities that have been consulted repeatedly without ever receiving that account become, entirely reasonably, unwilling to participate again.

We now schedule the report-back before the consultation begins, name the date publicly, and hold it even when the news is that the project is not proceeding. The projects we have cancelled after listening have cost us less credibility than the ones we proceeded with after ignoring what we heard.

## What it costs

Doing this properly added between four and seven weeks to the front of our last three projects, and roughly six per cent to project cost. Against that: one relocated water point, one programme redesigned before construction, and one monthly clinic never built. The arithmetic is not close.

Consultation is not a courtesy extended to communities. It is the part of project design where the expensive mistakes are still cheap to fix.
$md$ WHERE slug = 'listening-first-consultation';

UPDATE public.posts SET reading_time = 9, excerpt = 'Printed material is the default health communication tool and one of the weakest. What actually moves information through a neighbourhood is a small number of trusted people.', content = $md$
We have printed a great many posters. They are cheap, they are quick to approve, they photograph well on a clinic wall, and in four rounds of follow-up we have never been able to attribute a behaviour change to one.

This is not an argument that printed material is useless. It is an argument that it is a reference tool being used as a persuasion tool, and that health information in practice moves the way most important information moves: through people who are already trusted.

## What the follow-up showed

After a seasonal hygiene campaign we asked two hundred and forty households a simple question: where did you first hear this? The distribution was consistent across three neighbourhoods.

- From another person in the household or immediate street: the clear majority.
- From a health worker or volunteer directly: roughly a fifth.
- From a poster, leaflet or banner: under one in twenty.
- From radio or messaging apps: the remainder, concentrated in younger respondents.

More telling was the second question: where did you hear it in a way that made you change something? The printed category effectively disappeared. Almost everyone who acted named a specific individual.

> Information does not persuade because it is correct. It persuades because of who is standing next to it.

## The four-person pattern

In every neighbourhood we have worked in, a small number of people function as information hubs. They are rarely the officially designated ones. Typically they include a shopkeeper, someone who runs a savings or prayer group, a retired teacher or health worker, and a woman in her fifties whose house is where people go with problems.

Identifying these four takes about a week of asking a single question — *who around here do people go to when they need advice?* — and produces a distribution network more effective than any leaflet run we have funded. The same message given to those four reaches further, faster and with more credibility than the same message printed three thousand times.

This has an obvious failure mode. Concentrating communication in four people concentrates trust in four people, and if the message is wrong, the correction is correspondingly hard. It also risks exhausting individuals who are already doing unpaid social labour. Both problems are manageable and both need naming in the design.

## Design the message for retelling

If the transmission mechanism is a conversation, then the message has to survive being retold by someone with no training, in their own words, several days later. That is a demanding constraint and it is not the constraint most health material is written for.

Practically, this means:

1. **One action, not a list.** Messages containing three recommendations arrive at the third household containing one, and not reliably the most important one.
2. **A reason that is locally true.** Abstract mechanisms drop out of retelling; consequences that name a real, recognisable situation survive.
3. **A number that is easy to hold.** "Boil for one minute" travels. "Ensure adequate thermal treatment" does not.
4. **No conditional clauses.** Exceptions and edge cases are the first thing lost, and their loss can invert the meaning.

We now test messages by telling them to one person, waiting two days, and asking a third party to repeat what they heard. The attrition in that chain is instructive and occasionally alarming.

## Where printed material does work

Print earns its place as a reference, not an introduction. Once someone has decided to act, a card with the clinic's opening hours, the correct dosage, or the phone number is genuinely valuable — and it is valuable precisely because nobody needs to be persuaded by it.

Our current split reflects that. Small, durable, specific cards handed over during a conversation; almost no large-format general-awareness printing. The cards cost less than the posters did and get kept.

## What we are still unsure about

Two questions remain open in our own practice.

The first is compensation. The people who carry information through a neighbourhood are performing real work, and we have not settled on a defensible way to recognise that without converting a relationship of trust into a transaction that the neighbourhood can see. Small in-kind support has worked better than cash in our experience, but we hold that loosely.

The second is verification. A person-to-person network transmits corrections slowly. When guidance changes — as it did twice during a single programme — we could reprint a poster in a day and had no comparably fast way to update a conversation. We do not yet have a good answer to this, and any programme relying on human transmission should plan for it explicitly rather than discovering it mid-campaign.

## The short version

Print the reference material. Spend the campaign budget on finding the four people, briefing them properly, giving them something worth repeating, and going back to check what arrived at the other end.
$md$ WHERE slug = 'health-information-people';
