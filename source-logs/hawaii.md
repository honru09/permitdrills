# Source Log — Hawaii (HI)

Built: 2026-10-25. Builder pass for permitdrills.com, per BUILD.md §3 (14 legality rules) and §6 pipeline.

## Handbook (primary fact source)

- **Title:** Hawaii Driver's Manual (cover: "State of Hawaii Driver's Manual" / Hawaii State Driver's Manual)
- **Edition used:** English edition, copyright 2023, printed "HMG 5/2023" (Hagadone Media Group-Hawaii, for the Director of Transportation, State of Hawaii). Cover price $7.49.
- **Official English PDF (HDOT):** https://hidot.hawaii.gov/highways/files/2024/11/2023-Hawaii-Drivers-Manual_5.375x8.375_Final-r3-Digital-071924web.pdf
- **Official library page (all language editions):** https://hidot.hawaii.gov/highways/library/motor-vehicle-safety-office/ — re-checked 2026-10-25; English, Chinese Simplified and Chinese Traditional manuals are all linked from this HDOT page.
- **Official Simplified Chinese PDF (cross-check only):** https://hidot.hawaii.gov/highways/files/2021/11/CHINESE-SIMPLIFIED-Hawaii-Drivers-Manual.pdf — a 2021 printing of an earlier edition (cover price $5.20); used only to cross-check facts (e.g. the under-4 child-restraint rule agrees in both editions), never as a text source.
- **Date accessed:** 2026-10-25.

## Handbook copyright wording (notice wording only, as permitted by rule 9)

> "(c) Copyright 1977, 2006, 2018, 2020,2023 Director of Transportation, State of Hawaii No part of this manual may be reproduced in any form without the written permission of the Director of Transportation of the State of Hawaii."

Position taken: the manual's prose is claimed; the facts in it (limits, distances, procedures, sign meanings) are not. This bank was built facts-only (see below), so no manual material is reproduced anywhere in the deliverables.

## Exam format (official sources)

- **Questions:** 30, multiple choice. **Time limit:** 60 minutes (one hour). Source: City & County of Honolulu, Department of Customer Services, "Online Learner's Permit Test" — https://www.honolulu.gov/csd/online-permit-test/ (states the 30-question test, English/Spanish online, one-hour limit; re-checked 2026-10-25). The same page notes the in-person written test remains available at county driver licensing centers.
- **Test languages (in person):** 14 languages including English, Hawaiian, Simplified Chinese and Traditional Chinese — HDOT releases of 2015-07-16 and 2021-11-03 (see prelaunch part-b). The Chinese test is the in-person, county-administered test; the newer online test is English/Spanish only.
- **Pass mark: OPEN.** No official county or HDOT page found on 2026-10-25 states the number or percentage of correct answers required to pass the Class 3 (car) knowledge test. Pages checked: Honolulu CSD online-permit-test page and GDL page; Maui County instructional-permit pages; Kauai County instructional-permits page; Hawaii County VRL pages; HDOT MVSO library page. Hawaii Administrative Rules §19-122-11 states an 80% pass level, but only for the CDL hazardous-materials renewal knowledge test — a different examination — so it was **not** used. Third-party sites claim 24/30 (80%) and at least one claims 25/30; per build instructions, no third-party claim was used. The bank therefore records `passCorrect: null` and `passPercent: null`, and the site shows the score without asserting an official pass mark.
- Retest note (official, Honolulu online test): a failed applicant must wait seven (7) days before retaking; the online test may be taken at most twice in one day.

## Appendix close call (legality — decided in advance, applied with full force)

The Hawaii manual embeds a Q&A appendix ("Complete Test Questions and Answers" / "General Test Questions", from manual p. 99; the Chinese editions carry the same feature). **Rule 4 applies with full force: no appendix question was copied, translated, or mirrored — not one.** Working method used to enforce this:

- Facts were extracted **only from the manual body (Chapters I–XIII and the Definitions pages)**. In the extraction pass, the PDF text was truncated before the appendix (appendix = PDF pages 100–127 of the English PDF); appendix pages were never part of the working text from which the fact sheet was written.
- The appendix was used for exactly one thing: as a signal of **which facts the state emphasises**. Every question in this bank that touches such a fact was authored wholly originally — new stem, new scenario, new distractors, new explanation — from the fact sheet line for that fact.

## Process confirmation

- All 139 questions in `site/src/data/questions/hawaii.json` were authored from `facts/hawaii.md` only (facts-only bridge, rule 1). English first; the Simplified Chinese in each question is my own translation of my own English (rule 3). No handbook sentence appears in any question, option, or explanation; explanations cite the manual chapter/section instead of quoting (rule 13).
- Every number tested was traced back to a fact-sheet line during the self-check pass. Where the manual does not state a number (e.g. no numeric residential speed limit, no headlight-dimming distance), no question tests one.
- Sign images: none taken from the manual. The `sign` field references the site's own MUTCD-based SVG components only (rule 11).
- Banned vocabulary check: no instance of the banned terms (either language) anywhere in the bank, the fact sheet, or this log's question text.

## Currency

Bank dated "based on the 2023 Hawaii Driver's Manual — current as of October 2026" (the 2023 English edition is the current HDOT-posted edition as of access date; the Chinese edition posted is the 2021 printing).
