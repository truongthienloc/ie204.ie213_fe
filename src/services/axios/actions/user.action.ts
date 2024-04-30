import { User } from '~/interfaces/user.type'
import { Table } from '~/interfaces/table.type'
import { api } from '..'
import { Order } from '~/interfaces/order.type'

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

// get table orders by user token
export async function getUserTableOrder(): Promise<Table> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api('tables/user')
            const tables: Table[] = res.data as Table[]
            resolve(tables[0])
        } catch (error) {
            reject(error)
        }
    })
}

// change password
export async function changeUserPassword(oldPassword: string, newPassword: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api('users/change-password', {})
            // resolve()
        } catch (error) {
            reject(error)
        }
    })
}

//get user order by token
export async function getUserOrders(): Promise<Order[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api.get('bills/order')
            const orders: Order[] = res.data.data as Order[]
            resolve(orders)
        } catch (error) {
            reject(error)
        }
    })
}

export const userAction = {
    getCurrentUser,
    getUserTableOrder,
}

export default userAction
