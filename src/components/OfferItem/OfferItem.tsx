import React from 'react'
import GradeIcon from '@mui/icons-material/Grade'
import CancelIcon from '@mui/icons-material/Cancel'
import { Product } from '~/interfaces/product.type'
import Link from 'next/link'

const OfferItem = ({ dish }: { dish: Product | undefined }) => {
    if (!dish) return <></>
    return (
        <div className="flex h-[300px] flex-row items-center gap-5 overflow-hidden">
            <div className="w-2/3 text-white">
                <Link
                    className="flex flex-row  items-center gap-4"
                    href={`/product/${dish.slugName}`}
                >
                    <div className="h-[260px] w-1/2 overflow-hidden rounded-2xl">
                        <img
                            className="h-full w-full object-cover"
                            src={dish.dishImages[0].link}
                            alt={dish.dishName}
                        />
                    </div>
                    <div className="flex w-1/2 flex-col gap-3 text-sm">
                        <h2 className="text-4xl font-bold">{dish.dishName}</h2>
                        <p>{dish.dishDescription}</p>
                        <div className="flex flex-row gap-4">
                            <div>
                                <p>
                                    <GradeIcon className="text-yellow-400" />
                                    {dish.rating?.toFixed(1)}
                                </p>
                                <p>100+ ratings</p>
                            </div>
                            <div>
                                <p>30 Mins Delivery time</p>
                                <p>Or Enjoy dine-in within 5 Mins </p>
                            </div>
                            <div className="text-xl text-primary">
                                <p>{dish.dishPrice} VND</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="mt-20 w-1/3 rounded-lg border-2 border-dashed border-primary px-6 py-5 text-primary">
                <p className="mb-5 text-3xl">Offers</p>
                <p className="transition-all hover:scale-95 hover:text-orange-400">
                    <CancelIcon /> Giảm đến 20.000đ khi thanh toán qua VNPay.
                </p>
                <p className="transition-all hover:scale-95 hover:text-orange-400">
                    <CancelIcon /> Giảm 20% từ 13h - 16h các ngày trong tuần.
                </p>
            </div>
        </div>
    )
}

export default OfferItem
