# Globe Journey Section — Design Spec

**Date:** 2026-04-07
**Status:** Approved

---

## Overview

Replace the static About section with an interactive 3D globe that visualises the career journey across three countries. Visitors see a spinning Earth with glowing location dots and animated flight arcs. Clicking or auto-touring each dot reveals an info panel with education and work history for that location.

---

## Page Placement

The Journey section replaces the existing About section entirely. Page order: Hero, Journey, Projects, Contact. The About component is removed; its bio text is superseded by the location panels.

---

## Layout

Desktop (1280px+): two-column flex row.
- Left column (52%): R3F Canvas with globe, location nav dots below
- Right column (48%): info panel that cross-fades on location change

Mobile: single column, globe on top, panel below. Globe shrinks to 240px diameter.

---

## Component Architecture

```
src/components/Journey/
  index.ts
  Journey.tsx               # section wrapper, layout, auto-tour effect
  Journey.module.scss

  globe/
    GlobeScene.tsx          # R3F Canvas, camera, OrbitControls, lighting
    EarthMesh.tsx           # sphere + ShaderMaterial (day/night GLSL)
    LocationMarker.tsx      # pulsing dot + ring at lat/lon
    FlightArc.tsx           # CatmullRomCurve3 tube with travelling dot
    GlobeStarField.tsx      # star particles (reuses HeroBackground logic)

  panel/
    JourneyPanel.tsx        # location header, tagline, chapter cards
    ChapterCard.tsx         # single education or work card with skill tags

  store/
    useJourneyStore.ts      # Zustand: activeId, isPaused, setActive, pause, resume

  data/
    journey.types.ts        # Location and Chapter TypeScript interfaces
    journey.data.ts         # all three location records
```

---

## Data Model

```ts
// journey.types.ts
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
```

```ts
// journey.data.ts
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
    lon: 4.90,
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
```

---

## Globe Visuals

**Sphere:** radius 2, 64x64 segments, `ShaderMaterial`.

**Day/night shader:** A GLSL fragment shader blends two textures per pixel based on the dot product of the pixel's surface normal against a `sunDirection` uniform. Positive dot = day texture (Blue Marble). Negative dot = night texture (Black Marble / city lights). A soft orange band at the terminator is added via a smoothstep in the 0.0-0.1 dot range. The `sunDirection` uniform updates every frame from `Date.now()` UTC time via `useFrame`.

**Texture assets** (place in `/public/textures/`):
- `earth-day.jpg` — download from `https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74117/world.200408.3x5400x2700.jpg`
- `earth-night.jpg` — download from `https://eoimages.gsfc.nasa.gov/images/imagerecords/144000/144898/BlackMarble_2016_3km.jpg`

**Grid lines:** thin lat/lon grid overlaid via a secondary transparent mesh with `LineSegments`.

**Location markers:** each `LocationMarker` places a glowing sphere at the converted lat/lon position on the globe surface. The active marker pulses (scale oscillation via `useFrame`). Color matches the location's `color` field.

**Flight arcs:** `FlightArc` uses `CatmullRomCurve3` with a midpoint lifted above the sphere surface to form an arc. A small dot travels along the curve on a looping animation. Two arcs: India to Ireland, Ireland to Netherlands.

---

## Interaction

**Auto-tour:** `setInterval` in `Journey.tsx` advances `activeId` through the three locations every 4 seconds. Pauses on globe hover, resumes 6 seconds after last interaction.

**Manual:** clicking a `LocationMarker` or a nav dot below the globe calls `setActive` immediately and resets the auto-tour timer.

**Panel transition:** `JourneyPanel` uses a CSS opacity + translateY transition when `activeId` changes (Framer Motion `AnimatePresence`).

---

## Zustand Store

```ts
interface JourneyStore {
  activeId: string;
  isPaused: boolean;
  setActive: (id: string) => void;
  pause: () => void;
  resume: () => void;
}
```

---

## Dependencies to Install

```bash
npm install @react-three/fiber @react-three/drei three zustand framer-motion
npm install -D @types/three
```

---

## Navbar Update

Change the "About" nav link label to "Journey" and update the href to `#journey`. Update the section `id` in `Journey.tsx` to `journey`.

---

## Out of Scope

- Mobile touch drag on globe (OrbitControls handles basic touch; custom swipe gestures are not included)
- Fetching live sun position from an API (UTC calculation in-browser is sufficient)
- Animations for the flight arc construction (arcs are always visible; only the travelling dot animates)
