import { User } from '~/interfaces/user.type'
import { api } from '..'

// get current user with token from client instance
export async function getCurrentUser(): Promise<User> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api('users/current-user')
            const user: User = res.data.data as User
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}
