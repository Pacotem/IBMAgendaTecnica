export interface Course {
  id: string;
  number: string;
  market: string;
  contactEmail: string;
  focusArea: string;
  audience: string;
  attendees: string;
  startDate: string;
  duration: string;
  name: string;
  containsWatsonx: boolean;
  isUserGroup: boolean;
  cost?: string;
  comments?: string;
  requested?: string;
}

export type FocusArea = 'All' | 'Automation' | 'Data and AI' | 'Z' | 'Security' | 'PowerVS' | 'Power11';
