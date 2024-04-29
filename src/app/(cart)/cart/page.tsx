'use client'
import axios from 'axios'
import { map } from 'lodash'
import { use, useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Link from 'next/link'
import { CartItem, RecommendedItem } from '~/components/CartItem'
import { Product } from '~/interfaces/product.type'
import { getCart } from '~/services/axios/actions/cart.action'
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
        setTotal((preTotal) => {
            return preTotal + total
        })
        return { dishID, imgLink, dishName, dishPrice, quantity, total }
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
    }
    const handleDecQuantity = (id: string) => {
        const item = cart.find((item) => item.product._id === id)
        if (!item) return
        decQuantity(item.product)
    }
    const handleRemoveProduct = (id: string) => {
        const item = cart.find((item) => item.product._id === id)
        if (!item) return
        removeProduct(item.product)
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
    const fetchCart = async () => {
        try {
            const res = await getCart()
            loadCart(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
        fetchCart()
    }, [])
    return (
        <>
            <RecommendedItem dish={Dish} />
            <div className="inner mt-header-height mx-auto box-border min-h-screen overflow-x-hidden text-second">
                <div>
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
                                                    className="w-[150px]"
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
                        </section>
                    </div>
                </div>
                <div className="Total"></div>
            </div>
        </>
    )
}

export default CartPage
