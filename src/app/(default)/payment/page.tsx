'use client'
import React, { useState, ChangeEvent } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import OptionButtons from '~/components/Payment/OptionButtons'
import { useCart } from '~/stores/cart/useCart'
import { forEach } from 'lodash'
import { CartProduct, Product } from '~/interfaces/product.type'
import { CartProduct as CartProductItem } from '~/components/CartItem'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Link from 'next/link'
import style from '../../../styles/payment.module.scss'
import placeholderImage from '../../../../public/images/payment.png'

const PaymentPage = () => {
    const cart = useCart((state) => state.cartList)
    const totalItems = useCart((state) => state.total)
    const [isShip, setIsShip] = useState(false)
    const [addressValue, setAddressValue] = useState('')
    const [isExistAddress, setIsExistAddress] = useState(false)
    const toggleShip = () => {
        setIsShip(!isShip)
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        console.log('here', value, value.trim() !== '')
        setAddressValue(value)
        setIsExistAddress(value.trim() !== '')
        console.log('set', isExistAddress)
    }
    const calculateTotal = (cartList: CartProduct) => {
        let total = 0
        if (Array.isArray(cartList)) {
            cartList.forEach((cartProduct) => {
                const { product, quantity } = cartProduct
                const { dishPrice } = product
                total += dishPrice * quantity
            })
        }
        return total
    }
    return (
        <div>
            <div className="w-fit py-5">
                <Link className="flex items-center hover:text-primary " href={'/cart'}>
                    <ArrowBackIosIcon />
                    Quay lại giỏ hàng
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
                    <section className="bg-[#f8f8f8c3]">
                        <div className="flex flex-row justify-between">
                            <h3 className="text-xl font-semibold text-primary">Cart</h3>
                            <p>{totalItems} sản phẩm</p>
                        </div>
                        <div className="flex flex-col">
                            {/* map các cartProduct */}
                            {cart.map((product) => (
                                <div key={product.product._id}>
                                    <CartProductItem
                                        dish={product.product}
                                        quantity={product.quantity}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <p>Chi tiết hóa đơn</p>
                            <div className="flex flex-row justify-between">
                                <p>Tổng số tiền</p>
                                <p>xxx.000 VND</p>
                            </div>
                            {isShip && (
                                <div className="flex flex-row justify-between">
                                    <p>Phí giao hàng</p>
                                    <p>20.000 VND</p>
                                </div>
                            )}
                            <div className="flex flex-row justify-between">
                                <p>VAT và phụ thu</p>
                                <p>0.000 VND</p>
                            </div>
                            <div className="flex flex-row justify-between text-xl font-semibold">
                                <p>Tổng thanh toán</p>
                                <p>932.000 VND</p>
                            </div>
                        </div>
                        <button className="rounded-lg bg-primary px-8 py-3 text-xl text-white transition-all hover:opacity-90">
                            Tiến hành thanh toán
                        </button>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default PaymentPage
