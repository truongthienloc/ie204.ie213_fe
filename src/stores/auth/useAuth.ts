import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '~/interfaces/user';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  setAuth: () => {},
  logout: () => {},
};

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth(user: User, accessToken: string) {
        set({ user, accessToken, isAuthenticated: true, isLoading: false });
      },
      logout() {
        set({ ...initialState, isLoading: false });
      },
    }),
    {
      name: 'auth',
    },
  ),
);

export default useAuth;
