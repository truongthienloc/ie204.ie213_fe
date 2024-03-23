import { create } from 'zustand'

type AuthState = {
    id: string | null
    username: string | null
    email: string | null
    avatar: string | null
    isAdmin: boolean | null
    isLogin: boolean
}

type AuthAction = {
    login: (user: AuthLogin) => void
}

type AuthLogin = {
    id: string
    username: string
    email: string
    avatar: string
    isAdmin: boolean
}

const initialState: AuthState = {
    id: null,
    username: null,
    email: null,
    avatar: null,
    isAdmin: true,
    isLogin: false,
}

const useAuth = create<AuthState & AuthAction>((set) => ({
    ...initialState,
    login(user: AuthLogin) {
        set({ ...user, isLogin: true })
    },
    logout() {
        set({ ...initialState })
    },
}))

export default useAuth
