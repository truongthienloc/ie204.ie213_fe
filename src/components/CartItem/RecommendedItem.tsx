import React from 'react'
import { useEffect, useState } from 'react'
import { OfferItem } from '~/components/OfferItem'
import { Product } from '~/interfaces/product.type'

const RecommendedItem = ({ dishes }: { dishes: Product[] }) => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const changeRecommended = setInterval(() => {
            setIndex((preIndex) => {
                if (preIndex === dishes?.length) return 0
                else return ++preIndex
            })
        }, 3000)

        return () => {
            clearInterval(changeRecommended)
        }
    }, [dishes])

    return (
        <div className="flex w-full bg-[#202020] px-[7%]">
            <div className="mx-auto max-w-screen-xl">
                <OfferItem dish={dishes[index]} />
            </div>
        </div>
    )
}

export default RecommendedItem
