import Link from 'next/link'
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { formatCurrency } from '~/lib/utils'
import { LoadingSpinner } from '~/components/Spinner'
import { useRouter } from 'next/navigation'
import { checkOutCart, checkOutImmediately } from '~/services/axios/actions/payment.action'
import { cartReset } from '~/services/axios/actions/cart.action'
import { toast } from 'react-toastify'
import { CartProduct } from '~/interfaces/cart.type'
import { remove } from 'lodash'
import { useCart } from '~/stores/cart/useCart'

const PaymentModal = ({
    userName,
    totalPay,
    product,
    closeModal,
}: {
    userName: string
    totalPay: number
    product: CartProduct
    closeModal: () => void
}) => {
    const router = useRouter()
    const imageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${userName}_${totalPay};size=100x100`
    const [downLoadURL, setDownLoadURL] = useState('')
    const [isLoaded, setisLoaded] = useState(false)
    const { removeAll } = useCart()
    const handleClose = () => {
        closeModal()
        try {
            const checkoutDirectAtCashRegister = async () => {
                const res =
                    product._id !== ''
                        ? await checkOutImmediately({
                              id: product._id,
                              quantity: product.dishAmount,
                              discount: '',
                          })
                        : await checkOutCart()
                console.log(res)
                if (res === true) {
                    if (product._id === '') {
                        removeAll()
                    }
                    toast.success('Tạo đơn hàng thành công !')
                    router.replace('/')
                }
            }
            checkoutDirectAtCashRegister()
        } catch (err) {
            console.error(err)
        }
    }
    const handleLoadImg = () => {
        setisLoaded(true)
    }
    // const handleDownload = () => {
    //     fetch(imageUrl)
    //         .then((response) => response.blob())
    //         .then((blob) => {
    //             const url = window.URL.createObjectURL(new Blob([blob]))
    //             setDownLoadURL(url)
    //         })
    //         .catch((error) => console.error('Error downloading image: ', error))
    // }
    return (
        <>
            <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-slate-700 opacity-70"></div>
            <div className="fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2 overflow-hidden rounded-lg bg-gray-100 p-5">
                <div>
                    <p>Tài khoản: {userName}</p>
                    <p>Thanh toán: {formatCurrency(totalPay)} VND</p>
                </div>
                {!isLoaded && <LoadingSpinner />}
                <div className="flex items-center justify-center">
                    <img src={imageUrl} alt="QR thanh toán." onLoad={handleLoadImg} />
                </div>
                <div>
                    <p>Xin quý khách hãy thanh toán tại quầy bằng QR này.</p>
                    <p>
                        Bếp UIT xin cảm ơn quý khách <FavoriteIcon className="text-red-500" />
                    </p>
                </div>
                <div className="flex w-full justify-end">
                    {/* <Link href={imageUrl} passHref>
                    <a download="payQR.jpg">
                    <button>Lưu mã QR về máy</button>
                    </a>
                </Link> */}
                    <button
                        className="rounded-md bg-primary px-3 py-1 text-white hover:opacity-70"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}

export default PaymentModal
