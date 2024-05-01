'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { CartProduct } from '~/interfaces/cart.type'
import { Product } from '~/interfaces/product.type'
import { useAuth } from '~/stores/auth'
import { useCart } from '~/stores/cart/useCart'
import styles from '~/styles/product_detail.module.scss'
import { addProductToCart } from '~/services/axios/actions/cart.action'

function ProductDetailButtons({ product }: { product: Product }) {
    const { cartList, addProduct, incQuantity } = useCart()
    const { isLogin } = useAuth()
    const router = useRouter()

    const handleAddProductToCart = async () => {
        if (!isLogin) {
            router.push('/login')
            return
        }

        const existingProduct: CartProduct | undefined = cartList.find(
            (item) => item._id === product?._id,
        )
        const newCartProduct: CartProduct = {
            _id: product?._id,
            dishName: product?.dishName,
            dishPrice: product?.dishPrice,
            dishImages: product?.dishImages,
            dishAmount: 1,
        }

        if (existingProduct) {
            if (existingProduct?.dishAmount === 5) {
                toast.warning('Không được thêm quá 5 sản phẩm cùng loại')
                return
            }
            incQuantity(newCartProduct)
        } else {
            addProduct(newCartProduct)
        }

        toast.success('Sản phẩm đã được thêm vào giỏ hàng')

        await addProductToCart(product?._id)
    }

    return (
        <>
            <div className={styles['btn__container']}>
                <button
                    className={`${styles['detail__btn']} ${styles.primary}`}
                    onClick={handleAddProductToCart}
                >
                    Thêm vào giỏ hàng
                </button>
                <button className={styles['detail__btn']}>Mua ngay</button>
            </div>
        </>
    )
}

export default ProductDetailButtons
