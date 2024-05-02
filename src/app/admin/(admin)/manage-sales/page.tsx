'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import orderAction from '~/services/axios/actions/order.action'
import { SaleDetail } from '~/components/AdminPage/ManageSale/SaleDetail'
import { formatCurrency } from '~/lib/utils'
import { ConformCheckoutModal } from '~/components/AdminPage/ManageSale/ConformCheckoutModal'

export default function ManageSalesPage() {
    const queryClient = useQueryClient()
    const { data: saleData } = useQuery({
        queryKey: ['get-all-bills'],
        queryFn: orderAction.getAllBills,
    })
    const [showModal, setShowModal] = useState(false)
    // state for conform checkout
    const [isOpenConformCheckout, setIsOpenConformCheckout] = useState(false)
    const [conformCheckoutId, setConformCheckoutId] = useState('')
    const [conformCheckoutCustomerName, setConformCheckoutCustomerName] = useState('')

    const [username, setUsername] = useState('')
    const [billId, setBillId] = useState('')
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)

    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value)
    const handleChangeBillId = (e: React.ChangeEvent<HTMLInputElement>) => setBillId(e.target.value)
    const handleChangeStartDate = (date: Dayjs | null) => setStartDate(date)
    const handleChangeEndDate = (date: Dayjs | null) => setEndDate(date)

    const fetchSale = async () => {
        queryClient.invalidateQueries({ queryKey: ['get-all-bills'] })
    }

    console.log('data: ', saleData)

    useEffect(() => {
        fetchSale()
    }, [])

    const totalPayment = useMemo(() => {
        return saleData?.reduce((total, value) => total + value.totalMoney, 0)
    }, [saleData])

    const handleFilterButtonClick = async () => {
        // try {
        //     const res = await toast.promise(
        //         api.get('/bill/all/filter', {
        //             params: {
        //                 username: username !== '' ? username : undefined,
        //                 id: billId !== '' ? billId : undefined,
        //                 fromDay: startDate || undefined,
        //                 toDay: endDate || undefined,
        //             },
        //         }),
        //         {
        //             pending: 'Đang lọc',
        //             success: 'Lọc thành công',
        //             error: 'Lọc thất bại',
        //         },
        //     )
        //     const sale = res.data.data
        //     setSaleData(sale)
        // } catch (error) {}
    }

    const handleCheckoutClick = (id: string, name: string) => {
        setConformCheckoutId(id)
        setConformCheckoutCustomerName(name)
        setIsOpenConformCheckout(true)
    }

    const handleCheckout = async () => {
        try {
            await toast.promise(orderAction.checkoutByAdmin(conformCheckoutId), {
                pending: 'Đang xử lí yêu cầu',
                success: 'Checkout thành công',
                error: 'Đã có lỗi xảy ra',
            })
            queryClient.invalidateQueries({ queryKey: ['get-all-bills'] })
            setIsOpenConformCheckout(false)
        } catch (error) {}
    }

    return (
        <div className="h-full w-[1200px] bg-[#f8f8f8] pl-10 pt-9">
            <div className="">
                <div className="flex justify-between">
                    <p className="text-2xl font-normal text-primary">Thông tin bán hàng</p>
                    {/* <Link to='/admin/notification'>
						<img
							src={iconNotification}
							alt=''
							className='hover:cursor-pointer'
						/>
					</Link> */}
                </div>
                <div className="mt-9 flex gap-6 text-lg font-normal text-second">
                    <div className="flex flex-col gap-5">
                        <p>Khách hàng</p>
                        <input
                            type="text"
                            className="h-[57px] w-[264px]
						 rounded-lg border-2 bg-white py-[18px] pl-6 pr-[30px] outline-0 placeholder:text-second placeholder:opacity-90"
                            placeholder="Nhập tên khách hàng"
                            value={username}
                            onChange={handleChangeUsername}
                        />
                    </div>
                    <div className="flex flex-col gap-5 ">
                        <p>Mã hóa đơn</p>
                        <input
                            type="text"
                            placeholder="Nhập mã hóa đơn"
                            className="h-[57px] w-[264px]
						 rounded-lg border-2 bg-white py-[18px] pl-6 pr-[30px] outline-0 placeholder:text-second placeholder:opacity-90"
                            value={billId}
                            onChange={handleChangeBillId}
                        />
                    </div>
                    <div className="flex flex-col gap-5 ">
                        <p>Ngày bắt đầu</p>
                        {/* <input
							type='text'
							placeholder='Nhập ngày bắt đầu'
							className=' placeholder:opacity-90
						 placeholder:text-second w-[264px] h-[48px] border-2 py-[18px] pl-6 pr-[30px] rounded-lg outline-0'
						/> */}
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={startDate}
                            className="bg-third"
                            onChange={handleChangeStartDate}
                        />
                    </div>
                    <div className="flex flex-col gap-5 ">
                        <p>Ngày kết thúc</p>
                        {/* <input
							type='text'
							placeholder='Nhập ngày kết thúc'
							className=' placeholder:opacity-90
						 placeholder:text-second w-[264px] h-[48px] border-2 py-[18px] pl-6 pr-[30px] rounded-lg outline-0'
						/> */}
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={endDate}
                            className="bg-third"
                            onChange={handleChangeEndDate}
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            className="h-min rounded-xl bg-primary px-4 py-3 text-white transition-opacity hover:opacity-80"
                            onClick={handleFilterButtonClick}
                        >
                            LỌC
                        </button>
                    </div>
                </div>
                <p className="my-2.5 text-lg font-normal text-second ">
                    <span className="text-primary">*</span>Click vào mã hóa đơn để xem chi tiết hóa
                    đơn.{' '}
                </p>
            </div>

            <div className="mb-16 rounded-3xl border-8 border-third bg-third px-3">
                <div className="grid ">
                    <table className="bg-third text-lg ">
                        <thead className="text-primary ">
                            <tr>
                                <th className="border-b border-gray-200 py-4 text-left" />
                                <th className="border-b border-gray-200 py-4 text-center">
                                    Mã hóa đơn
                                </th>
                                <th className="border-b border-gray-200 py-4 text-center">
                                    Thời gian tạo hóa đơn
                                </th>
                                <th className="border-b border-gray-200 py-4 text-center">
                                    Tên khách hàng
                                </th>
                                <th className="border-b border-gray-200 py-4 text-center ">
                                    Tổng thanh toán
                                </th>
                                <th className="border-b border-gray-200 py-4 text-center">
                                    Trạng thái
                                </th>
                                {/* <th className='py-4 text-left border-b border-gray-200'/> */}
                            </tr>
                        </thead>
                        <tbody>
                            {saleData &&
                                saleData.map((sale) => (
                                    <SaleDetail
                                        key={sale._id}
                                        billId={sale._id}
                                        time={sale.createdAt}
                                        name={sale.user.username}
                                        price={sale.totalMoney}
                                        status={sale.billPayed}
                                        onStatusClick={() =>
                                            handleCheckoutClick(sale._id, sale.user.username)
                                        }
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="float-right mt-20 flex gap-3.5 pr-20 text-lg font-medium">
                    <p className="flex items-center">Doanh thu: </p>
                    <p className="border-[3px] border-primary bg-third  px-5 py-2">
                        {formatCurrency(totalPayment ?? 0)} <span>VND</span>
                    </p>
                </div>
                <div className="pl-18 mb-10 mt-40 flex gap-9 text-xl font-normal">
                    <button
                        className=" h-[50px] rounded-2xl border-[3px] border-primary bg-white px-9 py-2 text-primary hover:border-primary hover:bg-primary 
					hover:text-white"
                        onClick={() => {
                            toast.info('Chức năng này chưa được hỗ trợ')
                        }}
                    >
                        Xóa
                    </button>

                    {showModal ? (
                        <div>
                            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                                <div className="relative mx-auto my-6 w-auto max-w-6xl">
                                    {/*content*/}
                                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                                            <h3 className="text-3xl font-semibold text-primary">
                                                4Food
                                            </h3>
                                        </div>
                                        {/*body*/}
                                        <div className="relative grid flex-auto p-6">
                                            <table className="bg-third text-lg ">
                                                <thead className="text-primary ">
                                                    <th className="border-b border-gray-200 px-8 py-4 text-left">
                                                        Mã hóa đơn
                                                    </th>
                                                    <th className="border-b border-gray-200 px-8 py-4 text-left">
                                                        Thời gian tạo hóa đơn
                                                    </th>
                                                    <th className="border-b border-gray-200 px-8 py-4 text-left">
                                                        Tên khách hàng
                                                    </th>
                                                    <th className="border-b border-gray-200 px-8 py-4 text-left">
                                                        Tổng thanh toán
                                                    </th>
                                                    <th className="border-b border-gray-200 px-8 py-4 text-left">
                                                        Trạng thái
                                                    </th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border-b border-gray-200 px-8 py-4 text-lg text-primary">
                                                            <input
                                                                className="mr-6"
                                                                type="checkbox"
                                                            />{' '}
                                                            #Abc1
                                                        </td>
                                                        <td className="border-b border-gray-200 px-8 py-4">
                                                            19:40 - 08/11/2023
                                                        </td>
                                                        <td className="border-b border-gray-200 px-8 py-4">
                                                            Lê Tuấn Anh
                                                        </td>
                                                        <td className="border-b border-gray-200 px-8 py-4">
                                                            159.000 VND
                                                        </td>
                                                        <td className="border-b border-gray-200 px-8 py-4">
                                                            <span className="rounded-full bg-green-100 px-2 py-1 text-base text-green-800">
                                                                Đã thanh toán
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-b border-gray-200 px-8 py-4 text-lg text-primary">
                                                            <input
                                                                className="mr-6"
                                                                type="checkbox"
                                                            />{' '}
                                                            #Abc2
                                                        </td>
                                                        <td className="border-b border-gray-200 px-8 py-4">
                                                            19:40 - 08/11/2023
                                                        </td>
                                                        <td className="border-b border-gray-200 px-8 py-4">
                                                            Lê Tuấn Anh
                                                        </td>
                                                        <td className="border-b border-gray-200 px-8 py-4">
                                                            159.000 VND
                                                        </td>
                                                        <td className="border-b border-gray-200 px-8 py-4 ">
                                                            <span className="rounded-full bg-red-100 px-2 py-1 text-base text-red-800">
                                                                Chưa thanh toán
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        {/*footer*/}
                                        <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                                            <button
                                                className=" background-transparent mb-1 mr-4 border-[3px] border-primary bg-white  px-6 py-2 text-sm font-bold uppercase text-primary 
												outline-none transition-all duration-150 ease-linear hover:border-primary hover:bg-primary hover:text-white focus:outline-none"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                className="mb-1 mr-1  rounded-lg border-[3px] border-primary bg-white px-4 py-2 text-sm font-bold uppercase text-emerald-500 outline-none transition-all duration-150 ease-linear hover:border-primary focus:outline-none active:bg-emerald-600"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Lưu thay đổi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                        </div>
                    ) : null}
                </div>
            </div>

            <ConformCheckoutModal
                isOpen={isOpenConformCheckout}
                id={conformCheckoutId}
                customerName={conformCheckoutCustomerName}
                onClose={() => setIsOpenConformCheckout(false)}
                onSubmit={handleCheckout}
            />
        </div>
    )
}
