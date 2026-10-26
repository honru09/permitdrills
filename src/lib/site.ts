// Shared site data: state metadata, topic enum, question-bank loading.
const bankModules = import.meta.glob('../data/questions/*.json', { eager: true });

export interface Question {
  id: string;
  topic: string;
  q: { en: string; zh: string };
  options: { en: string[]; zh: string[] };
  answer: number;
  explanation: { en: string; zh: string };
  source: { section: string; url: string };
  sign?: string | null;
}

export interface StateBank {
  state: string;
  exam: {
    questions: number;
    passCorrect: number | null;
    passPercent?: number | null;
    timeMinutes: number | null;
    handbook: { title: string; edition: string; url: string; chineseUrl?: string | null };
    currentAsOf: string;
  };
  questions: Question[];
}

export const TOPICS: Record<string, { en: string; zh: string; icon: string }> = {
  signs: { en: 'Road Signs', zh: '交通标志', icon: '🚸' },
  rules: { en: 'Rules & Right-of-Way', zh: '交规与路权', icon: '⚖️' },
  safety: { en: 'Safe Driving', zh: '安全驾驶', icon: '🛡️' },
  sharing: { en: 'Sharing the Road', zh: '共享道路', icon: '🚶' },
  alcohol: { en: 'Alcohol, Drugs & Penalties', zh: '酒驾、药物与处罚', icon: '🚫' },
  licensing: { en: 'Licensing & Your Vehicle', zh: '驾照与车辆手续', icon: '🪪' },
};

export const STATES: Record<
  string,
  { slug: string; code: string; nameEn: string; nameZh: string; agency: string }
> = {
  'new-jersey': { slug: 'new-jersey', code: 'NJ', nameEn: 'New Jersey', nameZh: '新泽西州', agency: 'NJ MVC' },
  massachusetts: { slug: 'massachusetts', code: 'MA', nameEn: 'Massachusetts', nameZh: '马萨诸塞州', agency: 'MA RMV' },
  washington: { slug: 'washington', code: 'WA', nameEn: 'Washington', nameZh: '华盛顿州', agency: 'WA DOL' },
  hawaii: { slug: 'hawaii', code: 'HI', nameEn: 'Hawaii', nameZh: '夏威夷州', agency: 'HI Counties / HDOT' },
  maryland: { slug: 'maryland', code: 'MD', nameEn: 'Maryland', nameZh: '马里兰州', agency: 'MDOT MVA' },
};

export function getBank(slug: string): StateBank | null {
  const key = `../data/questions/${slug}.json`;
  const mod: any = (bankModules as any)[key];
  if (!mod) return null;
  return (mod.default ?? mod) as StateBank;
}

export function allBanks(): { slug: string; bank: StateBank }[] {
  return Object.keys(STATES)
    .map((slug) => ({ slug, bank: getBank(slug) }))
    .filter((x) => x.bank) as { slug: string; bank: StateBank }[];
}

export function topicCounts(bank: StateBank): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const q of bank.questions) counts[q.topic] = (counts[q.topic] || 0) + 1;
  return counts;
}

/* Official exam-language labels per state, with script precision.
   Sources (workspace source-logs/<state>.md; NJ + MD re-verified live 2026-10-26):
   - NJ: MVC Knowledge Test page lists "Chinese (Mandarin)" — no script is
     stated for the test itself, so no script claim is printed for the exam.
     (The official Chinese handbook PDF is Simplified; that is a handbook
     fact, printed as such, not an exam claim.)
   - MA: RMV Class D page + manual Ch.1 list Mandarin (Simplified) and
     Mandarin (Traditional).
   - WA: DOL testing page lists 12 test languages incl. 简体中文 and
     Traditional Chinese.
   - HI: HDOT releases — the in-person county test is offered in 14 languages
     incl. Simplified and Traditional Chinese; the online test is EN/ES only.
   - MD: MVA Accessibility & Accommodations page lists the Non-Commercial
     Class C test in "Chinese (Traditional)" only. Our bank's Chinese is
     Simplified — the hub note says so plainly. */
