# permitdrills.com — Build Doc

Status: build authorized 2026-10-25 (user order: all factory sites built NOW, in parallel). This doc exists before any code, per factory rules.
Sources: `../../FINAL-V3-2026-10-25.md` 赛道 3, `../../prelaunch/permit-prelaunch.md` (gate: PASS, qualified), `../../prelaunch/permit-deepening.md` + `permit-deepening-parts/` (corrected state list, 14 legality rules in part-d, promotion recon in part-e), `../../prelaunch/external-claims-verification.md` (drive_ready methodology), `../../CHARTER.md` (benchmark standard).

## 1. Product in one line

US learner's-permit written-test practice whose wedge is **Simplified-Chinese bilingual practice** — 中文讲解 + 中英题面一键切换 — for the states where the official test itself is offered in Chinese. English is the second face of the same bank, never the lead.

## 2. Launch states — chosen from the confirmed six, and why

Primary-source-confirmed Chinese-test states (permit-deepening.md §0): **NY, NJ, MA, WA, HI, MD**.

**Launch set (5): NJ, MA, WA, HI, MD.** All five have an **official Chinese driver handbook** — the cheapest, highest-fidelity fact source for the bank pipeline (facts can be cross-checked in both languages at extraction time):

| State | Chinese test (primary) | Official Chinese handbook | Real exam format (official source; re-verified at extraction) |
|---|---|---|---|
| NJ | "Chinese (Mandarin)" — nj.gov/mvc | YES — NJ Driver Manual (Chinese), Revised 09/25 | 50 questions, 80% to pass (40/50) — MVC sample-test page |
| MA | "Mandarin (Simplified), Mandarin (Traditional)" — mass.gov | YES — BOTH scripts (Simplified PDF is our script) | 25 questions, 18 to pass, 25 minutes — RMV |
| WA | 简体中文 + 繁體中文 — dol.wa.gov | YES — Driver Guide, BOTH scripts | 40 questions, 32 to pass — DOL |
| HI | Both scripts, in-person — hidot.hawaii.gov | YES — BOTH scripts (HDOT PDFs, 2021) | 30 questions, 1-hour limit — county/HDOT (pass mark to be pinned at extraction; if no official figure is found, the simulator shows the score without asserting an official pass mark) |
| MD | "Chinese (Traditional)" — mva.maryland.gov | YES — Traditional only (DL-002) | 25 questions (= real test), timed 20 minutes — MVA tutorial page (pass mark to be pinned at extraction) |

**Excluded from launch: NY.** NY's test is confirmed in Chinese, but NY publishes **no Chinese handbook** (MV-21 is EN/ES only) — the fact supply chain would run English-only, the slowest and most error-prone of the six, and NY is the one confirmed state where a bilingual sample-PDF lead magnet (nyjiazhao.com) already exists. NY is phase 2, first in queue. CA is *not* in the confirmed six on primary evidence (operationally near-certain, formally partial) and its handbook carries a CC BY-NC flag — also phase 2, after a primary confirmation.

**Bridge states (TX, FL, NV) are phase 2 only** — "learn in Chinese, test in English" — and only if this core build is complete and solid. No bridge content ships in this build.

## 3. Legality — the 14 rules are build constraints, not guidelines

Full text: `permit-deepening-parts/part-d-legality.md` §5. The load-bearing ones, restated for builders:

