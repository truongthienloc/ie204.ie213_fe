'use client'
import { useCallback, useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Link from 'next/link'
import { CartItem, RecommendedItem } from '~/components/CartItem'
import { Product } from '~/interfaces/product.type'
import { getProducts } from '~/services/axios/actions/product.action'
import { useCart } from '~/stores/cart/useCart'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import cartEmptyIMG from '../../../../public/images/empty-cart.webp'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Spinner } from '~/components/Spinner'
import { removeCartProduct } from '~/services/axios/actions/cart.action'

import styles from '~/styles/cart.module.scss'
import { formatCurrency } from '~/lib/utils'
import { CartProduct } from '~/interfaces/cart.type'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const CartPage = () => {
    const [recommendDishes, setRecommendDishes] = useState<Product[]>([])
    const [totalPrice, setTotalPrice] = useState(0)
    const { cartList, total, removeProduct } = useCart()
    const [isLoading, setIsLoading] = useState(true)
    const [currentProduct, setCurrentProduct] = useState<CartProduct | null>()

    const updateTotalPrice = useCallback(() => {
        const total = cartList.reduce((sum, product) => {
            return sum + product?.dishAmount * product?.dishPrice
        }, 0)
        setTotalPrice(total)
    }, [cartList])

    const handleDeleteProduct = async () => {
        if (currentProduct) {
            removeProduct(currentProduct)
            try {
                await removeCartProduct(currentProduct?._id)
                setCurrentProduct(null)
            } catch (err) {
                console.error(err)
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const products: Product[] = await getProducts()
            setRecommendDishes(products)
            updateTotalPrice()
            setIsLoading(false)
        }
        fetchData()
    }, [updateTotalPrice])

    return (
        <>
            <RecommendedItem dishes={recommendDishes} />
            <div className="inner mt-header-height mx-auto box-border min-h-screen overflow-x-hidden text-second">
                {!isLoading ? (
                    <div className="flex flex-col pb-5">
                        <div className="w-fit py-5">
                            <Link
                                className="flex items-center text-lg hover:text-primary "
                                href={'/product'}
                            >
                                <ArrowBackIosIcon />
                                Tiếp tục xem sản phẩm
                            </Link>
                        </div>

                        {!cartList.length ? (
                            <>
                                <div className=" flex flex-col items-center justify-center py-10">
                                    <span className={styles.text}>Giỏ hàng của bạn đang trống</span>
                                    <img src={cartEmptyIMG.src} alt="Giỏ hàng trống" />
                                </div>
                            </>
                        ) : (
                            <>
                                <TableContainer
                                    component={Paper}
                                    className="flex justify-center shadow-none"
                                >
                                    <Table className="w-full" aria-label="customized table">
                                        <TableHead className={styles['table_header']}>
                                            <TableRow>
                                                <StyledTableCell className="w-[200px]">
                                                    Món ăn
                                                </StyledTableCell>
                                                <StyledTableCell>Tên món ăn</StyledTableCell>
                                                <StyledTableCell>Đơn giá</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Số lượng
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Thành tiền
                                                </StyledTableCell>
                                                <StyledTableCell>Hủy chọn</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cartList.map((cartItem) => (
                                                <CartItem
                                                    key={cartItem?._id}
                                                    product={cartItem}
                                                    updateTotalPrice={updateTotalPrice}
                                                    setCurrentProduct={setCurrentProduct}
                                                    handleDeleteProduct={handleDeleteProduct}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div className={`row ${styles.totalWrapper}`}>
                                    <div className={`${styles.total} col lg-6 md-6 sm-6`}>
                                        <div className="flex flex-row gap-8">
                                            <h3 className="min-w-[120px] text-xl font-semibold text-primary">
                                                Cart
                                            </h3>
                                            <p>{total} sản phẩm</p>
                                        </div>
                                        <div className="flex flex-row gap-8">
                                            <p className="min-w-[120px]">Tổng số tiền</p>
                                            <strong>{formatCurrency(totalPrice)} VNĐ</strong>
                                        </div>
                                    </div>
                                    <Link
                                        href={'/payment'}
                                        className={`${styles['checkout_btn']} col lg-6 md-6 sm-6`}
                                    >
                                        <div className="ml-auto rounded-lg bg-primary px-8 py-3 text-xl text-white transition-all hover:opacity-90">
                                            Tiến hành thanh toán
                                        </div>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <Spinner />
                )}
            </div>
        </>
    )
}

export default CartPage
