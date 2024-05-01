import axios from 'axios'
import { Product } from '~/interfaces/product.type'
import ClientRequest from '../ClientRequest'
import { api } from '..'
import { result } from 'lodash'
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

export const checkOutCart = () => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const res = await api.post('/bills/checkout')
            console.log(res)
            if (res.status == 201 || res.status == 200) {
                const result = await api.post('/bills/cart/reset')
            }
            resolve(res)
            reject(res)
        } catch (err) {
            reject(err)
        }
    })
}

const payAction = {
    getCart,
    checkOutCart,
}

export default payAction
