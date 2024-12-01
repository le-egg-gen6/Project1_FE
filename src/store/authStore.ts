import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: UserData | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  logout: () => void;
  validate: (code: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // In a real application, you would make an API call here
        // This is a mock implementation
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        const mockUser: UserData = {
          id: "1",
          email,
          firstName: "John",
          lastName: "Doe",
        };
        set({ user: mockUser });
      },
      signup: async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
      ) => {
        // In a real application, you would make an API call here
        // This is a mock implementation
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        const mockUser: UserData = { id: "1", email, firstName, lastName };
        set({ user: mockUser });
      },
      logout: () => {
        set({ user: null });
      },
      validate: async (code: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demonstration purposes, consider '123456' as the valid code
        if (code === "123456") {
          return true;
        } else {
          throw new Error("Invalid code");
        }
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
