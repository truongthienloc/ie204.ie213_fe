import { api, clientInstance } from '..'
import authEndpoint from '../endpoints/auth.endpoint'

type LoginResponse = {
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

// user login
function loginUserAccount(email: string, password: string) {
    return new Promise<LoginResponse>(async (resolve, reject) => {
        try {
            const res = await api.post(authEndpoint.login, {
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

// user register
function registerUserAccount(email: string, username: string, password: string) {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const res = await api.post(authEndpoint.register, {
                email,
                username,
                password,
            })

            const data = res.data
            console.log(data)
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
}

const authAction = {
    loginAdminAccount,
    loginUserAccount,
    registerUserAccount,
}

export default authAction
