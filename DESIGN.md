# permitdrills.com — Design Doc

Written 2026-10-25, after the launch build, as the design-standard pass ordered the same day (the user rejected a "still too minimal" redesign on the sister site and set the bar: *top-tier sites style every element deliberately; specific places get specific animations; the result must be exactly right*). This doc records the teardown, the logo, the component inventory as shipped, and the known weak spots left for the factory playbook QA pass.

## 1. Teardown — what the top of this niche actually does

Sources fetched live on 2026-10-25 (page text/structure; Zutobi's interactive quiz itself lives in its app, so its quiz-UX notes come from its public pages' stated mechanics and landing patterns — flagged where inferred):

**driving-tests.org** — homepage, NJ state hub, and the live NJ practice test (all fetched):
- **Quiz chrome**: a persistent score strip sits above the question at all times — "0 Incorrect (4 allowed to pass)" and "0 Correct" — i.e. two live counters plus an explicit *miss budget* derived from the state's pass mark. Under it, a sourcing line ("Original questions based on the latest NJ Driver Handbook • Expert-reviewed by …") rides on the quiz itself, not buried in a footer.
- **A specific animation/moment**: the *first* missed question triggers a Challenge Bank™ toast ("We've added this question to your Challenge Bank™ — all your missed questions are saved automatically"). One micro-interaction, at exactly the moment of failure, converting a mistake into a feature demo.
- **Test page furniture**: difficulty tag ("Easy"), time estimate ("6 min"), an average-pass-rate stat, a **score-distribution bar set** (90–100 → 19% …), a "quick facts" table (questions / passing score / time limit / retake wait / fee / languages), "where test-takers struggle most" with per-topic miss-rate bars, "Last verified: Sep 26, 2026" date stamps, and a named human reviewer block ("Reviewed for legal and handbook accuracy" + credentials).
- **State hub**: a numbered *journey* (1 Essentials → … → Exam Simulator → Challenge Bank → Handbook), each stage card carrying its question count — progress is spatial, not a menu.
- **Sample questions** on the page use "Show answer & explanation" reveals; explanations end with the citation (chapter + statute) — the same sourcing pattern we ship per question.
- Copy tone: confident, plain, benefit-first; every section earns its place (no decorative filler sections).

**Zutobi** — US landing (fetched):
- **Gamification as the visual language**: points, levels, progress that is always visible; feature tiles are icon-led with one-line payoffs ("600+ questions", "Exam Simulator — matches your state's exact format and passing score").
- **Stat visualization as persuasion**: "95.8% Pass Rate vs 61.7% National Avg" rendered as a comparison visual, not a sentence; Trustpilot stars + "15.1M+ users" as compact trust chips under the hero.
- **Roadmap chrome**: Step 1 Acing the Permit → Step 2 Mastering the Road → Step 3 Getting Your License — the product is a path with stages, each stage a card.
- Big rounded surfaces, generous spacing, one strong accent color per screen, app-store badges as the primary CTA. Everything is a card; nothing is a bare paragraph.

**Adapted into permitdrills (our version, not a clone):**
| Incumbent pattern | Our adaptation |
|---|---|
| Live correct/incorrect counters + miss budget | Practice toolbar shows running 答对 count; exam toolbar shows answered/total + countdown chip (turns red and pulses under 60 s) |
| Mistake-moment toast | The feedback panel itself is the moment: correct → green pulse ring + pop-in ✓ badge; wrong → shake + ✕ badge + red panel with the correct answer and the handbook citation (our Challenge-Bank equivalent arrives with Premium 错题本， waitlist already captures intent) |
| Sourcing line on the quiz | Every explanation ends with 出处： section + official-handbook link — per question, stronger than a page-level line |
| Score-distribution / stat viz | Exam report: animated SVG score ring (fills to your %, green/red vs the official mark), per-topic breakdown table with % column |
| Journey/stage cards | State hub is a staged path: official-format card → Practice / Simulator entry cards → six topic cards with counts |
| "Last verified" stamps | Per-state currency lines ("数据截至 October 2026", handbook edition on the hub) + methodology page per-state source table |
| Zutobi icon-led tiles | Home "怎么练" three tiles with numbered markers; topic cards carry icons |
| One accent, big rounded cards | Amber reserved for CTAs, progress, and the brand diamond; 16 px radius cards; navy = structure |