export interface ExamLang {
  labelZh: string;
  labelEn: string;
  cardZh: string;
  noteZh?: string;
  noteEn?: string;
}
export const EXAM_LANG: Record<string, ExamLang> = {
  'new-jersey': {
    labelZh: '官方考试语言：中文（普通话）',
    labelEn: 'Official test language: Chinese (Mandarin)',
    cardZh: '考试语言：中文（普通话）',
    noteZh: '官方中文版手册为简体中文；考试用字以 MVC 公布为准。',
    noteEn: 'The official Chinese handbook is in Simplified Chinese; the MVC does not state a script for the test itself.',
  },
  massachusetts: {
    labelZh: '官方考试语言：简体中文、繁体中文',
    labelEn: 'Official test languages: Simplified Chinese, Traditional Chinese',
    cardZh: '考试语言：简体 + 繁体中文',
  },
  washington: {
    labelZh: '官方考试语言：简体中文、繁体中文',
    labelEn: 'Official test languages: Simplified Chinese, Traditional Chinese',
    cardZh: '考试语言：简体 + 繁体中文',
  },
  hawaii: {
    labelZh: '官方考试语言：简体中文、繁体中文（现场考试；在线考试只有英文和西班牙文）',
    labelEn: 'Official test languages: Simplified and Traditional Chinese (in-person test; the online test is English/Spanish only)',
    cardZh: '考试语言：简体 + 繁体中文（现场）',
  },
  maryland: {
    labelZh: '官方考试语言：繁体中文',
    labelEn: 'Official test language: Chinese (Traditional)',
    cardZh: '考试语言：繁体中文',
    noteZh: '请注意：马里兰官方中文考试用的是繁体字，本站的中文题面与讲解是简体字。学规则、记数字不受影响；临考前建议翻一遍官方繁体中文版手册，熟悉用字。',
    noteEn: "Heads up: Maryland's official Chinese test uses Traditional characters, while this site's Chinese is Simplified. The rules and numbers you learn are the same — skim the official Traditional-Chinese handbook before test day to get used to the character forms.",
  },
};

/* Per-question problem report: mailto to the same inbox as the Premium
   waitlist fake-door (premium.astro), prefilled with state + question id. */
export const REPORT_EMAIL = 'waitlist@permitdrills.com';
export function reportHref(stateSlug: string, stateLabel: string, q: Question): string {
  const subject = `Question issue — ${stateLabel} — ${q.id}`;
  const body = [
    `State: ${stateLabel} (${stateSlug})`,
    `Question ID: ${q.id}`,
    `Topic: ${q.topic}`,
    `Handbook source: ${q.source.section}`,
    '',
    'What looks wrong? (answer / translation / source link / other)',
    '',
  ].join('\n');
  return `mailto:${REPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* Coverage matrix, generated from the bank data (never hand-typed):
   topic counts + handbook-section counts; both must sum to the bank total. */
export interface Coverage {
  total: number;
  topics: { id: string; zh: string; en: string; count: number }[];
  sections: { section: string; url: string; count: number }[];
}
export function coverage(bank: StateBank): Coverage {
  const topics = Object.entries(TOPICS).map(([id, t]) => ({
    id,
    zh: t.zh,
    en: t.en,
    count: bank.questions.filter((q) => q.topic === id).length,
  }));
  const bySection = new Map<string, { section: string; url: string; count: number }>();
  for (const q of bank.questions) {
    const cur = bySection.get(q.source.section);
    if (cur) cur.count += 1;
    else bySection.set(q.source.section, { section: q.source.section, url: q.source.url, count: 1 });
  }
  const sections = [...bySection.values()].sort(
    (a, b) => b.count - a.count || a.section.localeCompare(b.section),
  );
  return { total: bank.questions.length, topics, sections };
}
