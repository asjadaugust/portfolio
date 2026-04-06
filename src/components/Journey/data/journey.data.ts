import type { Location } from './journey.types';

export const LOCATIONS: Location[] = [
  {
    id: 'india',
    city: 'Bangalore',
    country: 'India',
    flag: '🇮🇳',
    tagline: 'Where the foundation was built',
    color: '#e37222',
    lat: 12.97,
    lon: 77.59,
    chapters: [
      {
        type: 'education',
        role: 'BSc Aeronautical Engineering',
        org: 'Dayananda Sagar College of Engineering',
        period: '2011 - 2015',
        skills: ['Engineering', 'Mathematics', 'Physics'],
      },
      {
        type: 'work',
        role: 'Software Developer',
        org: 'Accenture',
        period: '2015 - 2018',
        skills: ['Python', 'Django', 'Computer Vision'],
      },
      {
        type: 'work',
        role: 'Senior Software Engineer',
        org: 'InMobi',
        period: '2018',
        skills: ['React', 'Django'],
      },
    ],
  },
  {
    id: 'ireland',
    city: 'Dublin',
    country: 'Ireland',
    flag: '🇮🇪',
    tagline: 'Where data became the focus',
    color: '#00a1de',
    lat: 53.33,
    lon: -6.25,
    chapters: [
      {
        type: 'education',
        role: 'MSc Data Analytics',
        org: 'Dublin Business School',
        period: '2018 - 2019',
        skills: ['Python', 'Machine Learning', 'SQL'],
      },
      {
        type: 'work',
        role: 'AI/ML Software Developer',
        org: 'General Motors',
        period: '2019 - 2021',
        skills: ['Angular', 'MapBox', 'Spark', 'HBase'],
      },
    ],
  },
  {
    id: 'netherlands',
    city: 'Amsterdam',
    country: 'Netherlands',
    flag: '🇳🇱',
    tagline: 'Where it all came together',
    color: '#4ade80',
    lat: 52.37,
    lon: 4.9,
    chapters: [
      {
        type: 'work',
        role: 'Senior Software Developer',
        org: 'Visualfabriq',
        period: '2021 - 2022',
        skills: ['Python', 'React', 'Monorepo'],
      },
      {
        type: 'work',
        role: 'Software Engineer',
        org: 'KLM Royal Dutch Airlines',
        period: '2022 - Present',
        skills: ['Next.js', 'React', 'FastAPI', 'D3', 'TypeScript'],
      },
    ],
  },
];
