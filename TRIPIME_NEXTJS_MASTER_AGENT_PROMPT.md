# TRIPIME NEXT.JS MASTER AGENT PROMPT

## ROLE

Act as a senior product designer, UX architect, Next.js engineer, frontend architect, and migration engineer.

Your task is to migrate the existing Tripime frontend from React/Vite to a new production-ready Next.js frontend while preserving the existing working backend, APIs, business logic, booking functionality, and production behavior.

At the same time, completely redesign the frontend UI/UX into a premium, modern, highly interactive travel platform.

The goal is:

> SAME PRODUCT FUNCTIONALITY + SAME BACKEND + COMPLETELY NEW PREMIUM NEXT.JS EXPERIENCE

The result should feel like a real premium travel startup, not an AI-generated template or a React-to-Next.js conversion.

---

# 1. EXISTING PROJECT

Current production project:

D:\aerotrav-production\tripime-v2

Existing frontend:

D:\aerotrav-production\tripime-v2\frontend

Existing backend:

D:\aerotrav-production\tripime-v2\backend

New project:

D:\aerotrav-production\New next js tripime

IMPORTANT:

- Never destroy the existing production project.
- Never modify tripime-v2 unnecessarily.
- The existing backend remains the source of truth.
- The new frontend must be developed separately.
- Do not create a second drifting copy of the backend.
- Do not rewrite backend business logic simply to make the migration easier.

---

# 2. CURRENT SYSTEM — PRESERVE IT

The existing audit identified:

Frontend:

- React 19
- Vite 8
- React Router 7
- Tailwind CSS v4
- Axios
- Lucide React
- SweetAlert2
- BookingContext + sessionStorage
- Admin JWT in localStorage
- Inter Variable

Backend:

- FastAPI
- Python 3.11.9
- Pydantic v2
- Admin JWT
- JSON file storage
- ReportLab invoices
- SMTP support
- Mock payment provider
- Mock flight provider
- 22 API endpoints

Existing customer functionality includes:

- Home
- Flight search/results
- Passenger booking
- Booking review
- Seat selection
- Payment
- Booking confirmation
- My Booking
- Packages
- Package details
- Hotels coming soon
- Buses coming soon
- Visa coming soon
- About
- Contact
- Privacy
- Terms
- Refund policy

Existing admin functionality includes:

- Admin login
- Dashboard
- Bookings
- Package CRUD
- Enquiries

---

# 3. NON-NEGOTIABLE FUNCTIONALITY RULE

The existing backend functionality must remain intact.

Preserve:

- API endpoint paths
- Request payloads
- Response shapes
- Status codes
- Booking creation flow
- Payment idempotency behavior
- Seat decrement behavior
- PNR/booking ID behavior
- Package categories
- Enquiry statuses
- PDF invoice generation
- Admin JWT flow
- Admin authorization
- Existing booking state
- Existing sessionStorage behavior
- Existing flight filtering/sorting logic
- Existing seat map generation
- Existing airport/inventory constraints
- Existing validation rules
- Existing contact information
- Existing environment behavior

Do not change the booking step order:

Passengers
→ Review
→ Seats
→ Payment
→ Confirmation

Do not change existing URL/query parameter contracts unnecessarily.

For flight search, preserve:

origin
destination
date
passengers

The new UI must sit on top of the existing business functionality.

---

# 4. BACKEND ARCHITECTURE

DO NOT COPY THE BACKEND into the new project as a second independent backend.

The intended architecture is:

D:\aerotrav-production\
│
├── tripime-v2\
│   ├── frontend        OLD
│   └── backend         EXISTING PRODUCTION BACKEND
│
└── New next js tripime\
    └── frontend        NEW NEXT.JS FRONTEND

The new frontend connects to the existing FastAPI backend.

Use:

NEXT_PUBLIC_API_BASE_URL

The backend remains separately deployed/running, currently on Render.

Only make backend changes if genuinely required.

For example:

- CORS update for the new frontend domain

Do not introduce unnecessary backend refactoring.

---

# 5. FIRST ACTION — INSPECT, DO NOT ASSUME

Before implementing anything:

Inspect:

