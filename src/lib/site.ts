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
