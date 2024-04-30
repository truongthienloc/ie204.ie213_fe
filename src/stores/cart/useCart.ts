import { to } from 'react-spring'
import { create } from 'zustand'
import { CartProduct, Product } from '~/interfaces/product.type'

interface CartState {
    cartList: CartProduct[]
    total: number
    loadProduct: (data: any) => void
    addProduct: (product: Product) => void
    removeProduct: (product: Product) => void
    incQuantity: (product: Product) => void
    decQuantity: (product: Product) => void
    removeAll: () => void
}

export const useCart = create<CartState>()((set) => ({
    cartList: [],
    total: 0,
    loadProduct: (data) =>
        set((state) => {
            let totalQuantity = 0
            const updatedCartList = data.map((item: any) => {
                totalQuantity += item.dishAmount
                return {
                    product: {
                        _id: item._id,
                        dishName: item.dishName,
                        dishPrice: item.dishPrice,
                        dishImages: item.dishImages,
                    },
                    quantity: item.dishAmount,
                }
            })
            return {
                cartList: updatedCartList,
                total: totalQuantity,
            }
        }),
    addProduct: (product) =>
        set((state) => {
            let data = state.cartList
            const isExist = data.some((item) => item?.product._id === product._id)
            if (isExist) {
                const cartData = data.map((item) => {
                    if (item.product._id === product._id) {
                        item.quantity += 1
                    }
                    return item
                })
                state.cartList = cartData
                state.total += 1
                return state
            }
            return {
                cartList: [...data, { product, quantity: 1 }],
                total: state.total + 1,
            }
        }),
    removeProduct: (product) =>
        set((state) => {
            let data = state.cartList
            const item = data.find((item) => item.product._id === product._id)
            if (!item) {
                return state
            }
            return {
                cartList: [...data.filter((item) => item.product._id !== product._id)],
                total: state.total - item.quantity,
            }
        }),
    incQuantity: (product) =>
        set((state) => {
            let data = state.cartList
            const item = data.find((item) => item.product._id === product._id)
            if (!item) {
                return state
            }
            item.quantity += 1
            return {
                cartList: [...data],
                total: state.total + 1,
            }
        }),
    decQuantity: (product) =>
        set((state) => {
            let data = state.cartList
            const item = data.find((item) => item.product._id === product._id)
            if (!item) {
                return state
            }
            if (item.quantity === 1) {
                return {
                    cartList: [...data.filter((item) => item.product._id !== product._id)],
                    total: state.total - item.quantity,
                }
            } else {
                item.quantity -= 1
                return {
                    cartList: [...data],
                    total: state.total - 1,
                }
            }
        }),
    removeAll: () => {
        return {
            cartList: [],
            total: 0,
        }
    },
}))
