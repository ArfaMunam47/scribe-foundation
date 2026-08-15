# Editorial Canvas

Build a Premium Full-Stack Blogging Platform

Build a production-quality, premium blogging platform that looks and feels like a real modern startup product — not a basic template or student project.

The website must be fully responsive, functional, polished, accessible, and visually impressive on mobile, tablet, laptop, and large desktop screens.

1. Product Vision

Create a premium editorial/blogging platform where visitors can:

Discover blog posts

Read complete articles

Search and filter posts

Browse posts by category

View author information

Create an account

Log in and log out

Access their user dashboard

Administrators must have a secure Admin Panel where they can:

Create blog posts

Edit posts

Delete posts

Publish/unpublish posts

Manage categories

Manage users

View basic platform statistics

The overall experience should feel comparable to a polished modern SaaS/editorial product.

2. Technology & Architecture

Use a modern production-ready architecture.

Preferred stack:

React

TypeScript

Tailwind CSS

Modern component architecture

Supabase for authentication and database

Proper client-side routing

Reusable components

Responsive design

Form validation

Loading states

Empty states

Error states

Toast notifications

Do NOT build fake functionality.

If authentication/database functionality is required, actually connect and implement it using Supabase rather than creating fake buttons or hardcoded data.

Keep the code clean, modular, maintainable, and scalable.

3. Main Pages

Create at least these 5 major public pages:

Page 1 — Home

Create an impressive editorial homepage.

Include:

Premium navbar

Brand logo

Navigation links

Search button/input

Login button

Sign Up button

Hero section

Featured article

Latest articles

Trending articles

Category sections

Popular authors

Newsletter subscription section

Premium footer

The hero section should immediately communicate that this is a high-quality publication.

Use strong typography, sophisticated spacing, beautiful article cards, subtle animations, and excellent visual hierarchy.

Page 2 — Blog / Explore

Create a dedicated blog discovery page.

Include:

Page heading

Search

Category filters

Featured articles

Article grid

Sorting/filtering

Pagination or load-more functionality

Each article card should show:

Cover image

Category

Title

Short excerpt

Author

Publication date

Reading time

Optional view count

Cards should have subtle hover animations.

Page 3 — Single Blog Post

Create a beautiful article reading experience.

Include:

Large article cover image

Category

Article title

Subtitle/excerpt

Author information

Publication date

Reading time

Social/share buttons

Proper article typography

Headings

Paragraphs

Images

Quotes

Lists

Related articles

Author section

Add a reading-progress indicator at the top.

The reading experience should feel premium and comfortable rather than crowded.

Page 4 — About

Create an elegant About page explaining:

What the platform is

Mission

Vision

Why it exists

Editorial philosophy

Team/author section

Statistics

Newsletter CTA

Use editorial-style layouts rather than a generic corporate template.

Page 5 — Contact

Create a professional Contact page.

Include:

Contact heading

Short introduction

Contact form

Name

Email

Subject

Message

Submit button

Validation

Success state

Error state

Social/contact information

The form should actually work where backend integration is available.

4. Authentication

Implement real authentication.

Create:

Sign Up

Fields:

Full name

Email

Password

Confirm password

Include:

Validation

Password requirements

Show/hide password

Loading state

Error handling

Success feedback

Login

Include:

Email

Password

Remember-me option if supported

Forgot password

Login button

Link to Sign Up

Logout

Users must be able to securely log out.

Protect authenticated routes.

Do NOT expose admin functionality to normal users.

5. User Dashboard

After login, users should have a clean dashboard.

Include:

Profile information

Account settings

Saved/bookmarked posts if implemented

Recently viewed articles if implemented

Logout

Use a clean dashboard layout with a sidebar on desktop and appropriate mobile navigation.

6. Admin Panel

Create a completely separate premium Admin Dashboard.

The Admin Panel must not be accessible to ordinary users.

Create:

Dashboard Overview

Display:

Total posts

Published posts

Draft posts

Total users

Total categories

Recent posts

Recent activity

Use attractive statistic cards and charts where useful.

Blog Management

Create a table containing:

Post title

Author

Category

Status

Published date

Actions

Actions:

Create

Edit

Preview

Publish

Unpublish

Delete

Add confirmation dialogs for destructive actions.

7. Create Blog Post

The admin should have a proper article editor.

Fields:

Title

Slug

Excerpt

Cover image

Category

Author

Tags

Content

Publication status

Publish date

Support:

Draft

Published

Provide a professional writing/editor experience.

The admin should be able to preview the article before publishing.

8. Category Management

Admin should be able to:

Create categories

Edit categories

Delete categories

View number of posts per category

Example categories:

Technology

Artificial Intelligence

Business

Design

Development

Productivity

Startups

Make the category system dynamic rather than hardcoded wherever possible.

9. User Management

Admin should be able to view registered users.

Show:

Name

Email

Role

Registration date

Status

Support appropriate admin actions while maintaining security.

Use role-based authorization.

Roles:

User

Admin

Never rely only on frontend checks for admin authorization.

10. Database

Use Supabase/PostgreSQL.

Design a proper relational structure.

Suggested entities:

profiles

id

full_name

avatar_url

role

created_at

updated_at

posts

id

title

slug

excerpt

content

cover_image

author_id

category_id

status

published_at

created_at

