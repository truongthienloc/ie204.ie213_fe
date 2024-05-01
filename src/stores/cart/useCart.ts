import { create } from 'zustand'
import { CartProduct } from '~/interfaces/cart.type'

interface CartState {
    cartList: CartProduct[]
    total: number
    loadProduct: (cart: CartProduct[]) => void
    addProduct: (product: CartProduct) => void
    removeProduct: (product: CartProduct) => void
    incQuantity: (product: CartProduct) => void
    decQuantity: (product: CartProduct) => void
    removeAll: () => void
}

export const useCart = create<CartState>()((set) => ({
    cartList: [],
    total: 0,
    loadProduct: (cart) =>
        set((state) => {
            const totalQuantity = cart.reduce((sum, product: CartProduct) => {
                return sum + product?.dishAmount
            }, 0)

            return {
                cartList: cart,
                total: totalQuantity,
            }
        }),

    addProduct: (product: CartProduct) =>
        set((state) => {
            return {
                cartList: [...state.cartList, product],
                total: state.total + 1,
            }
        }),

    removeProduct: (product: CartProduct) =>
        set((state) => {
            let data = state.cartList
            const item = data.find((item) => item._id === product._id)
            if (!item) {
                return state
            }

            return {
                cartList: [...data.filter((item) => item._id !== product._id)],
                total: state.total - product?.dishAmount,
            }
        }),

    incQuantity: (product: CartProduct) =>
        set((state) => {
            const changedProduct = state.cartList.find((item) => item?._id === product?._id)
            if (!changedProduct) return state

            const newCart = state.cartList.map((item: CartProduct) => {
                if (item?._id === product._id) item.dishAmount += 1
                return item
            })

            return {
                cartList: [...newCart],
                total: state.total + 1,
            }
        }),

    decQuantity: (product: CartProduct) =>
        set((state) => {
            let data = state.cartList
            const changedProduct = data.find((item) => item._id === product._id)
            if (!changedProduct) {
                return state
            }

            const newCart: CartProduct[] = state.cartList.map((item) => {
                if (item?._id === product?._id) item.dishAmount -= 1
                return item
            })

            return {
                cartList: [...newCart],
                total: state.total - 1,
            }

            // if (item.quantity === 1) {
            //     return {
            //         cartList: [...data.filter((item) => item.product._id !== product._id)],
            //         total: state.total - item.quantity,
            //     }
            // } else {
            //     item.quantity -= 1
            //     return {
            //         cartList: [...data],
            //         total: state.total - 1,
            //     }
            // }
        }),

    removeAll: () =>
        set(() => {
            return {
                cartList: [],
                total: 0,
            }
        }),
}))
