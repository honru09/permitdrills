# New Jersey — Source Log

Per BUILD.md §3 rule 9. This log is the evidence of the facts-only process for this state.

## Handbook

- Title: New Jersey Driver Manual
- Edition (as listed by MVC): Revised 09/25
- Edition note from the files themselves: the PDFs currently served from the MVC manuals page carry a 2026 cover year; interior pages of the English PDF are marked "Revised 4/2026" and the back page carries the printing code "R0726". The MVC listing label (below) still reads "Revised 09/25". Both are recorded here so the discrepancy is on the record; the bank's `edition` field uses the MVC listing label, per the build spec.
- Manuals page (official): https://www.nj.gov/mvc/about/manuals.htm
- Listing page confirming the edition label (official): https://www.nj.gov/mvc/license/firstlic.htm — lists "New Jersey Driver Manual English (Revised 09/25, pdf)" and "New Jersey Driver Manual Chinese (Revised 09/25, pdf)".
- English manual PDF (official, direct): https://www.nj.gov/mvc/pdf/license/drivermanual.pdf (243 pages; primary fact source)
- Chinese manual PDF (official, direct): https://www.nj.gov/mvc/pdf/license/chinesemanual.pdf (243 pages; Simplified Chinese; used as a fact cross-check only — no text was translated or adapted from it)
- Date accessed: 2026-10-25

## The manual's own notice wording (front matter)

The English manual carries no © / copyright line in its front or back matter (full-text search of the extracted PDF, 2026-10-25; the only "All rights reserved" line in the book attaches to a single photo credit). The front-matter notice wording the manual does carry, quoted here and nowhere else in this repo, is:

> "The information contained in this manual should be used as a general guide to the rules of driving a motor vehicle but not as a substitute for the actual laws. If there is a discrepancy between what is cited in this manual and what is in statute or regulation, the statute or regulation governs. This manual is not a legal reference for New Jersey motor vehicle and traffic laws."
>
> "This MVC Driver Manual is available at no cost."

Chapter 1 also repeats a one-line version of the same disclaimer ("If there is a discrepancy between what is cited throughout this manual and what is in statute or regulation, the statute or regulation governs.").

## Official sample test

- Sample knowledge test (official, English only): https://www.nj.gov/mvc/license/sample_knowledge_test.htm
- Use made of it: format and coverage study only. No question, ordering, or distractor set was copied, adapted, or translated.

## Exam format (official sources)

- Format: 50 questions; passing score 80 percent = 40 of 50 correct.
  - Source 1: MVC sample knowledge test page (above) — states the 50-question / 80% / 40-correct format for an actual general knowledge exam at an MVC testing center.
  - Source 2: New Jersey Driver Manual, Chapter 2, "New Jersey Driver Testing" — knowledge test of 50 questions (plus an organ-donation survey question); test-requirements table states 80 percent, or 40 of the 50 questions, must be answered correctly.
- Time limit: no official time limit is published on the MVC pages or in the manual; the bank records `timeMinutes: null` and asserts none.
- Chinese test availability: "Chinese (Mandarin)" — MVC Knowledge Test page, "Foreign language options": https://www.nj.gov/mvc/license/knowledgetest.htm (also listed in Manual Chapter 2).

## Process confirmation

- All questions in `site/src/data/questions/new-jersey.json` were authored from the fact sheet `facts/new-jersey.md` only.
- The fact sheet contains facts (rules, numbers, exceptions, sign meanings, procedures) tagged by manual chapter/section, and no handbook sentences.
- English questions were written first, as original scenarios with original distractors; the Simplified Chinese text is our own translation of our own English text. No handbook passage and no official sample question was translated or adapted.
- Every number used in a question (limits, distances, ages, fines, points) traces to a line in the fact sheet. Facts the manual does not state (e.g., a registration age, an exam time limit) are not tested.
