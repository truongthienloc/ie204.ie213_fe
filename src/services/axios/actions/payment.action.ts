import axios from 'axios'
import { Product } from '~/interfaces/product.type'
import ClientRequest from '../ClientRequest'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

// fetch cart
export const getCart = () => {
    return new Promise<Product[]>(async (resolve, reject) => {
        try {
            const request = ClientRequest.getInstance().getClient()
            const res = await request.get(`${baseUrl}/bills/cart`)
            const products = res.data.data as Product[]
            resolve(products)
        } catch (err) {
            reject(err)
        }
    })
}

const payAction = {
    getCart,
}

export default payAction
