import { create } from 'zustand'

type AuthState = {
    id: string | null
    username: string | null
    email: string | null
    avatar: string | null
    isAdmin: boolean | null
    isLogin: boolean
    isLoading: boolean
}

type AuthAction = {
    login: (user: AuthLogin) => void
    logout: () => void
}

type AuthLogin = {
    id?: string
    username?: string
    email?: string
    avatar?: string
    isAdmin?: boolean
}

const initialState: AuthState = {
    id: null,
    username: null,
    email: null,
    avatar: null,
    isAdmin: false,
    isLogin: false,
    isLoading: true,
}

const useAuth = create<AuthState & AuthAction>((set) => ({
    ...initialState,
    login(user: AuthLogin) {
        set({ ...user, isLogin: true, isLoading: false })
    },
    logout() {
        set({ ...initialState, isLoading: false })
    },
}))

export default useAuth
