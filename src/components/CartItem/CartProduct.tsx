import React from 'react'
import { Product } from '~/interfaces/product.type'

const CartProduct = ({ dish }: { dish: Product }) => {
    return (
        <div className="flex flex-row">
            <div className="flex flex-col">
                <h3>{dish.dishName}</h3>
                <p>{dish.dishPrice}</p>
                <p>{dish.dishDescription}</p>
            </div>
            <div>
                <div>
                    <img src={dish.dishImages[0].link} alt={dish.dishName} />
                </div>
                <button className="px-4 py-2 text-green-500"> Add +</button>
            </div>
        </div>
    )
}

export default CartProduct
