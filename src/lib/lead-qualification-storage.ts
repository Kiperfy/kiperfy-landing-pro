export const LEAD_STORAGE_KEY = "kiperfy-lead-responses";

export type LeadQualificationResponse = {
  lang: string;
  units: string;
  challenge: string;
  decision: string;
  name: string;
  email: string;
  submittedAt: string;
};

export function saveLeadResponse(entry: LeadQualificationResponse) {
  try {
    const existing = localStorage.getItem(LEAD_STORAGE_KEY);
    const list: LeadQualificationResponse[] = existing ? JSON.parse(existing) : [];
    list.push(entry);
    localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* ignore quota / private mode */
  }
}
