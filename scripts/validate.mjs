// Validate question banks before build: schema, bilingual completeness,
// per-question sourcing, banned vocabulary, sign ids, exam block.
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const qdir = join(root, 'src/data/questions');
const SIGN_IDS = new Set([
  'stop', 'yield', 'do-not-enter', 'wrong-way', 'one-way', 'speed-limit', 'no-left-turn',
  'no-u-turn', 'no-parking', 'pedestrian-crossing', 'school-crossing', 'railroad-crossing',
  'railroad-ahead', 'curve-ahead', 'sharp-turn', 'slippery', 'merge', 'two-way-traffic',
  'divided-highway', 'signal-ahead', 'stop-ahead', 'deer-crossing', 'construction',
  'bicycle', 'lane-ends', 'roundabout-ahead',
]);
const TOPICS = new Set(['signs', 'rules', 'safety', 'sharing', 'alcohol', 'licensing']);
const BANNED = [
  'real questions', 'actual exam question', 'actual test question', 'cheat sheet', 'crib sheet',
  'leaked', '真实考题', '原题', '泄题', '题库原题', '真题',
];
const CJK = /[\u4e00-\u9fff]/;

let errors = 0, warnings = 0;
const err = (m) => { console.error('ERROR', m); errors++; };
const warn = (m) => { console.warn('WARN', m); warnings++; };

for (const file of readdirSync(qdir).filter((f) => f.endsWith('.json'))) {
  const bank = JSON.parse(readFileSync(join(qdir, file), 'utf8'));
  const slug = file.replace('.json', '');
  if (!bank.exam || !bank.exam.handbook || !bank.exam.handbook.url) err(`${slug}: missing exam.handbook`);
  if (!bank.exam || !bank.exam.questions) err(`${slug}: missing exam.questions`);
  const qs = bank.questions || [];
  if (qs.length < 120) warn(`${slug}: only ${qs.length} questions (<120 target)`);
  const ids = new Set();
  for (const q of qs) {
    const at = `${slug}/${q.id || '?'}`;
    if (!q.id || ids.has(q.id)) err(`${at}: missing/duplicate id`);
    ids.add(q.id);
    if (!TOPICS.has(q.topic)) err(`${at}: bad topic ${q.topic}`);
    for (const lang of ['en', 'zh']) {
      if (!q.q?.[lang]) err(`${at}: missing q.${lang}`);
      if (!q.explanation?.[lang]) err(`${at}: missing explanation.${lang}`);
      if (!Array.isArray(q.options?.[lang]) || q.options[lang].length < 3 || q.options[lang].length > 4)
        err(`${at}: options.${lang} must have 3–4 entries`);
    }
    if (q.options?.en?.length !== q.options?.zh?.length) err(`${at}: en/zh option counts differ`);
    if (!(q.answer >= 0 && q.answer < (q.options?.en?.length || 0))) err(`${at}: answer index out of range`);
    if (q.q?.zh && !CJK.test(q.q.zh)) err(`${at}: q.zh has no Chinese characters`);
    if (q.explanation?.zh && !CJK.test(q.explanation.zh)) err(`${at}: explanation.zh has no Chinese characters`);
    if (!q.source?.section || !q.source?.url) err(`${at}: missing source section/url`);
    else if (!/^https:\/\//.test(q.source.url)) err(`${at}: source.url not https`);
    if (q.sign != null && !SIGN_IDS.has(q.sign)) err(`${at}: unknown sign id ${q.sign}`);
    const blob = JSON.stringify(q).toLowerCase();
    for (const b of BANNED) if (blob.includes(b)) err(`${at}: banned vocabulary "${b}"`);
  }
  const signCount = qs.filter((q) => q.sign).length;
  console.log(`${slug}: ${qs.length} questions, ${signCount} with signs`);
}
if (errors) { console.error(`\n${errors} error(s), ${warnings} warning(s) — build blocked`); process.exit(1); }
console.log(`Validation OK (${warnings} warning(s))`);
