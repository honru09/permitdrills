# Source Log — Maryland (MD)

- Access date: 2026-10-25
- Manual title: Maryland Driver's Manual
- Form / edition: DL-002, October 2026 Edition (cover imprint DL-002 (10-26); an inner cover line also shows DL-002 (05-23))
- Publisher: Maryland Department of Transportation, Motor Vehicle Administration (MDOT MVA)

## Official URLs

- Manuals index page: https://mva.maryland.gov/Pages/Maryland-Drivers-Manual.aspx
- English manual PDF (DL-002, primary fact source): https://mva.maryland.gov/media/148
- Chinese manual PDF (DL-002, Traditional Chinese only; fact cross-check only): https://mva.maryland.gov/media/134
  - Chinese PDF imprint: DL-002, December 2026 Edition (DL-002 (12-26)). Characters are Traditional Chinese. No Simplified-Chinese edition is listed on the manuals page.
- Knowledge Tests page: https://mva.maryland.gov/licenses-ids/prepare-drivers-license-test/knowledge-tests
- Online Driver Test Tutorial page: https://mva.maryland.gov/your-mva-guide/teens-new-drivers/learners-permit/learners-permit-practice-tests
- Accessibility & Accommodations page (test-language list): https://mva.maryland.gov/appointments-online-services/accessibility-accommodations

## Manual / state copyright wording (notice wording only, quoted)

- English manual, copyright page: "Copyright © Maryland Motor Vehicle Administration, 2026 All rights reserved. The Maryland Department of Transportation, Motor Vehicle Administration (MDOT/MVA) owns the copyright to this work. No part of this book may be reproduced or transmitted in any form or by any means, electronic or mechanical, including photocopying, recording, or by any information storage and retrieval system without express written permission from the MDOT/MVA."
- English manual, copyright page (second paragraph, notice part only): "All content may be used for free and is intended for the study of the Maryland Vehicle Law. Any unauthorized reprint, use, distribution, or sale of this material is prohibited."
- MVA web pages (manuals page, Knowledge Tests page, tutorial page, accessibility page) footer: "© 2026 State of Maryland. All rights reserved."

## Test language (official)

- Accessibility & Accommodations page, "Foreign language services" section: the Non-Commercial Class C test is available in "Chinese (Traditional)" (verbatim list entry), among 17 languages.
- Same page: if MVA offers the knowledge test in the applicant's language, the applicant must attempt the knowledge test at least three (3) times before an interpreter can be used.

## Exam format — per-figure sources

- Question count: 25 questions — PINNED, two official sources:
  1. Manual, Section 1.B (Knowledge Test): the knowledge test has 25 questions.
  2. Tutorial page: each practice test has 25 questions, stated to be the same number as the real knowledge test.
- Time limit: 20 minutes — PINNED for the real test from the Manual, Section 1.B, which states the test-taker has 20 minutes to take the (real) knowledge test. Corroborated for the tutorial's timed version by the tutorial page ("practice finishing within 20 minutes"). Recorded as `timeMinutes: 20`, sourced to the manual.
- Pass mark: OPEN — NOT pinned for the Class C test.
  - The Knowledge Tests page states only that the test has a time limit and that the applicant "must get a minimum percentage of correct answers to pass" — no number or percentage is given.
  - The Manual (October 2026 Edition) states no pass mark.
  - The widely repeated figure of 22 of 25 (88%) appears on an official MVA page only for the Class M motorcycle knowledge test (Motorcycle Training & Education page), which is a different test. It was therefore NOT carried over to Class C.
  - Result: `passCorrect: null`, `passPercent: null` in the data file. The simulator must show the score without asserting an official Class C pass mark until an official Class C source states one.
- Retake: Knowledge Tests page — an applicant who fails may retake the knowledge test the next day.
- Test content source: Knowledge Tests page — the knowledge test questions come from the Maryland Driver's Manual; the test covers Maryland traffic laws, road signs, and safe driving rules, and is multiple-choice.

## Official sample questions — handling

- The MVA Online Driver Test Tutorial was reviewed for format and topic coverage only. No tutorial question was copied, adapted, translated, or mirrored question-for-question (BUILD.md §3 rule 4). No reuse licence for the tutorial questions appears on the tutorial page; the only rights statement on that page is the State of Maryland "all rights reserved" footer noted above.

## Process confirmation

- Questions in `maryland.json` were authored from the fact sheet only (`facts/maryland.md`), which contains facts (rule / number / exception / sign meaning / procedure) tagged by manual section, with no manual sentences copied.
- All question stems, scenarios, distractors, and explanations are original English writing. The Simplified Chinese is our own translation of our own English originals. The Traditional-Chinese official manual was used as a fact cross-check only; none of its sentences were converted or adapted.
- Every number tested in the bank traces to the fact sheet. Facts the manual does not state were not tested (see the OPEN / not-stated notes at the end of the fact sheet).