Deliberately NOT copied: DTO's pass-guarantee/review-wall social proof (we have no users yet — inventing testimonials would be fabrication), Zutobi's video/app surfaces (out of factory scope), any "questions nearly identical" vocabulary (banned by our legality rules — DTO's own headline claims it; we never will).

## 2. Logo — "the Drill Diamond"

Concept: the two things this site is, fused into one mark. A US **warning-sign plate** — the amber diamond every American learner must recognize — carrying a bold **check**: the sign says *pay attention*, the check says *you got it right*. The check's rising arm carries two small amber dashes cut into the navy stroke — a road centreline inside the check, visible at display sizes. It is drawn as original SVG (`public/logo.svg`); the favicon (`public/favicon.svg`) is a simplified cut — thicker plate edge, bolder check, no dash detail — that stays legible at 16 px. The diamond also echoes the site's own sign library (same visual family as our SVG road signs). Lockup: mark left, "PermitDrills" in bold navy/white + "驾考刷题 · 中英双语练习" beneath. A secondary brand motif, the **roadline** (navy bar with a dashed amber centreline), appears under the home hero and on the Premium surface — a road, used as a rule line.

## 3. Component inventory — as shipped (design pass, 2026-10-25)

All tokens centralized as CSS custom properties in `src/layouts/Base.astro` (`--navy/--amber/--paper/--good/--bad/--radius/--shadow/--shadow-lg/--ring/--ease/--dur` …); components isolated (Base layout, Sign, SignBank, quiz.js renderers).

- **Answer options** — full state set: default (key chip A–D outlined), hover (lift, navy border, chip fills navy), picked/exam (navy tint + amber focus ring + filled chip), correct (green wash, chip fills green, pop-in ✓ badge, one-shot pulse ring), wrong (red wash, chip fills red, pop-in ✕ badge, 0.45 s shake), disabled-unpicked (dimmed). 180 ms ease transitions on border/background/transform/shadow.
- **Feedback panel** — slides/fades in (pd-in), 5 px state-colored left bar (navy/green/red), explanation + correct-answer line + per-question source citation.
- **Progress bar** — gradient amber fill, width transitions 0.45 s between questions; inset track shadow.
- **Question card** — every render enters with an 8 px rise + fade (0.28 s), so practice ↔ exam ↔ report transitions read as motion, not page swaps.
- **ZH/EN toggle** — pill segmented control; active segment is a navy pill with shadow; switching re-renders in place and persists (localStorage).
- **Exam chrome** — toolbar chips (timer with tabular numerals; ≤60 s turns red + blinking), answered counter; question-grid nav dots as real components (default / answered = amber wash / current = navy ring), prev/next/submit with the global button state set.
- **Score report** — SVG score ring animating to the result (green, or red when below a published pass mark), verdict chip with pop-in, per-topic breakdown table with hover rows, Premium upsell card (navy gradient) docked under the score.
- **Buttons** — hover lift + shadow, active press (translate + scale .99), amber variant glow, ghost variant tint, disabled dim; global `:focus-visible` amber outline.
- **State cards / topic cards** — hover lift + deep shadow + amber top-edge sweep (scaleX), chips for exam format and question counts.
- **Sign plate** — sign SVGs sit on the page with a soft drop shadow, reading as physical plates.
- **Header** — Drill Diamond mark with drop shadow; nav links with hover wash; amber Premium CTA with hover lift/glow.
- **Study (topic) pages** — correct option rendered as a green "answer row" (wash + inset bar); bilingual Q&A with source line per question.
- **Motion discipline** — animations exist only at: answering (pulse/shake/badges), feedback entry, card transitions, ring fill, verdict pop, timer warning. `prefers-reduced-motion` collapses all of it.

## 4. Known weakest spots (for the factory playbook QA pass)

1. **Sign pictograms are schematic.** The deer and pedestrian glyphs in `Sign.astro` are simple line drawings — correct shapes/colors, but the crudest artwork on the site. A playbook-grade pass should redraw the pictogram set.
2. **No dark mode.** Tokens make it feasible; not attempted.
3. **Topic study pages are long flat lists** (up to ~30 questions) — no sticky mini-nav, collapse, or "back to top". Functional, not delightful.
4. **Quiz column is single at all widths** (max 1020 px). Incumbents use the desktop width for a side rail (progress summary / upsell). Our desktop quiz could take a two-column treatment.
5. **Zero photography/illustration by design** (no stock, no invented people) — the brand rests on type, the diamond, and the roadline. If the playbook wants a hero visual, it should be a designed graphic (e.g. a composed sign cluster), never a photo.
6. **Premium page form is a mailto fake-door** (by design for the Day-90 CTR test) — visually finished, mechanically minimal.
7. **Language toggle re-renders the whole quiz root** — a beat of flicker on slow phones; a surgical text-swap would be smoother.
8. **The header wordmark is text, not outlined type** — fine at current sizes; a future lockup could draw "PermitDrills" as part of the SVG for pixel-exact brand control.