updated_at

categories

id

name

slug

description

created_at

tags

id

name

slug

If implementing tags properly, create a post-tags relationship.

Use proper foreign keys and relationships.

11. Security

Security is extremely important.

Implement:

Supabase authentication

Protected routes

Role-based authorization

Row Level Security where appropriate

Secure database policies

Admin-only operations

Input validation

Safe error handling

Do not store passwords manually.

Do not put secrets directly into frontend code.

Use environment variables for sensitive configuration.

12. Premium Visual Design

This is extremely important.

Do NOT make the website look like a generic Tailwind starter template.

The design should feel:

Premium + Editorial + Modern + Elegant + Cinematic + Sophisticated

Use a sophisticated neutral palette.

Suggested visual direction:

Warm ivory / off-white backgrounds

Deep charcoal text

Soft beige/stone surfaces

Subtle muted gold accents

Carefully controlled dark sections

High-quality imagery

Elegant borders

Soft shadows

Subtle glass effects where appropriate

Avoid excessive purple, neon colors, or cheap-looking gradients.

The color system must have excellent contrast and accessibility.

13. Typography

Typography should be one of the strongest parts of the design.

Use a premium font pairing.

For example:

Elegant serif font for major editorial headlines

Modern sans-serif for UI/body text

Create clear hierarchy between:

H1

H2

H3

Body

Metadata

Labels

Buttons

Article reading typography should be especially comfortable.

14. Navbar

Create a premium responsive navbar.

Desktop:

Logo | Home | Explore | Categories | About | Contact | Search | Login/Account

Mobile:

Hamburger menu

Logo

Search

Login/account

Make sure elements NEVER overlap or touch each other.

Pay special attention to:

spacing

alignment

responsive breakpoints

button sizes

mobile usability

The navbar should look excellent in both full-screen desktop mode and mobile preview.

15. Animations

Use subtle professional animations.

Examples:

Smooth page transitions

Card hover effects

Image zoom on hover

Button micro-interactions

Fade/slide reveal animations

Navbar transitions

Reading progress animation

Animations must be:

subtle, fast, smooth, and purposeful.

Do NOT turn the website into an over-animated gimmick.

Respect reduced-motion preferences.

16. Responsive Design

This is mandatory.

Test the entire application at:

320px

375px

390px

430px

768px

1024px

1280px

1440px

1920px+

Do not simply stretch the mobile design onto desktop.

Desktop should properly use available screen space.

Avoid:

excessive empty space

extremely narrow content

overlapping elements

horizontal scrolling

broken grids

oversized text

navbar collisions

cards with inconsistent heights

The full-screen desktop experience should look intentionally designed.

17. Favicon & Branding

Create a professional brand identity.

Do NOT leave the default Vite/React favicon.

Create:

Custom favicon

Browser title

Open Graph metadata

Social preview metadata

Professional logo

Proper app name

The favicon should visually match the brand.

Use a simple recognizable symbol that remains visible even at tiny sizes.

18. Images

Use high-quality editorial imagery.

Avoid:

random low-quality stock images

stretched images

broken image URLs

inconsistent aspect ratios

Create consistent image containers with proper object-fit behavior.

Use lazy loading where appropriate.

Provide fallback states when an image cannot load.

19. UX Details

Every interaction should feel intentional.

Implement:

Loading skeletons

Empty states

Error states

Success messages

Toast notifications

Confirmation dialogs

Form validation

Disabled button states

Hover states

Focus states

Keyboard accessibility

Never leave a button that appears functional but does nothing.

20. SEO

Implement basic SEO.

Each blog post should have:

Unique title

Meta description

Canonical URL

Open Graph metadata

Proper heading hierarchy

SEO-friendly slug

Use semantic HTML.

21. Final Quality Requirements

Before considering the project complete:

Test every route.

Test Sign Up.

Test Login.

Test Logout.

Test protected routes.

Test admin authorization.

Test creating a post.

Test editing a post.

Test deleting a post.

Test publishing/unpublishing.

Test category management.

Test user management.

Test search.

Test filtering.

Test article pages.

Test forms.

Test mobile responsiveness.

Test desktop responsiveness.

Remove console errors.

Remove placeholder buttons that do nothing.

Remove unnecessary demo data before production.

Make sure there are no broken images.

Make sure there is no horizontal overflow.

Make sure authentication and database operations actually work.

22. Important Lovable Instruction

Do not stop after generating the UI.

Build the actual functional application.

If a feature requires Supabase, configure the database structure, authentication, relationships, and security policies.

If credentials or configuration are required, clearly identify what I need to provide.

Do not fake authentication with local state.

Do not fake the admin panel with static data.

Do not create buttons that only display alerts saying "Coming Soon."

Every major feature described above should either be fully implemented or clearly identified as requiring a specific external configuration.

23. Final Design Goal

When someone opens this website, their first reaction should be:

"This looks like a real premium publication/startup product."

It should feel:

Expensive

Modern

Trustworthy

Editorial

Intelligent

Minimal but visually rich

Fast

Professional

Memorable

Do not make it look like an AI-generated template.

Make deliberate design decisions throughout the entire product.

Build the complete application now, then verify the functionality and responsiveness before finishing.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://scribe-foundation.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bbd51cfb-1038-4f2b-bef8-9477185e5fd6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
