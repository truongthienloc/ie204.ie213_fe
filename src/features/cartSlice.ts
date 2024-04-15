import { createSlice } from '@reduxjs/toolkit'

type cartState = {
    cartList: any[]
    total: number
}
const initialState: cartState = {
    cartList: [],
    total: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increasement: (state, actions) => {
            let data = state.cartList
            const isExist = data.some((item) => item?.id === actions.payload.id)
            if (isExist) {
                const cartData = data.map((item) => {
                    if (item.id === actions.payload.id) {
                        item.quantity += 1
                    }
                    return item
                })
                state.cartList = cartData
                state.total += 1
                return state
            }
            return {
                ...state,
                cartList: [...data, { ...actions.payload, quantity: 1 }],
                total: state.total + 1,
            }
        },
        deleteItem: (state, actions) => {
            let data = state.cartList
            const item = data.find((item) => item?.id === actions.payload)
            if (!item) {
                return state
            }
            state.total -= item.quantity
            state.cartList = data.filter((item) => item?.id !== actions.payload)
        },
        incQuantity: (state, actions) => {
            let data = state.cartList
            const item = data.find((item) => item?.id === actions.payload)
            if (!item) {
                return state
            }
            item.quantity += 1
            state.total += 1
        },
        decQuantity: (state, actions) => {
            let data = state.cartList
            const item = data.find((item) => item?.id === actions.payload)
            if (!item) {
                return state
            }
            item.quantity -= 1
            if (item.quantity === 0) {
                state.cartList = data.filter((item) => item?.id !== actions.payload)
            }
            state.total -= 1
        },
        deleteAll: (state, actions) => {
            return initialState
        },
    },
})

// Action creators are generated for each case reducer function
export const { increasement, deleteItem, decQuantity, incQuantity, deleteAll } = cartSlice.actions

export default cartSlice.reducer
