export type ChapterType = 'education' | 'work';

export interface Chapter {
  type: ChapterType;
  role: string;
  org: string;
  period: string;
  skills: string[];
}

export interface Location {
  id: string;
  city: string;
  country: string;
  flag: string;
  tagline: string;
  color: string;
  lat: number;
  lon: number;
  chapters: Chapter[];
}
