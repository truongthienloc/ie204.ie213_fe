'use client'
import React, { useState, ChangeEvent, useEffect, useCallback } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useCart } from '~/stores/cart/useCart'
import { CartProductItem } from '~/components/CartItem'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Link from 'next/link'
import style from '../../../styles/payment.module.scss'
import placeholderImage from '../../../../public/images/payment.png'
import { formatCurrency } from '~/lib/utils'
import ShippingOptionButtons from '~/components/Payment/ShippingOptionButtons'
import PaymentOptionButtons from '~/components/Payment/PaymentOptionButton'
import PaymentModal from '~/components/Modal/PaymentModal/PaymentModal'
import { useAuth } from '~/stores/auth'
import payAction, { checkOutCart } from '~/services/axios/actions/payment.action'
import { useRouter } from 'next/navigation'

const VAT = 0.1
const shippingFee = 20000

const PaymentPage = () => {
    const router = useRouter()
    const cart = useCart((state) => state.cartList)
    const user = useAuth((state) => state)
    const userName: string = user.username !== null ? user.username : ''
    const totalItems = useCart((state) => state.total)
    const [Total, setTotal] = useState(0)
    const [totalPay, settotalPay] = useState(0)
    const [isShip, setIsShip] = useState(false)
    const [isPayDirected, setPayDirected] = useState(true)
    const [displayPaymentModal, setdisplayPaymentModal] = useState(false)
    const [addressValue, setAddressValue] = useState('')
    const [isExistAddress, setIsExistAddress] = useState(false)
    const togglePayDirected = () => {
        setPayDirected(!isPayDirected)
    }

    const toggleShip = () => {
        setIsShip(!isShip)
        if (isShip) setPayDirected(false)
        settotalPay(!isShip ? shippingFee + Total * (1 + VAT) : Total * (1 + VAT))
    }
    const closeModal = () => {
        setdisplayPaymentModal(false)
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setAddressValue(value)
        setIsExistAddress(value.trim() !== '')
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
    const handleCheckOut = () => {
        if (isPayDirected) {
            setdisplayPaymentModal(true)
        } else {
            // Chuyển đến VNPay
            try {
                handlePayByVNPay()
                const res = checkOutCart()
            } catch (err) {
                console.error(err)
            }
        }
    }
    useEffect(() => {
        calculateTotal()
    }, [cart])

    const handlePayByVNPay = async () => {
        try {
            const data = await payAction.paymentByVNPay()
            window.open(data)
        } catch (error) {}
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
                        <ShippingOptionButtons state={isShip} updateState={toggleShip} />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="py-5 text-2xl text-primary">
                            <LocationOnIcon className="size-8" />
                            Phương thức thanh toán
                        </h3>
                        <PaymentOptionButtons
                            conditionState={isShip}
                            state={isPayDirected}
                            updateState={togglePayDirected}
                        />
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
                            <p>{totalItems} sản phẩm</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            {/* map các cartProduct */}
                            {cart.map((product) => (
                                <div key={product._id}>
                                    {/* Fix here */}
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
                            <button
                                className="rounded-lg bg-primary px-8 py-3 text-xl text-white transition-all hover:opacity-90"
                                onClick={handleCheckOut}
                            >
                                Tiến hành thanh toán
                            </button>
                        </div>
                        {displayPaymentModal && (
                            <PaymentModal
                                totalPay={totalPay}
                                userName={userName}
                                closeModal={closeModal}
                            />
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}
export default PaymentPage
