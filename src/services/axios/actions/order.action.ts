import { Order } from '~/interfaces/order.type'
import { api } from '..'
import orderEndpoint from '../endpoints/order.endpoint'

const orderAction = {
    getAllBills() {
        return new Promise<Order[]>(async (resolve, reject) => {
            try {
                const res = await api.get(orderEndpoint['get-all-bills'])
                const data = res.data.data as Order[]
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
    checkoutByAdmin(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api.post(`${orderEndpoint['admin-checkout']}/${id}`)
                resolve(res.data)
            } catch (error) {
                reject(error)
            }
        })
    },
}

export default orderAction