1. **Facts in, prose out.** Per state, the ONLY bridge between handbook and bank is a fact sheet (`facts/<state>.md`): rule, number, exception, sign meaning, procedure. **No handbook sentences in any working file.** No verbatim handbook text anywhere in the repo except short functional phrases (a limit, a sign name) and the copyright-notice wording recorded in the source log.
2. **Original questions only.** New stem, new scenario, new distractors, own explanation — English first, from the fact sheet.
3. **Chinese = translation of OUR English only.** Never translate/adapt handbook passages or official sample questions.
4. **Official samples: study, never republish.** No sample set imported verbatim, in order, or question-for-question, in either language.
5. **Never source from test-takers.** No recall posts, no "questions I got", no purchased banks.
6. **Vocabulary ban (both languages, site + metadata + copy):** "real questions", "actual exam questions", "leaked", "cheat sheet", 真实考题，原题，泄题，题库原题. Approved: "based on the [year] official [State] Driver Handbook", "original practice questions", 原创练习题，根据官方手册编写.
7. **Not-affiliated disclaimer everywhere it matters** (footer every page + terms page, driving-tests.org form): privately owned; not affiliated with or endorsed by any DMV/state agency; original practice questions for study only; you will not see the same exact questions on the official exam; the state handbook and state law are the final authority. Mirrored in Chinese.
8. **No state/agency branding.** State names used nominatively only ("New Jersey permit practice test"); no DMV/MVA/DOL logos, seals, or trade dress anywhere, including favicon/OG.
9. **Per-state source log** (`source-logs/<state>.md`): handbook title + edition + official URL + date accessed; the handbook's own copyright/licence wording; official sample-test URL; confirmation that questions were written from the fact sheet. This log is the evidence of the facts-only process.
10. **Commercial caution (CA/WA pattern):** because WA's guide bars commercial use of its *material* without consent, our defence is that we copied no material at all — rules 1–3 are what make that true. No handbook text quoted in study notes/SEO copy either; summarise in original words, link to the official handbook.
11. **Sign images:** our own SVG renderings from MUTCD / FHWA Standard Highway Signs designs (public domain). Never extract images from handbook PDFs. Interstate Shield and other FHWA-owned items: no branding use; in-question identification use kept minimal/factual (flagged OPEN in part-d §6).
12. **Currency discipline:** every state bank is dated ("based on the 2026 [State] handbook — current as of October 2026" style line, with the true edition year per state).
13. **Explanations cite, never quote:** each explanation ends with a pointer — handbook chapter/section (+ statute cite where the fact sheet has one) — not a quotation.
14. **Our bank is our copyright:** © permitdrills.com on our original questions/explanations/translations/artwork; git history shows independent authorship from fact sheets.

Methodology standard: drive_ready's SOURCE-VERIFICATION flow (official source → extract facts → author original → verify against source → record sourceTitle/Url/Section/lastVerified per question). Its code and questions are NO-LICENSE — methodology only, nothing copied.

## 4. Benchmark — Copy / Beat (CHARTER standard)

Incumbent study: permit-deepening.md, part-d §3 (incumbent language, fetched verbatim), prelaunch §5.

**Copy as-is:**
- driving-tests.org page anatomy per state: free practice tests first, exam simulator with the state's exact format and passing score, per-test instant grading with explanations.
- driving-tests.org trust language pattern: not-affiliated up front (terms + page chrome), "based on your state's official manual", express no-same-questions representation, manual/laws = final authority.
- Zutobi product feel: short structured flow, progress feeling, simulator "matches your state's format and passing score" as a *format* claim (allowed — it is about format, not question identity).
- dmv-written-test.com's one good habit: currency dating on every state ("based on the 2026 … manual; data current as of …").

