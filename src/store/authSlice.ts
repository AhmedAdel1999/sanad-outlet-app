import { StateCreator } from "zustand";

export type AuthSliceState = {
  authMail: string;
  authPhone: string;
  authWithPhone: boolean;
  isVerifyingAccount: boolean;
  setAuthMail: (email: string) => void;
  setAuthPhone: (phone: string) => void;
  setAuthWithPhone: (withPhone: boolean) => void;
  setIsVerifyingAccount: (isVerifying: boolean) => void;
  handleResetAuthValues: () => void;
};

export const createAuthSlice: StateCreator<
  AuthSliceState,
  [["zustand/immer", never]],
  [],
  AuthSliceState
> = (set) => ({
  authMail: "",
  authPhone: "",
  authWithPhone: true,
  isVerifyingAccount: false,

  setAuthMail: (email: string) => {
    set({ authMail: email });
  },

  setAuthPhone: (phone: string) => {
    set({ authPhone: phone });
  },

  setAuthWithPhone: (withPhone: boolean) => {
    set({ authWithPhone: withPhone });
  },

  setIsVerifyingAccount: (isVerifying: boolean) => {
    set({ isVerifyingAccount: isVerifying });
  },

  handleResetAuthValues: () => {
    set({
      authMail: "",
      authPhone: "",
      authWithPhone: false,
      isVerifyingAccount: false,
    });
  },
});
