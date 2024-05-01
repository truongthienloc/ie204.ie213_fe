import React, { use, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Product } from '~/interfaces/product.type'

const CartItem = ({ dish }: { dish: Product }) => {
    const [quantity, setQuantity] = useState(1)
    const incQuantity = () => {
        setQuantity(quantity + 1)
    }
    const decQuantity = () => {
        if (quantity > 0) setQuantity(quantity - 1)
    }
    return (
        <div className="flex flex-row items-center ">
            <div className="h-28 w-28 overflow-hidden rounded-lg">
                <img
                    className="h-full w-full object-contain"
                    src={dish.dishImages[0].link}
                    alt={dish.dishName}
                />
            </div>
            <div className="flex flex-col justify-between">
                <p>{dish.dishName}</p>
                <p>{dish.dishPrice}</p>
            </div>
            <div className="flex flex-row">
                <RemoveIcon className="" onClick={decQuantity} />
                <p>{quantity}</p>
                <AddIcon className="" onClick={incQuantity} />
            </div>
        </div>
    )
}

export default CartItem
