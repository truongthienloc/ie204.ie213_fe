import styles from '~/styles/product_detail.module.scss'

function ProductDetailButtons() {
    return (
        <>
            <div className={styles['btn__container']}>
                <button className={`${styles['detail__btn']} ${styles.primary}`}>
                    Thêm vào giỏ hàng
                </button>
                <button className={styles['detail__btn']}>Mua ngay</button>
            </div>
        </>
    )
}

export default ProductDetailButtons
