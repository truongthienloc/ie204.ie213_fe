import styles from '~/styles/cart.module.scss'

function CartModal({ handleDeleteProduct, handleClose }: any) {
    return (
        <>
            <div className={styles['modal__wrapper']}>
                <div className={styles.modal}>
                    <p>Bạn có chắc muốn xóa sản phẩm không ?</p>
                    <div className="flex items-center justify-between gap-8">
                        <button onClick={handleDeleteProduct}>Xóa</button>
                        <button onClick={handleClose}>Hủy</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartModal
