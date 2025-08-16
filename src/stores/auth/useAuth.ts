import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '~/interfaces/user';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User | null, accessToken: string) => void;
  logout: () => void;
};

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
};

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (user: User | null, accessToken: string) => {
        set({ user, accessToken, isAuthenticated: !!user, isLoading: false });
      },
      logout: () => {
        set({ ...initialState });
      },
    }),
    {
      name: 'auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuth;
