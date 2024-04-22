import { api, clientInstance } from '..'
import authEndpoint from '../endpoints/auth.endpoint'

export type LoginResponse = {
    accessToken: string
    refreshToken: string
}

function loginAdminAccount(email: string, password: string) {
    return new Promise<LoginResponse>(async (resolve, reject) => {
        try {
            const res = await api.post(authEndpoint['admin-login'], {
                email,
                password,
            })

            const data = res.data.data as LoginResponse
            clientInstance.setAccessToken(data.accessToken)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

const authAction = {
    loginAdminAccount,
}

export default authAction
