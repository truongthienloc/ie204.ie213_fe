'use client'
import React, { useState, ChangeEvent, useEffect } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ShippingOptionButtons from '~/components/Payment/ShippingOptionButtons'
import { useCart } from '~/stores/cart/useCart'
import { forEach } from 'lodash'
import { Product } from '~/interfaces/product.type'
import { CartProduct } from '~/interfaces/cart.type'
import { CartProductItem } from '~/components/CartItem'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Link from 'next/link'
import style from '~/styles/payment.module.scss'
import placeholderImage from '../../../../../public/images/payment.png'
import { formatCurrency } from '~/lib/utils'
import { useSearchParams } from 'next/navigation'
import { getProductById } from '~/services/axios/actions/product.action'
import payAction, {
    checkOutCart,
    checkOutImmediately,
} from '~/services/axios/actions/payment.action'
import { useRouter } from 'next/navigation'
import { useAuth } from '~/stores/auth'
import PaymentOptionButtons from '~/components/Payment/PaymentOptionButton'
import PaymentModal from '~/components/Modal/PaymentModal/PaymentModal'
import PaymentsIcon from '@mui/icons-material/Payments'
import { toast } from 'react-toastify'
import { cartReset } from '~/services/axios/actions/cart.action'

const VAT = 0.1
const shippingFee = 20000
const PaymentPage = () => {
    const user = useAuth((state) => state)
    const userName: string = user.username !== null ? user.username : ''
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const quantity = searchParams.get('quantity')
    const [product, setProduct] = useState<Product | undefined>()
    const [cartProduct, setCartProduct] = useState<CartProduct>({
        _id: '',
        dishName: '',
        dishPrice: 0,
        dishImages: [],
        dishAmount: 0,
    })
    const [Total, setTotal] = useState(0)
    const [totalPay, settotalPay] = useState(0)
    const [isShip, setIsShip] = useState(false)
    const [addressValue, setAddressValue] = useState('')
    const [isExistAddress, setIsExistAddress] = useState(false)
    const [isPayDirected, setPayDirected] = useState(true)
    const [displayPaymentModal, setdisplayPaymentModal] = useState(false)
    const toggleShipTrue = () => {
        setIsShip(true)
        setPayDirected(false)
        settotalPay(shippingFee + Total * (1 + VAT))
    }
    const toggleShipFalse = () => {
        setIsShip(false)
        setPayDirected(true)
        settotalPay(Total * (1 + VAT))
    }
    const togglePayDirectTrue = () => {
        setPayDirected(true)
    }
    const togglePayDirectFalse = () => {
        setPayDirected(false)
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
        if (product && quantity) {
            total = product.dishPrice * parseInt(quantity)
        }
        setTotal(total)
        settotalPay(total * (1 + VAT))
    }
    const handleCheckOut = async () => {
        if (!user.isLogin) {
            toast.error('Xin đăng nhập trước khi sử dụng chức năng này !')
            return
        }
        if (!isPayDirected) {
            if (isShip && addressValue === '') {
                toast.error('Vui lòng nhập địa chỉ giao hàng !')
                return
            }
            // Chuyển đến VNPay
            try {
                handlePayByVNPay()
            } catch (err) {
                console.error(err)
            }
            return
        } else {
            if (isShip) {
                if (addressValue === '') {
                    toast.error('Vui lòng nhập địa chỉ giao hàng !')
                    return
                }
                try {
                    // trả trực tiếp tại ship xong
                    const checkoutPayAtHome = async () => {
                        const resCheckOut = await checkOutImmediately({
                            id: cartProduct._id,
                            quantity: cartProduct.dishAmount,
                            discount: '',
                        })
                        if (resCheckOut === true) {
                            toast.success('Tạo đơn hàng thành công!')
                        }
                    }
                    checkoutPayAtHome()
                } catch (error) {}
            } else {
                // trả trực tiếp tại quầy xong
                setdisplayPaymentModal(true)
            }
        }
    }
    const handlePayByVNPay = async () => {
        try {
            const data = await payAction.paymentByVNPay()
            window.open(data)
        } catch (error) {}
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id !== null) {
                    const res = await getProductById(id)
                    setProduct(res)
                } else console.log('Error: DishId is null')
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])
    useEffect(() => {
        if (product && quantity) {
            setCartProduct({
                _id: product._id,
                dishName: product.dishName,
                dishPrice: product.dishPrice,
                dishImages: product.dishImages,
                dishAmount: parseInt(quantity || '0', 10),
            })
            calculateTotal()
        }
    }, [product, quantity])

    return (
        <div>
            <div className="w-fit py-5">
                <Link className="flex items-center hover:text-primary " href={'/product'}>
                    <ArrowBackIosIcon />
                    Quay lại trang sản phẩm
                </Link>
            </div>
            <div className="flex flex-row justify-between gap-10 px-20">
                <div className="flex w-2/3 flex-col">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <h3 className="py-5 text-2xl text-primary">
                                <LocationOnIcon className="size-8 pr-1" />
                                Cách nhận hàng
                            </h3>
                            <ShippingOptionButtons
                                state={isShip}
                                updateStateTrue={toggleShipTrue}
                                updateStateFalse={toggleShipFalse}
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="py-5 text-2xl text-primary">
                                <PaymentsIcon className="size-8 pr-1" />
                                Phương thức thanh toán
                            </h3>
                            <PaymentOptionButtons
                                isShip={isShip}
                                isPayDirected={isPayDirected}
                                updateStateTrue={togglePayDirectTrue}
                                updateStateFalse={togglePayDirectFalse}
                            />
                        </div>
                        {isShip && (
                            <div className="flex flex-col">
                                <h3 className="py-5 text-2xl text-primary">
                                    <LocationOnIcon className="size-8 pr-1" />
                                    Địa chỉ giao hàng
                                </h3>
                                <div
                                    className={`${style.inputDiv} ${isExistAddress ? style.active : ''}`}
                                >
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
                </div>
                <div className="flex w-1/3 flex-col items-center">
                    <section className="flex w-full flex-col rounded-xl bg-[#fff7ed] p-3">
                        <div className="flex flex-row justify-between py-3">
                            <h3 className="text-xl font-semibold text-primary">Cart</h3>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <CartProductItem
                                    dish={cartProduct}
                                    quantity={parseInt(quantity || '0')}
                                />
                            </div>
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
                                product={cartProduct}
                            />
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}
export default PaymentPage
