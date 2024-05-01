'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Product } from '~/interfaces/product.type'
import { useCart } from '~/stores/cart/useCart'
import styles from '~/styles/product_detail.module.scss'
import BuyNowModal from '../Modal/BuyNowModal/BuyNowModal'

function ProductDetailButtons({ product }: { product: Product }) {
    const addProduct = useCart((state) => state.addProduct)
    const [displayModal, setdisplayModal] = useState(false)
    const openModal = () => {
        setdisplayModal(true)
    }
    const closeModal = () => {
        setdisplayModal(false)
    }
    return (
        <>
            <div className={styles['btn__container']}>
                <button
                    className={`${styles['detail__btn']} ${styles.primary}`}
                    onClick={() => {
                        toast.success(`Thêm 1 ${product.dishName} vào giỏ hàng`)
                        addProduct(product)
                    }}
                >
                    Thêm vào giỏ hàng
                </button>
                <button className={styles['detail__btn']} onClick={openModal}>
                    Mua ngay
                </button>
            </div>
            {displayModal && <BuyNowModal product={product} closeModal={closeModal} />}
        </>
    )
}

export default ProductDetailButtons