D:\aerotrav-production\tripime-v2\frontend

and:

D:\aerotrav-production\tripime-v2\backend

Verify the actual current repository instead of relying only on this prompt.

Inspect:

- package.json
- routes
- pages
- components
- API modules
- contexts
- hooks
- types
- utility functions
- assets
- images
- fonts
- environment configuration
- backend routes
- backend models
- backend providers
- booking logic
- payment logic
- admin logic
- deployment configuration

Do not blindly rewrite working functionality.

If the actual repository differs from this document, use the repository as the source of truth and report the difference.

---

# 6. CREATE NEW NEXT.JS PROJECT

Create:

D:\aerotrav-production\New next js tripime

Use:

- Next.js latest stable
- App Router
- TypeScript
- Tailwind CSS v4
- Motion / Framer Motion
- Lucide React

Use other libraries only when genuinely necessary.

Potential advanced libraries:

- GSAP
- GSAP ScrollTrigger
- Lenis
- Three.js
- React Three Fiber
- Drei
- Lottie/Rive

DO NOT install all of these automatically.

Start lightweight.

---

# 7. TARGET ARCHITECTURE

Use a clean structure similar to:

frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── flights/
│   ├── packages/
│   ├── booking/
│   ├── my-booking/
│   ├── about/
│   ├── contact/
│   ├── privacy/
│   ├── terms/
│   ├── refund-policy/
│   └── admin/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── flights/
│   ├── packages/
│   ├── booking/
│   ├── admin/
│   ├── travel/
│   └── motion/
│
├── sections/
│   ├── home/
│   ├── packages/
│   └── shared/
│
├── hooks/
├── lib/
│   ├── api/
│   ├── contact.ts
│   ├── format.ts
│   ├── airports.ts
│   ├── seat-map.ts
│   └── cn.ts
│
├── providers/
├── types/
├── public/
└── styles/

Do not create giant monolithic components.

---

# 8. SERVER VS CLIENT

Use Server Components where they provide real value.

Use Client Components when browser state or interaction is required.

Client-side areas will include:

- Booking flow
- BookingContext
- sessionStorage
- Seat map
- Payment forms
- Flight filtering/sorting
- Interactive search
- Motion-heavy UI
- 3D hero
- Interactive maps
- Carousels
- Admin dashboards

Do not make the entire application client-side unnecessarily.

---

# 9. DESIGN DIRECTION

The new website should NOT look like a traditional travel agency.

Do NOT create:

- generic Bootstrap-style layouts
- boring rectangular cards
- excessive gradients
- excessive glassmorphism
- random animations
- repetitive card grids
- giant empty sections
- huge bulky cards
- outdated travel UI

Create:

- premium travel aesthetic
- cinematic photography
- modern typography
- compact information density
- layered compositions
- subtle 3D depth
- smooth motion
- interactive cards
- animated SVGs
- floating elements
- premium micro-interactions
- sophisticated Gen-Z visual language

Design principle:

> 3D = WOW
> Animation = STORY
> Micro-interaction = DELIGHT
> 2D UI = USABILITY

The website should feel like:

> A travel experience, not a travel website.

---

# 10. IMPORTANT UI DENSITY REQUIREMENT

The existing website looks too large at 100% browser zoom.

The new UI must be more compact.

Target approximately:

- Body: 13–14px
- Meta: 11–12px
- H1: 28–32px
- H2: 20–24px
- Card title: 15–16px
- Buttons: 36–40px
- Card images: approximately 112–128px where appropriate
- Smaller gaps
- Less vertical whitespace
- More information visible above the fold

Do not make every section huge.

Use a 4px-based spacing system.

The interface should feel dense enough to be useful, but never cramped.

---

# 11. VISUAL SYSTEM

Use a premium warm visual foundation.

Suggested:

Background:
#F8F7F4

Dark:
#101010

Use one primary vibrant accent such as:

- electric blue
- coral
- lime
- lavender

Do not use many random colors.

Use:

- rounded modern cards
- organic shapes
- pill buttons
- floating badges
- layered cards
- subtle borders
- controlled shadows
- limited glass effects

Do not make every component a rounded translucent rectangle.

---

