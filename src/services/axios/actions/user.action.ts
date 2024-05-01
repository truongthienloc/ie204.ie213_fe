import { User } from '~/interfaces/user.type'
import { api } from '..'
import userEndpoint from '../endpoints/user.endpoint'

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

function changePassword(oldPassword: string, newPassword: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api.post(userEndpoint['change-password'], {
                oldPassword,
                newPassword,
            })

            resolve(res.data)
        } catch (error) {
            reject(error)
        }
    })
}

const userAction = {
    getCurrentUser,
    changePassword,
}

export default userAction
