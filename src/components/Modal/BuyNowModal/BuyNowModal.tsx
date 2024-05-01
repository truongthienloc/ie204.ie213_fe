'use client'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Product } from '~/interfaces/product.type'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { formatCurrency } from '~/lib/utils'

type slug = {
    pathname: string
}
type query = {
    dishID: string
    quantity: number
}

const BuyNowModal = ({ product, closeModal }: { product: Product; closeModal: () => void }) => {
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(product.dishPrice * quantity)
    const incQuantity = () => {
        setQuantity(quantity + 1)
        setTotal(product.dishPrice * (quantity + 1))
    }
    const decQuantity = () => {
        if (total < 2) {
            setQuantity(1)
            setTotal(product.dishPrice)
        } else {
            setQuantity(quantity - 1)
            setTotal(product.dishPrice * (quantity - 1))
        }
    }
    const router = useRouter()
    return (
        <>
            <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-slate-700 opacity-70"></div>
            <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-gray-100">
                <div className="flex w-full items-center justify-center bg-primary py-4 text-white">
                    Mua ngay sản phẩm {product.dishName}
                </div>

                <div className="flex w-full flex-row items-center gap-10 p-5 text-second">
                    <div className="h-[160px] w-[200px] overflow-hidden rounded-md">
                        <img
                            className="h-full w-full object-cover object-center"
                            src={product.dishImages[0].link}
                            alt={product.dishName}
                        />
                    </div>
                    <div className="flex w-[210px] flex-col gap-5">
                        <p>Giá: {formatCurrency(product.dishPrice)} VND</p>
                        <div className="flex flex-row gap-3">
                            <p>Số lượng</p>
                            <div>
                                <button onClick={decQuantity}>
                                    <RemoveIcon />
                                </button>
                                <input
                                    className="w-10 bg-gray-100 text-center outline-none"
                                    type="text"
                                    placeholder={quantity.toString()}
                                    value={quantity}
                                />
                                <button onClick={incQuantity}>
                                    <AddIcon />
                                </button>
                            </div>
                        </div>
                        <p>
                            Thành tiền:{' '}
                            <span className="pl-2 font-semibold text-primary">
                                {formatCurrency(total)}
                            </span>{' '}
                            VND
                        </p>
                    </div>
                </div>
                <div className="flex w-full justify-between px-8 pb-5">
                    <button
                        className="rounded-md  bg-primary px-10 py-3 text-white transition hover:opacity-80"
                        onClick={closeModal}
                    >
                        Hủy
                    </button>
                    <button
                        className="rounded-md border-2 border-primary bg-white px-3 py-3 text-primary transition hover:bg-primary hover:text-white"
                        onClick={() => router.push(`/payment/${product.slugName}`)}
                    >
                        Tiến hành thanh toán
                    </button>
                </div>
            </div>
        </>
    )
}

export default BuyNowModal
