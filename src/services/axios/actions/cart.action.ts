import { CartProduct } from '~/interfaces/cart.type'
import { api } from '..'

// fetch user cart
export const getCart = () => {
    return new Promise<CartProduct[]>(async (resolve, reject) => {
        try {
            const res = await api.get(`/bills/cart`)
            console.log('res: ', res)

            const products = res.data.data as CartProduct[]
            resolve(products)
        } catch (err) {
            reject(err)
        }
    })
}

// add product to cart
export const addProductToCart = (dishId: string) => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const res = await api.post('/bills/cart/add', {
                dishId,
            })
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
}

// decrease quantity
export const decreaseQuantity = (dishId: string) => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const res = await api.post('/bills/cart/sub', {
                dishId,
            })
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
}

export const removeCartProduct = (dishId: string) => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const res = await api.post('/bills/cart/remove', {
                dishId,
            })
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
}

const cartAction = {
    getCart,
    addProductToCart,
    decreaseQuantity,
    removeCartProduct,
}

export default cartAction
