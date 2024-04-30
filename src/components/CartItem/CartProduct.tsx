import React from 'react'
import { Product } from '~/interfaces/product.type'

const CartProduct = ({ dish, quantity }: { dish: Product; quantity: number }) => {
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

export default CartProduct
