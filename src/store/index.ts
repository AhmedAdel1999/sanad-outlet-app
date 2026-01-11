// store/index.ts
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createUserSlice, type UserSliceState } from "./userSlice";
import { createAuthSlice, type AuthSliceState } from "./authSlice";
import { type HydrateState, createHydrateStore } from "./hydrateSlice";

export type Store = UserSliceState & AuthSliceState & HydrateState;

export const useStore = create<Store>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createUserSlice(...a),
        ...createAuthSlice(...a),
        ...createHydrateStore(...a),
      })),
      {
        name: "store-storage",
        storage: createJSONStorage(() => localStorage),
        partialize(state) {
          return {
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            // Add auth fields if you want them persisted
            authMail: state.authMail,
            authPhone: state.authPhone,
            authWithPhone: state.authWithPhone,
            isVerifyingAccount: state.isVerifyingAccount,
          };
        },
        version: 1,
        onRehydrateStorage: () => (state, error) => {
          if (error) {
            state?.setHydrated(true);
            return;
          }
          state?.setHydrated(true);
        },
      }
    )
  )
);
