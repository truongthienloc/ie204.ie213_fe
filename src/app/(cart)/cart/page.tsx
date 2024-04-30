'use client'
import axios from 'axios'
import { map } from 'lodash'
import { use, useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Link from 'next/link'
import { CartItem, RecommendedItem } from '~/components/CartItem'
import { Product } from '~/interfaces/product.type'
import { getProducts } from '~/services/axios/actions/product.action'
import { useCart } from '~/stores/cart/useCart'
import { toast } from 'react-toastify'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import cartEmptyIMG from '../../../../public/images/empty-cart.webp'
import { CartProduct as CartProductItem } from '~/components/CartItem'
import { to } from 'react-spring'

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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

const CartPage = () => {
    const [Dish, setDish] = useState<Product[]>([])
    const [Total, setTotal] = useState(0)
    const cart = useCart((state) => state.cartList)
    const cartTotal = useCart((state) => state.total)
    const loadCart = useCart((state) => state.loadProduct)
    const removeProduct = useCart((state) => state.removeProduct)
    const incQuantity = useCart((state) => state.incQuantity)
    const decQuantity = useCart((state) => state.decQuantity)
    const removeAll = useCart((state) => state.removeAll)
    const createData = (
        dishID: string,
        imgLink: string,
        dishName: string,
        dishPrice: number,
        quantity: number,
    ) => {
        let total = dishPrice * quantity
        return { dishID, imgLink, dishName, dishPrice, quantity, total }
    }
    const calcTotal = () => {
        let total = 0
        cart.map((item) => {
            total += item.quantity * item.product.dishPrice
        })
        setTotal(total)
    }
    const rows = cart.map((item) => {
        return createData(
            item.product._id,
            item.product.dishImages[0].link,
            item.product.dishName,
            item.product.dishPrice,
            item.quantity,
        )
    })
    const handleIncQuantity = (id: string) => {
        const item = cart.find((item) => item.product._id === id)
        if (!item) return
        incQuantity(item.product)
        calcTotal()
        toast.success(`Thêm 1 ${item.product.dishName} vào giỏ hàng`)
    }
    const handleDecQuantity = (id: string) => {
        const item = cart.find((item) => item.product._id === id)
        if (!item) return
        decQuantity(item.product)
        calcTotal()
        toast.success(`Xóa 1 ${item.product.dishName} khỏi giỏ hàng`)
    }
    const handleRemoveProduct = (id: string) => {
        const item = cart.find((item) => item.product._id === id)
        if (!item) return
        removeProduct(item.product)
        calcTotal()
        toast.success(`Xóa ${item.product.dishName} khỏi giỏ hàng`)
    }
    const fetchData = async () => {
        try {
            const data = await getProducts()
            setDish(data)
        } catch (error) {
            console.log(error)
            setDish([])
        }
    }
    useEffect(() => {
        fetchData()
        calcTotal()
    }, [])
    return (
        <>
            <RecommendedItem dish={Dish} />
            <div className="inner mt-header-height mx-auto box-border min-h-screen overflow-x-hidden text-second">
                <div className="flex flex-col pb-5">
                    <div className="w-fit py-5">
                        <Link className="flex items-center hover:text-primary " href={'/product'}>
                            <ArrowBackIosIcon />
                            Tiếp tục xem sản phẩm
                        </Link>
                    </div>

                    <div className="CartTable">
                        <section>
                            <TableContainer
                                component={Paper}
                                className="flex justify-center shadow-none"
                            >
                                <Table
                                    className="min-w-[1000px] max-w-[1400px]"
                                    aria-label="customized table"
                                >
                                    <TableHead className="bg-primary text-third">
                                        <TableRow>
                                            <StyledTableCell className="w-[200px]">
                                                Món ăn
                                            </StyledTableCell>
                                            <StyledTableCell>Tên món ăn</StyledTableCell>
                                            <StyledTableCell>Đơn giá</StyledTableCell>
                                            <StyledTableCell align="center">
                                                Số lượng
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                Thành tiền
                                            </StyledTableCell>
                                            <StyledTableCell>Hủy chọn</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((item) => (
                                            <StyledTableRow key={item.dishID}>
                                                <StyledTableCell
                                                    component="th"
                                                    scope="row"
                                                    className="h-[120px]"
                                                >
                                                    <div className="h-full w-full">
                                                        <img
                                                            src={item.imgLink}
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </StyledTableCell>
                                                <StyledTableCell className="uppercase">
                                                    {item.dishName}
                                                </StyledTableCell>
                                                <StyledTableCell>{item.dishPrice}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <div className="flex items-center justify-between">
                                                        <button
                                                            onClick={() =>
                                                                handleDecQuantity(item.dishID)
                                                            }
                                                            className="bg-slate-300 px-3 py-1 hover:opacity-80"
                                                        >
                                                            -
                                                        </button>
                                                        <p>{item.quantity}</p>
                                                        <button
                                                            onClick={() =>
                                                                handleIncQuantity(item.dishID)
                                                            }
                                                            className="bg-slate-300 px-3 py-1 hover:opacity-80"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {item.total}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <button
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            handleRemoveProduct(item.dishID)
                                                        }
                                                        id="cart-remove-button"
                                                    >
                                                        <DeleteIcon className="transition-all hover:text-red-500" />
                                                    </button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {cart.length == 0 && (
                                <div className=" flex flex-col items-center justify-center py-10">
                                    <div className="flex w-full items-center justify-center">
                                        Giỏ hàng của bạn đang trống
                                    </div>
                                    <div>
                                        <img
                                            src={cartEmptyIMG.src}
                                            alt="Giỏ hàng của bạn đang trống. Hãy thêm các sản phẩm vào..."
                                        />
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="Total">
                        <section className="bg-[#f8f8f8c3]">
                            <div className="flex flex-row justify-between">
                                <h3 className="text-xl font-semibold text-primary">Cart</h3>
                                <p>{cartTotal} sản phẩm</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>Tổng số tiền</p>
                                <p>{Total} VND</p>
                            </div>
                            <Link href={'/payment'}>
                                <div className="ml-auto rounded-lg bg-primary px-8 py-3 text-xl text-white transition-all hover:opacity-90">
                                    Tiến hành thanh toán
                                </div>
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage
