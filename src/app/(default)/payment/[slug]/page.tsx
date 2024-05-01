'use client'
import React, { useState, ChangeEvent, useEffect } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import OptionButtons from '~/components/Payment/OptionButtons'
import { useCart } from '~/stores/cart/useCart'
import { forEach } from 'lodash'
import { Product } from '~/interfaces/product.type'
import { CartProduct as CartProductItem } from '~/components/CartItem'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Link from 'next/link'
import style from '~/styles/payment.module.scss'
import placeholderImage from '../../../../../public/images/payment.png'
import { formatCurrency } from '~/lib/utils'

const VAT = 0.1
const shippingFee = 20000

const PaymentPage = () => {
    const cart = useCart((state) => state.cartList)
    const [Total, setTotal] = useState(0)
    const [totalPay, settotalPay] = useState(0)
    const [isShip, setIsShip] = useState(false)
    const [addressValue, setAddressValue] = useState('')
    const [isExistAddress, setIsExistAddress] = useState(false)
    const toggleShip = () => {
        setIsShip(!isShip)
        settotalPay(!isShip ? shippingFee + Total * (1 + VAT) : Total * (1 + VAT))
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        console.log('here', value, value.trim() !== '')
        setAddressValue(value)
        setIsExistAddress(value.trim() !== '')
        console.log('set', isExistAddress)
    }
    const calculateTotal = () => {
        let total = 0
        if (Array.isArray(cart)) {
            cart.forEach((cartProduct) => {
                total += cartProduct.dishAmount * cartProduct.dishPrice
            })
        }
        setTotal(total)
        settotalPay(total * (1 + VAT))
    }
    useEffect(() => {
        calculateTotal()
    }, [cart])
    return (
        <div>
            <div className="w-fit py-5">
                <Link className="flex items-center hover:text-primary " href={'/product'}>
                    <ArrowBackIosIcon />
                    Quay lại trang sản phẩm
                </Link>
            </div>
            <div className="flex flex-row justify-between gap-10 px-20">
                <div className="flex w-2/3 flex-col gap-5">
                    <div className="flex flex-col">
                        <h3 className="py-5 text-2xl text-primary">
                            <LocationOnIcon className="size-8" />
                            Cách nhận hàng
                        </h3>
                        <OptionButtons state={isShip} updateState={toggleShip} />
                    </div>
                    {isShip && (
                        <div className="flex flex-col">
                            <h3 className="py-5 text-2xl text-primary">
                                <LocationOnIcon className="size-8" />
                                Địa chỉ giao hàng
                            </h3>
                            <div
                                className={`${style.inputDiv} ${isExistAddress ? style.active : ''}`}
                            >
                                <LocationOnIcon className="size-8" />
                                <input
                                    type="text"
                                    placeholder="Địa chỉ giao hàng..."
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}
                    <div className="overflow-hidden rounded-xl">
                        <img
                            className="h-full w-full object-contain"
                            src={placeholderImage.src}
                            alt="Thanh toán liền tay, nhận ngàn ưu đãi."
                        />
                    </div>
                </div>
                <div className="flex w-1/3 flex-col items-center">
                    <section className="flex w-full flex-col rounded-xl bg-[#fff7ed] p-3">
                        <div className="flex flex-row justify-between py-3">
                            <h3 className="text-xl font-semibold text-primary">Cart</h3>
                        </div>
                        <div className="flex flex-col gap-3">
                            {/* map các cartProduct */}
                            {cart.map((product) => (
                                <div key={product._id}>
                                    <CartProductItem dish={product} quantity={product.dishAmount} />
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 flex flex-col gap-5">
                            <p className="text-xl text-primary">Chi tiết hóa đơn</p>
                            <div className="flex flex-row justify-between">
                                <p>Tổng số tiền</p>
                                <p>{formatCurrency(Total)} VND</p>
                            </div>
                            {isShip && (
                                <div className="flex flex-row justify-between">
                                    <p>Phí giao hàng</p>
                                    <p>{formatCurrency(shippingFee)} VND</p>
                                </div>
                            )}
                            <div className="flex flex-row justify-between">
                                <p>VAT và phụ thu</p>
                                <p>{formatCurrency(Total * VAT)} VND</p>
                            </div>
                            <div className="flex flex-row justify-between text-xl font-semibold">
                                <p>Tổng thanh toán</p>
                                <p>{formatCurrency(totalPay)} VND</p>
                            </div>
                        </div>

                        {/* Direct to VNPAY */}
                        <div className="my-3 flex items-center justify-center">
                            <Link href={'/vnpay'}>
                                <button className="rounded-lg bg-primary px-8 py-3 text-xl text-white transition-all hover:opacity-90">
                                    Tiến hành thanh toán
                                </button>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default PaymentPage