# 12. HOMEPAGE VISION

The homepage should be the visual flagship of Tripime.

Suggested sections:

1. Navigation
2. Hero
3. Destination Explorer
4. Trending Trips
5. Build Your Trip
6. Interactive Travel Map
7. Hotels / Coming Soon
8. Experiences / future-ready section
9. Testimonials
10. Travel Inspiration
11. Final CTA
12. Footer

IMPORTANT:

Do not fake backend functionality.

If Hotels/Experiences are not supported by the current backend, treat them as future/coming-soon experiences or visual sections using clearly labeled demo/static content.

Do not pretend users can book something that the backend cannot actually book.

---

# 13. NAVIGATION

Create a compact premium sticky navbar.

Desktop:

Logo
Explore
Flights
Packages
Hotels*
Buses*
Visa*
About
My Booking
Search
Profile/CTA

Use existing functionality to determine the exact final navigation.

Initially:

- transparent/overlay when appropriate

After scrolling:

- slightly solid
- subtle blur
- compact
- smooth transition

Mobile:

- compact logo
- search
- menu

Mobile menu should use smooth animation.

Do not make the navbar huge.

---

# 14. HERO

Create a cinematic hero.

Possible composition:

- Large editorial heading
- Destination photography
- Compact flight/travel search
- Interactive airplane
- Floating destination card
- Floating traveler/trust card
- Primary CTA
- Secondary CTA
- Scroll indicator

Hero should not consume the entire screen unnecessarily.

Target approximately 60–70vh maximum on desktop unless visual testing proves otherwise.

---

# 15. HERO 3D

Use 3D carefully.

Possible objects:

- airplane
- globe
- suitcase
- travel ticket
- compass

Preferred initial implementation:

1. Animated SVG airplane
2. SVG flight path
3. CSS parallax
4. Motion-based depth

Only introduce React Three Fiber if it provides a meaningful improvement.

If R3F is used:

- lazy load it
- desktop-focused
- simplified mobile fallback
- avoid blocking initial rendering

Never make 3D required for basic navigation or booking.

---

# 16. HERO ANIMATION

Target a polished 1–2 second initial reveal.

Sequence can be:

1. Logo/nav
2. Hero typography
3. Hero image
4. Floating cards
5. Airplane
6. CTA
7. Scroll indicator

Do not make animations slow or annoying.

Respect prefers-reduced-motion.

---

# 17. DESTINATION EXPLORER

Create an interactive destination section.

Possible categories:

- Beach
- Mountains
- City
- Adventure
- Romantic
- Family
- Luxury
- Nature

Cards should support:

- destination image
- location
- starting price
- experiences
- category
- CTA

Use structured data instead of hardcoding JSX repeatedly.

---

# 18. DESTINATION CAROUSEL

Create a premium carousel.

Use:

- horizontal drag/swipe
- snap scrolling
- active-card scaling
- subtle overlap
- image zoom
- depth
- elegant 3D tilt
- partial next-card visibility

Desktop:

4–5 cards where appropriate.

Mobile:

approximately 1.1–1.3 cards visible to communicate horizontal scrolling.

Do not over-rotate cards.

---

# 19. TRENDING TRIPS

Create cinematic travel cards.

Potential destinations:

- Bali
- Maldives
- Dubai
- Kashmir
- Thailand
- Switzerland
- Turkey
- Vietnam

But structure the data so it can later come from APIs.

Each card can include:

- image
- destination
- duration
- rating
- price
- CTA

---

# 20. BUILD YOUR TRIP

This should become a signature Tripime UX feature.

Flow:

Step 1:
What's your vibe?

- Romantic
- Adventure
- Chill
- Party
- Family
- Luxury
- Nature

Step 2:
Where do you want to go?

- Beach
- Mountains
- City
- Desert
- Island

Step 3:
Budget

- ₹20K
- ₹50K
- ₹1L+
- Custom

Step 4:
Duration

- Weekend
- 3–5 days
- 7 days
- 10+ days

CTA:

BUILD MY TRIP

Animate selections.

Initially this can be a frontend experience using structured recommendation data.

Do not claim AI/backend-generated recommendations unless the backend actually supports it.

