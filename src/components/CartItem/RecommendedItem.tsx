import React from 'react'
import { use, useEffect, useState } from 'react'
import { OfferItem } from '~/components/OfferItem'
import { Product } from '~/interfaces/product.type'

const RecommendedItem = ({ dish }: { dish: Product[] }) => {
    const [OfferDish, setOfferDish] = useState<Product>()
    const [index, setIndex] = useState(0)
    useEffect(() => {
        setOfferDish(dish[index])
    }, [dish])
    useEffect(() => {
        const changeRecommended = setInterval(() => {
            setIndex((preIndex) => {
                setOfferDish(dish[preIndex])
                if (preIndex > dish.length) return 1
                else return preIndex + 1
            })
        }, 10000)
        return () => {
            clearInterval(changeRecommended)
        }
    }, [dish])
    return (
        <div className="flex w-full bg-[#202020] px-[7%]">
            <div className="mx-auto max-w-screen-xl">
                <OfferItem dish={OfferDish} />
            </div>
        </div>
    )
}

export default RecommendedItem
