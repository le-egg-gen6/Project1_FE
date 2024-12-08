import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserData {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  validated: boolean;
}

interface AuthState {
  user: UserData | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  logout: () => void;
  validate: (code: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (username: string, password: string) => {
        
      },
      signup: async (
        username: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string
      ) => {

      },
      logout: () => {
        set({ user: null });
      },
      validate: async (code: string) => {
      
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
