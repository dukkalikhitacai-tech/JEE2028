export interface UpdateItem {
  id: string;
  sourceType: 'Official Information' | 'Community Recommendations' | 'Our Suggested Study Strategy';
  title: string;
  date: string;
  summary: string;
  verifiedLink?: string;
  officialAuthority?: string;
}

export const OFFICIAL_UPDATES: UpdateItem[] = [
  {
    id: 'upd-1',
    sourceType: 'Official Information',
    title: 'JEE (Main) Examination Portal & Information Bulletin Archive',
    date: 'Official NTA Portal',
    summary: 'The National Testing Agency (NTA) issues the definitive Information Bulletin, eligibility criteria, exam cities, and session schedules. Always consult the official website for authentic circulars.',
    verifiedLink: 'https://jeemain.nta.nic.in',
    officialAuthority: 'National Testing Agency (NTA)',
  },
  {
    id: 'upd-2',
    sourceType: 'Official Information',
    title: 'JEE (Advanced) Official Organizing Institute Portal',
    date: 'Official IIT Portal',
    summary: 'Organized rotationally by the 7 Zonal Coordinating IITs under the Joint Admission Board (JAB). Contains original past question papers, answer keys, and eligibility criteria for IIT admissions.',
    verifiedLink: 'https://jeeadv.ac.in',
    officialAuthority: 'Joint Admission Board (JAB) / IITs',
  },
  {
    id: 'upd-3',
    sourceType: 'Our Suggested Study Strategy',
    title: 'Class 11 Mechanics & Calculus Grounding Protocol',
    date: 'Strategy Guide',
    summary: 'For JEE 2028 aspirants, starting Class 11 with deep conceptual mastery in Mechanics and Algebra prevents the common mid-year backlog crisis.',
    officialAuthority: 'Road to IIT Strategy Team',
  },
  {
    id: 'upd-4',
    sourceType: 'Community Recommendations',
    title: 'Resource Curation Consensus for 2028 Aspirants',
    date: 'Aspirant Peer Consensus',
    summary: 'Consistently top-ranked educators emphasize sticking to a single high-quality problem set per subject rather than hoarding multiple test series.',
    officialAuthority: 'JEE Aspirant Community Archive',
  },
];

export const MANDATORY_LEGAL_DISCLAIMER = {
  general: 'JEE examination dates, syllabus, eligibility criteria, pattern and admission rules can change. Always verify the latest information from the official JEE Main / NTA and JEE Advanced websites.',
  educational: 'This roadmap is an educational planning tool. It does not guarantee a particular percentile, rank, college, branch or IIT admission.',
  independent: 'Road to IIT 2028 is an independent educational roadmap system. It is not affiliated with, authorized by, or endorsed by the National Testing Agency (NTA), the Indian Institutes of Technology (IITs), or the Government of India.',
};
