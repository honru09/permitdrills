# Massachusetts — Source Log

Per BUILD.md §3 rule 9 / part-d §5 rule 9. This log is the evidence of the facts-only process for this state.

## Handbook worked from

- **Title:** Massachusetts Driver's Manual (title as used on the official manuals list and in the manual itself; cover line: "Sharing the Road — A User's Manual for Public Ways")
- **Edition:** Revised April 2026 (edition line printed in the manual's front matter: "Revised April 2026")
- **Publisher:** Registry of Motor Vehicles (RMV), Commonwealth of Massachusetts / MassDOT
- **Official English PDF URL:** https://www.mass.gov/doc/english-drivers-manual/download
- **Official manuals list (all language editions):** https://www.mass.gov/lists/drivers-manuals
  - English Driver's Manual — PDF 6.94 MB
  - Simplified Chinese Driver's Manual (简体中文) — PDF 6.02 MB, linked from the list above
  - Traditional Chinese Driver's Manual (繁體中文) — PDF 5.77 MB, linked from the list above
  - **OPEN:** the direct `/doc/…/download` slug for the Simplified Chinese PDF is not exposed in the text of the manuals list as fetched on 2026-10-25 (the list links the PDF without a readable slug in text form). The bank's `chineseUrl` therefore points to the official manuals list, which is the page that links the Simplified PDF. Do not replace it with a guessed slug.
- **Date accessed:** 2026-10-25
- **Cross-check:** the Simplified Chinese edition listed above is the script cross-check for this bank; all Chinese question text in the bank is our own translation of our own English originals (BUILD.md §3 rules 2–3), never a translation of handbook text.

## The manual's own notice wording (front matter)

The extracted text of the current manual contains **no © notice and no "all rights reserved" line** (searched the full text layer on 2026-10-25 — OPEN: a notice may exist in a graphical front-matter element not present in the text layer; none is asserted here). The front-matter notice the manual does print, quoted here only as the source log permits, is its status disclaimer:

> "This document is published by the Registry of Motor Vehicles (RMV), Commonwealth of Massachusetts, for the benefit of residents and visitors alike. While it contains a great deal of information about RMV policies and state laws, it is important to note that this is not a legal document."

## Exam format (official sources)

- **Format:** 25 multiple-choice questions; 18 correct to pass; 25-minute time limit.
  - RMV page "Apply for a passenger (Class D) learner's permit", mass.gov — https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit (accessed 2026-10-25): gives 25 minutes, 25 questions, 18 correct to pass.
  - Confirmed inside the manual itself, Chapter 1, "Learner's Permit Exam Procedures": 25 multiple-choice questions, 18 correct, 25 minutes.
- **Chinese test availability:** the same RMV page lists the exam languages including "Mandarin (Simplified), Mandarin (Traditional)"; the manual's Chapter 1 "Foreign Language Tests" section lists "Chinese (simplified) • Chinese (traditional)". Source: https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit and the manual above.
- **Official practice exams:** the RMV offers practice learner's permit exams through myRMV (portal: https://www.mass.gov/guides/first-time-driver-start-here). Used as a format reference only. **No official practice questions were copied, adapted, or translated** (BUILD.md §3 rule 4).

## Process confirmation

- Facts were extracted from the English manual into `facts/massachusetts.md` as one-fact-per-line compressed notation tagged by manual chapter/section. No handbook sentences were carried into the fact sheet or any other working file (the single exception is the notice wording quoted in this log, as rule 9 requires).
- All questions in `site/src/data/questions/massachusetts.json` were authored from that fact sheet only: original English stems, scenarios, distractors, and explanations, written for this bank; Simplified Chinese text is our own translation of our own English.
- Every number tested in a question traces to a line of the fact sheet. No questions were sourced from test-takers, recall posts, purchased banks, or third-party question sites.
- Bank currency line: current as of October 2026, based on the Revised April 2026 manual.