Architect it so it can later connect to real recommendation APIs.

---

# 21. INTERACTIVE MAP

Create an interactive SVG map where useful.

Possible behavior:

- destination hover
- destination highlight
- destination information card
- animated routes
- airplane path

Example:

Delhi → Dubai → Istanbul → Paris

Use SVG for routes rather than WebGL unless WebGL provides real value.

---

# 22. FLIGHT ROUTE STORYTELLING

Create a visual travel story using:

- animated route
- airplane
- destination points
- labels
- scroll-linked animation where useful

Use GSAP/ScrollTrigger only if necessary.

This should be an enhancement, not a dependency for functionality.

---

# 23. FLIGHT RESULTS

Redesign the existing flight result page without changing its functionality.

Make flight cards compact.

Example conceptual layout:

6E | 06:30 DEL ─── 2h 15m ─── 08:45 BOM | ₹4,299 | Book

Secondary information:

Non-stop
Seats available
Baggage
Fare information

Expandable details can reveal:

- fare rules
- baggage
- other relevant information

Preserve all existing filter/sort behavior.

---

# 24. BOOKING FLOW

The booking flow is extremely important.

Preserve exactly:

Passengers
→ Review
→ Seats
→ Payment
→ Confirmation

Redesign visually, but do not change business logic.

Use:

- compact stepper
- clean forms
- sticky summary where useful
- clear price breakdown
- excellent validation
- loading states
- error states
- mobile sticky CTA where appropriate

Do not sacrifice booking usability for visual effects.

---

# 25. BOOKING SUCCESS

Create a premium delightful success experience.

Example concept:

"You're going!"

Show:

- destination
- dates
- travelers
- booking ID

Allow:

- View My Trip
- Download Invoice

Use a short celebratory animation.

Do not make it childish.

---

# 26. PACKAGE EXPERIENCE

Redesign:

/packages

and:

/packages/[packageId]

Preserve the existing package APIs.

Package detail can include:

- hero
- destination
- rating
- duration
- price
- CTA
- overview
- itinerary
- hotels
- activities
- inclusions
- exclusions
- gallery
- reviews/available data
- FAQ where data exists
- sticky booking/enquiry CTA

Do not invent backend data that doesn't exist.

---

# 27. MY BOOKING

Preserve the current lookup functionality.

Improve:

- form UX
- loading
- error state
- result presentation
- booking details
- invoice access

Keep existing API contracts.

---

# 28. ADMIN

Admin functionality must be preserved.

Routes:

- login
- dashboard
- bookings
- packages
- enquiries

Admin does not need the same cinematic treatment as the customer-facing website.

Prioritize:

- clarity
- speed
- usability
- data density
- professional dashboard UI

Preserve JWT behavior.

Do not expose admin functionality publicly.

---

# 29. MOTION STRATEGY

Use Motion for:

- buttons
- cards
- menus
- modals
- tabs
- page transitions
- entrance animations
- staggered content
- hover states
- micro-interactions

Use GSAP/ScrollTrigger only for:

- cinematic scroll storytelling
- complex SVG route animations
- pinned sections
- horizontal storytelling

Use CSS for simple animations.

Do not animate everything.

---

# 30. 3D CARD EFFECTS

Use CSS perspective where possible.

Cards can use:

- subtle rotateX/Y
- depth
- image parallax
- scale
- shadow/depth changes

Do not use WebGL for cards.

Use WebGL only for meaningful hero-level experiences.

---

# 31. MAGNETIC BUTTONS

Optional subtle magnetic behavior for major CTAs:

- Plan My Trip
- Explore
- Book Now

Disable/simplify on touch devices.

Do not apply magnetic behavior to every button.

---

# 32. CUSTOM CURSOR

Optional desktop-only custom cursor.

Possible states:

Image → VIEW
Destination → EXPLORE
CTA → GO

Keep it subtle.

Disable on mobile and respect accessibility.

---

# 33. PAGE TRANSITIONS

Add subtle page transitions.

Do not create long transitions.

Target:

- quick fade
- subtle slide
- smooth content entry

Navigation should always feel fast.

---

# 34. MOBILE

