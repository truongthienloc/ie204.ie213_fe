import React from 'react'
import { CartProduct } from '~/interfaces/cart.type'

const CartProductItem = ({ dish, quantity }: { dish: CartProduct; quantity: number }) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <h3>{dish.dishName}</h3>
                <p>{dish.dishPrice}</p>
            </div>
            <div>
                <p>{quantity}</p>
            </div>
        </div>
    )
}

export default CartProductItem