**Beat them here:**
- **Chinese bilingual, done properly:** incumbents offer EN/ES/RU only (driving-tests.org Premium page, primary-confirmed). We ship Simplified-Chinese-first UI with per-question ZH/EN toggle — the toggle itself is the bridge mechanic for TX/FL-style learners later. WA/NJ Chinese SERPs today contain *zero* Chinese practice content.
- **Per-question sourcing shown on the page:** every question displays its handbook section + official handbook link (drive_ready methodology, surfaced). Incumbents assert sourcing in prose; nobody shows it per question.
- **Price umbrella:** Premium fake-door at **$16.99 lifetime** (dmv-permit-test's proven price point) under driving-tests.org's $29/week — one payment, forever, bilingual included.
- **Honest pass framing:** score reports say "练习成绩" vs the state's official pass mark, never a pass guarantee.

## 5. Site architecture

Astro 5 static, mirroring visafreely: `site: https://permitdrills.com`, `trailingSlash: 'always'`, `@astrojs/sitemap`, `public/CNAME` = `permitdrills.com`, GitHub Actions `withastro/action` → `actions/deploy-pages`. Repo: `honru09/permitdrills` (site root = repo root). Local: `~/workspace/opportunity-factory/sites/permitdrills/site/`.

Pages:
- `/` — bilingual home: what this is, state picker (5 launch states with exam-format chips), how it works （根据官方手册自编题/逐题出处/中英切换）, methodology teaser, Premium fake-door strip.
- `/<state>/` — state hub: official exam facts (count / pass mark / time limit / handbook edition + official handbook link / Chinese test availability), topic map with question counts, Practice + Exam Simulator entry cards, currency line.
- `/<state>/practice/` — practice mode (client-side app over the state JSON): pick topic or all; one question at a time; instant right/wrong + explanation + handbook-section link; per-question ZH/EN toggle; session progress; topic progress saved in localStorage.
- `/<state>/exam/` — exam simulator: state-realistic count/pass/time, countdown, no feedback until the end, score report (score vs official pass mark, per-topic breakdown, full review with explanations), Premium upsell on the report.
- `/<state>/topics/<topic>/` — static study page per topic: every question in the topic rendered with answer + explanation (study-notes format, crawlable), each citing its handbook section. This is the SEO surface.
- `/methodology/` — how the bank is built (facts-only pipeline, per-question sourcing, currency discipline), per-state source summary + links to official handbooks.
- `/premium/` — fake-door: what Premium will include, $16.99 lifetime anchor, email waitlist capture (static form, mailto fallback; no payment, no fake checkout, copy says 即将推出 / coming soon — honest door).
- `/about/`, `/terms/` — identity + the §3.7 disclaimer in full, EN + ZH.

Data: one JSON per state in `src/data/questions/<state>.json`:
```json
{ "state": "nj", "exam": { "questions": 50, "passCorrect": 40, "timeMinutes": null,
  "handbook": {"title": "New Jersey Driver Manual", "edition": "Revised 09/25", "url": "…", "chineseUrl": "…"},
  "currentAsOf": "October 2026" },
  "questions": [ { "id": "nj-001", "topic": "signs",
    "q": {"en": "…", "zh": "…"}, "options": {"en": ["…"], "zh": ["…"]}, "answer": 0,
    "explanation": {"en": "…", "zh": "…"},
    "source": {"section": "…", "url": "…"}, "sign": "stop" | null } ] }
```
Topics (fixed enum): `signs` 交通标志， `rules` 交规与路权， `safety` 安全驾驶， `sharing` 共享道路（行人/自行车/校车/应急车辆）, `alcohol` 酒驾与药物， `licensing` 驾照与车辆手续. Question counts per state: **≥120**, distributed across topics with signs ≥ 20 (sign questions use our SVG sign components via the `sign` field).

Client app: one shared vanilla-JS quiz engine (`public/quiz.js` or bundled via Astro), state JSON inlined/fetched per page; no account, no server; progress in localStorage only.

Design/brand: wordmark **PermitDrills** + 中文名 **驾考刷题**; palette — asphalt navy `#0F2040`, signal amber `#FFB800` (warning-sign yellow), paper `#F7F5F0`, success green / danger red for feedback; system font stack (CJK-safe); big tap targets, mobile-first (audience is phone-first), cards with soft radius, sign-yellow accents. Feels like Zutobi-grade product UI, not a question dump.

## 6. Question production pipeline (per state)

1. Fetch the state's current official handbook (English; Chinese edition as cross-check where it exists) + official exam-format page. Record everything in `source-logs/<state>.md` **including the handbook's copyright wording**.
2. Extract `facts/<state>.md` — facts only (rule / number / exception / sign meaning / procedure), each tagged with handbook section. No prose.
3. Author ≥120 original EN questions from the fact sheet; every question carries `source.section` + handbook URL; state-specific numbers ONLY from this state's fact sheet.
4. Translate each question/options/explanation into Simplified Chinese (our own translation of our own text). MD note: official handbook is Traditional-only — our Simplified text is our own translation of our English originals; the Traditional handbook serves as a fact cross-check only.
5. Self-check pass: every number in every question traced to the fact sheet; no banned vocabulary; no question mirroring an official sample question's stem/distractors.

## 7. NOT in this build (report as pending)

- Spaceship DNS for permitdrills.com (user TOTP — main agent batches it), GSC/Bing (after DNS).
- IndexNow: key file IS generated into `public/` in this build + `INDEXNOW.md` (key + starter URL list) saved in this workspace; submission happens after DNS.
- NY + CA phase-2 states; TX/FL/NV bridge content; Chinese CDL; real payments; analytics wiring.

## 8. Pre-registered kill lines (copied from FINAL-V3 — do not move)

- Day 30 (post-launch): five-state GSC impressions combined < 1,000 → no state expansion.
- Day 90: clicks < 1,500/month AND Premium fake-door paid-intent CTR < 0.5% → kill.
- Build red line: any state whose bank cannot be traced fact-by-fact to its official handbook does not ship; a state short of 120 solid questions ships fewer and says so — never pad with invented facts.
