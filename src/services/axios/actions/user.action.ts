import { User } from '~/interfaces/user.type'
import { api } from '..'
import userEndpoint from '../endpoints/user.endpoint'

function getCurrentUser() {
    return new Promise<User>(async (resolve, reject) => {
        try {
            const res = await api.get(userEndpoint['get-me'])
            const data = res.data.data as User
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

const userAction = {
    getCurrentUser,
}

export default userAction
