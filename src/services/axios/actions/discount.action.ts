import { Discount, DiscountData } from '~/interfaces/discount.type'
import { api } from '..'
import discountEndpoint from '../endpoints/discount.endpoint'

const discountAction = {
    getAllDiscount() {
        return new Promise<Discount[]>(async (resolve, reject) => {
            try {
                const res = await api.get(discountEndpoint['get-all-discount'])
                const data = res.data.data as Discount[]
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
    postNewDiscount(discount: DiscountData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api.post(discountEndpoint['post-discount'], discount)
                const data = res.data.data
                await api.post(`${discountEndpoint['assign-all']}/${data._id}`)
                resolve(res.data)
            } catch (error) {
                reject(error)
            }
        })
    },
    deleteDiscount(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api.delete(`${discountEndpoint['delete-discount']}/${id}`)
                resolve(res.data)
            } catch (error) {
                reject(error)
            }
        })
    },
}

export default discountAction
