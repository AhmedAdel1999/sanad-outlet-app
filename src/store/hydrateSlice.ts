import { StateCreator } from "zustand";

export interface HydrateState {
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

export const createHydrateStore: StateCreator<
  HydrateState,
  [["zustand/immer", never]],
  [],
  HydrateState
> = (set) => ({
  isHydrated: false,
  setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),
});
