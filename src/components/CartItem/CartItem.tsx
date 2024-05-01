'use client'
import React, { useEffect, useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { CartProduct } from '~/interfaces/cart.type'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { formatCurrency } from '~/lib/utils'
import { decreaseQuantity } from '~/services/axios/actions/cart.action'
import CartModal from '../CartModal'

import styles from '~/styles/cart.module.scss'
import { useCart } from '~/stores/cart/useCart'
import { addProductToCart } from '~/services/axios/actions/cart.action'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

const CartItem = ({
    product,
    updateTotalPrice,
    setCurrentProduct,
    handleDeleteProduct,
}: {
    product: CartProduct
    updateTotalPrice: any
    setCurrentProduct: any
    handleDeleteProduct: any
}) => {
    const { incQuantity, decQuantity } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [isShowModal, setIsShowModal] = useState(false)

    const handleIncreaseQuantity = async () => {
        setQuantity((prev) => prev + 1)
        incQuantity(product)
        updateTotalPrice()
        try {
            await addProductToCart(product?._id)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDecreaseQuantity = async () => {
        setQuantity((prev) => prev - 1)
        decQuantity(product)
        updateTotalPrice()
        try {
            await decreaseQuantity(product?._id)
        } catch (err) {
            console.error(err)
        }
    }

    const handleCloseModal = () => {
        setCurrentProduct(null)
        setIsShowModal(false)
    }

    const handleOpenModal = () => {
        setIsShowModal(true)
        setCurrentProduct(product)
    }

    useEffect(() => {
        setQuantity(product?.dishAmount)
    }, [product?.dishAmount])

    return (
        <>
            <StyledTableRow className={styles['card__wrapper']}>
                <StyledTableCell component="th" scope="row">
                    <img
                        alt="Product image"
                        src={product?.dishImages[0].link}
                        className={styles['card__image']}
                    />
                </StyledTableCell>
                <StyledTableCell className={styles.text}>{product?.dishName}</StyledTableCell>
                <StyledTableCell className={styles.text}>
                    {formatCurrency(product?.dishPrice) + ' VNĐ'}
                </StyledTableCell>
                <StyledTableCell align="center" className={styles.text}>
                    <div className="flex items-center justify-between">
                        <button
                            className={`${styles['card__btn']} ${quantity === 1 ? styles.disabled : ''}`}
                            onClick={handleDecreaseQuantity}
                        >
                            -
                        </button>
                        <p>{quantity}</p>
                        <button
                            className={`${styles['card__btn']} ${quantity === 5 ? styles.disabled : ''}`}
                            onClick={handleIncreaseQuantity}
                            disabled={quantity === 5}
                        >
                            +
                        </button>
                    </div>
                </StyledTableCell>
                <StyledTableCell align="left" className={styles.text}>
                    {formatCurrency(product?.dishPrice * quantity) + ' VNĐ'}
                </StyledTableCell>
                <StyledTableCell>
                    <button className={styles['delete_btn']} onClick={handleOpenModal}>
                        <DeleteOutlineOutlinedIcon />
                    </button>
                </StyledTableCell>
            </StyledTableRow>
            {isShowModal && (
                <CartModal
                    handleClose={handleCloseModal}
                    handleDeleteProduct={() => {
                        handleDeleteProduct()
                        setIsShowModal(false)
                    }}
                />
            )}
        </>
    )
}

export default CartItem