Mobile is a first-class experience.

Do NOT simply shrink desktop.

Mobile should use:

- swipeable cards
- touch-friendly controls
- simplified hero
- reduced 3D
- simplified animations
- horizontal destination rails
- sticky booking CTA
- no hover-dependent functionality
- no horizontal overflow

Disable custom cursor on mobile.

---

# 35. ACCESSIBILITY

Implement:

- semantic HTML
- keyboard navigation
- focus states
- accessible buttons
- accessible forms
- alt text
- sufficient contrast
- reduced motion support

Respect:

prefers-reduced-motion

When reduced motion is enabled, disable/reduce non-essential effects.

---

# 36. PERFORMANCE

Performance is non-negotiable.

Use:

- next/image
- WebP/AVIF where appropriate
- lazy loading
- dynamic imports
- lazy-loaded 3D
- optimized assets
- minimal DOM animation
- CSS for simple effects
- avoid huge GIFs
- avoid unnecessary dependencies
- avoid unnecessary re-renders

Target:

- smooth interactions
- fast initial load
- low layout shift
- good Core Web Vitals

If a visual effect significantly damages performance, simplify or remove it.

Do not sacrifice product quality for unnecessary 3D.

---

# 37. DATA ARCHITECTURE

Do not hardcode repeated UI directly into JSX.

Create structured data models.

Example destination:

id
name
country
image
price
rating
experiences
category

Example package:

id
destination
title
duration
price
image
rating
itinerary

Example hotel:

id
name
destination
image
price
rating
amenities

Use mock/static data only where the backend does not yet provide the functionality.

Clearly separate:

- real API data
- temporary demo data
- future-ready data

---

# 38. EXISTING FUNCTIONALITY VS NEW EXPERIENCE

Use this rule:

### MUST PRESERVE

Existing:

- flights
- booking
- seats
- payment
- confirmation
- invoice
- my booking
- packages
- enquiries
- admin
- legal pages
- contact

### CAN REDESIGN

- all visual UI
- layout
- typography
- spacing
- cards
- navigation
- animations
- page composition
- SEO
- loading states
- error states
- responsive behavior

### FUTURE-READY / DO NOT FAKE

- hotels
- experiences
- wishlist
- destination intelligence
- advanced trip builder
- AI recommendations
- real interactive hotel booking

These can have polished UI/coming-soon experiences but must not pretend backend functionality exists.

---

# 39. IMPLEMENTATION ORDER

Do NOT build the entire website randomly.

Follow this sequence.

## PHASE 1 — FOUNDATION

- Create Next.js project
- App Router
- TypeScript
- Tailwind
- API layer
- Types
- Environment configuration
- Global layout
- Design tokens
- Navbar
- Footer
- Base responsive system

Exit criteria:

npm run build succeeds.

---

## PHASE 2 — DESIGN SYSTEM

Create:

- Button
- Input
- Select
- Card
- Badge
- Modal
- Dialog
- Tabs
- Skeleton
- Toast
- Tooltip
- Dropdown

Patterns:

- FlightCard
- PackageCard
- FilterBar
- Stepper
- FareSummary
- SearchForm
- Carousel

Exit criteria:

Core UI primitives are reusable and visually consistent.

---

## PHASE 3 — HOMEPAGE

Build:

- Hero
- Search
- Destination Explorer
- Trending Trips
- Build Your Trip
- Travel Map
- Coming Soon sections
- Testimonials
- Final CTA
- Footer

Initially focus on visual quality and usability.

Do not add heavy WebGL yet.

---

## PHASE 4 — CORE PRODUCT FLOWS

Build and integrate:

- Flight search
- Flight results
- Filters
- Sorting
- Passenger flow
- Review
- Seat selection
- Payment
- Confirmation
- Invoice
- My Booking

This phase must have feature parity with the existing application.

---

## PHASE 5 — PACKAGES

Build:

- Package listing
- Package detail
- Enquiry flow

Use real existing package APIs.

---

## PHASE 6 — ADMIN

Build:

- Admin login
- Dashboard
- Bookings
- Package CRUD
- Enquiries

Preserve JWT behavior.

---

## PHASE 7 — MOTION

After functionality is stable:

Add:

- Motion transitions
- Card interactions
- Carousels
- Scroll reveals
- Page transitions
- Micro-interactions
- SVG flight routes
- Scroll storytelling

---

## PHASE 8 — 3D

Only after core UI and functionality work:

Evaluate:

- 3D airplane
- 3D globe
- Hero parallax
- Interactive travel object

Use React Three Fiber only if justified.

Lazy-load it.

Provide mobile fallback.

---

## PHASE 9 — POLISH

Perform:

- responsive testing
- accessibility testing
- animation tuning
- performance optimization
- loading states
- error states
- empty states
- SEO
- metadata
- sitemap
- image optimization
- visual consistency

---

## PHASE 10 — PRODUCTION VALIDATION

Verify:

- npm build
- production environment variables
- API connectivity
- CORS
- authentication
- booking
- payment
- invoice
- admin
- package enquiry
- mobile
- desktop
- error handling

Do not touch production deployment until the new frontend passes validation.

---

# 40. IMPORTANT: DO NOT BREAK PRODUCTION

The old project:

D:\aerotrav-production\tripime-v2

must remain runnable throughout development.

Never use destructive commands against it.

Never delete or overwrite the existing frontend/backend.

The new project must be isolated.

Only after complete validation should migration/cutover be considered.

---

# 41. CODE QUALITY

Follow:

- TypeScript strictness
- reusable components
- clean naming
- separation of concerns
- no duplicated logic
- no giant components
- proper hooks
- accessible interactions
- responsive Tailwind
- clean API layer
- clear data models

Do not leave fake placeholders where actual existing functionality is expected.

---

# 42. CRITICAL DECISION RULE

When deciding between visual complexity and product usability:

USABILITY WINS.

When deciding between 3D and performance:

PERFORMANCE WINS.

When deciding between rewriting backend logic and adapting frontend:

PRESERVE BACKEND.

When deciding between copying old UI and creating a better experience:

CREATE THE BETTER EXPERIENCE.

---

# 43. DO NOT STOP AT A BASIC AI WEBSITE

Continuously evaluate:

- Does this feel premium?
- Does this feel like a real travel startup?
- Is the hierarchy strong?
- Is the UI compact?
- Is the animation purposeful?
- Does the interface feel expensive?
- Is the experience memorable?
- Would users enjoy exploring it?
- Can users still book quickly?
- Does it look good at 100% browser zoom?
- Does mobile feel intentionally designed?

If the answer is no, refine it.

Do not settle for:

"AI-generated cards + gradients + generic hero."

---

# 44. FIRST AGENT ACTION

Because this is a large migration, DO NOT immediately build every page.

First:

1. Inspect the actual repositories.
2. Confirm the current architecture.
3. Confirm the API contracts.
4. Create the new Next.js project.
5. Establish the folder structure.
6. Set up the design system.
7. Set up the API layer.
8. Run the build.
9. Report the result.

Then continue phase by phase.

Do not modify tripime-v2 unless explicitly required.

Do not stop after giving suggestions.

Actually create the new project and implement the approved phases.

---

# 45. REPORTING AFTER EACH PHASE

After each major phase, report:

1. What was implemented.
2. Files/components created.
3. Existing functionality integrated.
4. Packages installed.
5. Build/test result.
6. Any issues.
7. Any decisions that require approval.
8. What the next phase will implement.

Do not ask for confirmation for trivial implementation decisions.

Use engineering/design judgment.

Only stop for genuine blockers or decisions that could materially affect existing production behavior.

---

# FINAL PRODUCT GOAL

The final Tripime should feel like:

Premium travel startup
+
modern SaaS-level usability
+
cinematic travel storytelling
+
subtle 3D
+
beautiful motion
+
compact information-rich UI
+
production-grade booking experience

The user should think:

> "This looks amazing. I actually want to explore this."

But when the user wants to book:

> "This is extremely easy."

The core principle is:

**WOW visually. SIMPLE functionally. SAFE technically.**

START NOW.

Inspect first.
Plan internally.
Create the isolated Next.js frontend.
Do not break tripime-v2.
Then implement phase by phase.
