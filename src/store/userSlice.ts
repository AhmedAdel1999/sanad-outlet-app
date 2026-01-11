import { StateCreator } from "zustand";

type User = {
  email: string;
  imageUrl: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
};

export type UserSliceState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  updateUser: (userData: User | null, token: string) => void;
  logout: () => void;
};

export const createUserSlice: StateCreator<
  UserSliceState,
  [["zustand/immer", never]],
  [],
  UserSliceState
> = (set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  updateUser: (userData: User | null, token: string) => {
    set({
      user: userData,
      token: !token.startsWith("Bearer ") ? `Bearer ${token}` : token,
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
});
