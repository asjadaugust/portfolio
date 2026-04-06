import { create } from 'zustand';

interface JourneyStore {
  activeId: string;
  isPaused: boolean;
  setActive: (id: string) => void;
  pause: () => void;
  resume: () => void;
}

export const useJourneyStore = create<JourneyStore>((set) => ({
  activeId: 'india',
  isPaused: false,
  setActive: (id) => set({ activeId: id }),
  pause: () => set({ isPaused: true }),
  resume: () => set({ isPaused: false }),
}));
