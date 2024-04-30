'use client'
import { toast } from 'react-toastify'
import { Product } from '~/interfaces/product.type'
import { useCart } from '~/stores/cart/useCart'
import styles from '~/styles/product_detail.module.scss'

function ProductDetailButtons({ product }: { product: Product }) {
    const addProduct = useCart((state) => state.addProduct)
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
                <button className={styles['detail__btn']}>Mua ngay</button>
            </div>
        </>
    )
}

export default ProductDetailButtons
