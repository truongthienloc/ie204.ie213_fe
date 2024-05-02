'use client'

import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import useSocket from '~/hooks/useSocket.hook'
import { Table } from '~/interfaces/table.type'
import tableAction from '~/services/axios/actions/table.action'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { DatePicker } from '@mui/x-date-pickers'
import { BookingDetail } from '~/components/AdminPage/ManageBooking/BookingDetail'
import { AddTableModal } from '~/components/Modal/AddTableModal'
import { getUniqueTableFloors } from '~/helpers/convert/reservation.convert'

type TableWithCheckbox = Table & {
    isCheck: boolean
}

type Props = {}

export default function ManageBookingPage({}: Props) {
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalRemove, setShowModalRemove] = useState(false)
    const [showModalCancel, setShowModalCancel] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [bookingData, setBookingData] = useState<TableWithCheckbox[]>([])
    const [addingTableName, setAddingTableName] = useState('')
    const [addingTableFloor, setAddingTableFloor] = useState<string | null>('')

    const { socket } = useSocket()

    const fetchBooking = async () => {
        try {
            const res = await tableAction.getAllTable()
            const booking = res.map((value) => ({ ...value, isCheck: false }))

            console.log(res)

            setBookingData(booking)
        } catch (error) {}
    }
    useEffect(() => {
        fetchBooking()
    }, [])

    useEffect(() => {
        if (socket) {
            function handleCancelTable(message: string, tableId: number) {
                if (message === 'Cancel table successfully') {
                    toast.success('Hủy đặt bàn thành công')
                    fetchBooking()
                } else if (
                    message === 'Invalid tableId or userId' ||
                    message === 'Table not found' ||
                    message === 'Table is already available' ||
                    message === "you don't have permission to cancel this table"
                ) {
                    toast.error('Hủy đặt bàn thất bại')
                } else if (message === 'A table has been canceled') {
                    fetchBooking()
                }
            }

            function handleBookingTable(message: string, tableId: number) {
                if (message === 'A table has been booked') {
                    fetchBooking()
                }
            }

            socket.on('CANCEL_TABLE', handleCancelTable)
            socket.on('BOOK_TABLE', handleBookingTable)

            return () => {
                socket.off('CANCEL_TABLE', handleCancelTable)
                socket.off('BOOK_TABLE', handleBookingTable)
            }
        }
    }, [socket])

    const handleCheck = (id: string) => {
        const booking = bookingData.find((value) => value._id === id)
        if (!booking) {
            return
        }
        booking.isCheck = !booking.isCheck
        setBookingData([...bookingData])
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const handleCancelClick = () => {
        if (bookingData.some((value) => value.isCheck)) {
            setShowModalCancel(true)
        } else {
            toast.error('Bạn vẫn chưa chọn bàn muốn hủy')
        }
    }

    const handleAddTableSubmit = async () => {
        if (addingTableName === '') {
            toast.error('Không được để trống tên bàn')
            return
        }
        if (!addingTableFloor || addingTableFloor === '') {
            toast.error('Không được để trống vị trí')
            return
        }

        try {
            const res = await toast.promise(
                tableAction.postNewTable({
                    tableFloor: addingTableFloor,
                    tablePosition: addingTableName,
                    tableStatus: 'Available',
                }),
                {
                    pending: 'Đang thêm bàn',
                    success: 'Thêm bàn thành công',
                    error: 'Thêm bàn thất bại',
                },
            )

            await fetchBooking()
            setAddingTableFloor('')
            setAddingTableName('')
            setShowModalAdd(false)
        } catch (error) {}
    }

    const handleBookingCancel = () => {
        if (!socket) {
            toast.error('Hủy đặt bàn thất bại')
        }
        try {
            const checkedBooking = bookingData.filter((value) => value.isCheck)

            checkedBooking.forEach((booking) => {
                socket?.emit('CANCEL_TABLE', { tableId: booking._id })
            })

            setShowModalCancel(false)
        } catch (error) {}
    }

    return (
        <div className="h-full w-[1200px] bg-[#f8f8f8] pl-10 pt-9">
            <div className="">
                <div className="flex justify-between">
                    <p className="text-2xl font-normal text-primary">Quản lý đặt bàn</p>
                    {/* <Link to="/admin/notification">
                        <img src={iconNotification} alt="" className="hover:cursor-pointer" />
                    </Link> */}
                </div>
                <div className="mt-9 flex gap-20 text-lg font-normal text-second">
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="relative flex"
                    >
                        <div className="flex cursor-pointer items-center gap-3">
                            <span>Tình trạng</span>
                            <ExpandMoreRoundedIcon />
                        </div>

                        {isHovered && (
                            <div className=" absolute left-0 top-full flex flex-col gap-[6px]">
                                <p
                                    className="flex cursor-pointer justify-center rounded-xl border-[2px] border-primary
							 bg-white px-5 py-1 text-primary
							 hover:bg-primary hover:text-white focus:outline-none "
                                >
                                    Đã đặt
                                </p>
                                <p
                                    className="flex cursor-pointer justify-center rounded-xl border-[2px] border-primary
							 bg-white px-5 py-1 text-primary
							 hover:bg-primary hover:text-white focus:outline-none "
                                >
                                    Trống
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex cursor-pointer items-center gap-3 ">
                        <span>Ngày đặt</span>
                        <div className="">
                            <DatePicker format="DD/MM/YYYY" className="bg-third" />
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button
                            className="h-min bg-primary px-4 py-1 text-white"
                            onClick={() => toast.info('Chức năng chưa được hỗ trợ')}
                        >
                            LỌC
                        </button>
                    </div>
                </div>
            </div>
            <div className="mb-16 mt-6 rounded-3xl border-8 border-third bg-third px-3">
                <div className="grid ">
                    <table className="bg-third text-lg ">
                        <thead className="text-primary ">
                            <tr>
                                <th className="border-b border-gray-200 px-4 py-4 text-center">
                                    Mã bàn
                                </th>
                                <th className="border-b border-gray-200 px-4 py-4 text-center">
                                    Tên bàn
                                </th>
                                <th className="border-b border-gray-200 px-4 py-4 text-center">
                                    Vị trí
                                </th>
                                <th className="border-b border-gray-200 px-4 py-4 text-center">
                                    Tình trạng
                                </th>
                                <th className="border-b border-gray-200 px-4 py-4 text-center">
                                    Thời gian đặt
                                </th>
                                <th className="border-b border-gray-200 px-4 py-4 text-center">
                                    Số lượng khách
                                </th>
                                <th className="border-b border-gray-200 px-4 py-4 text-center">
                                    Tên
                                </th>
                                <th className="border-b border-gray-200 px-4 py-4 text-center">
                                    Số điện thoại
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingData.map((booking) => (
                                <BookingDetail
                                    key={booking._id}
                                    id={booking._id}
                                    isCheck={booking.isCheck}
                                    tableName={booking.tablePosition}
                                    tableFloor={booking.tableFloor}
                                    status={booking.tableStatus}
                                    time={booking.user?.bookingTime}
                                    clientName={booking.user?.username}
                                    // email={booking.users[0].email}
                                    onCheck={() => handleCheck(booking._id)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pl-18 mb-10 mt-40 flex justify-between text-xl font-normal ">
                    <div className=" flex gap-9 ">
                        <button
                            className="h-[50px] rounded-2xl border-[3px] border-primary  bg-white px-8 py-2 text-primary hover:border-primary hover:bg-primary 
						hover:text-white focus:outline-none"
                            onClick={() => setShowModalAdd(true)}
                        >
                            Thêm bàn
                        </button>

                        <button
                            className=" h-[50px] rounded-2xl border-[3px] border-primary bg-white px-9 py-2 text-primary hover:border-primary hover:bg-primary 
						hover:text-white focus:outline-none"
                            onClick={() => toast.info('Chức năng chưa được hỗ trợ')}
                        >
                            Xóa bàn
                        </button>
                    </div>
                    <div>
                        <button
                            className="mr-8 h-[50px] rounded-2xl border-[3px] border-primary bg-white px-8 py-2 text-primary hover:border-primary hover:bg-primary 
						hover:text-white focus:outline-none"
                            onClick={() => {
                                handleCancelClick()
                            }}
                        >
                            Hủy đặt bàn
                        </button>
                        {showModalCancel ? (
                            <div>
                                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                                    <div className="relative my-6">
                                        {/*content*/}
                                        <div className="relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex  justify-center p-5">
                                                <h3 className="text-2xl font-medium text-primary ">
                                                    Hủy bàn đã được đặt
                                                </h3>
                                            </div>
                                            {/*body*/}
                                            <div className="mt-4 flex flex-col justify-center gap-4 px-7"></div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end rounded-b p-6">
                                                <button
                                                    className=" background-transparent mb-1 mr-4 border-2 border-primary bg-white  px-6 py-2 text-sm font-bold uppercase text-primary 
													outline-none transition-all duration-150 ease-linear hover:border-primary hover:bg-primary hover:text-white focus:outline-none"
                                                    type="button"
                                                    onClick={() => setShowModalCancel(false)}
                                                >
                                                    Hủy
                                                </button>
                                                <button
                                                    className="mb-1 mr-1  rounded-lg border-2 border-primary bg-white px-4 py-2 text-sm font-bold uppercase text-primary outline-none transition-all  duration-150 ease-linear hover:border-primary hover:bg-primary hover:text-white focus:outline-none"
                                                    type="button"
                                                    onClick={() =>
                                                        // setShowModalCancel(false)
                                                        handleBookingCancel()
                                                    }
                                                >
                                                    Xác nhận
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
            </div>
            <AddTableModal
                isOpen={showModalAdd}
                onClose={() => setShowModalAdd(false)}
                tablePosition={addingTableName}
                onChangeTablePosition={(e) => setAddingTableName(e.target.value)}
                tableFloor={addingTableFloor}
                onChangeTableFloor={(e, value) => setAddingTableFloor(value)}
                floorOptions={getUniqueTableFloors(bookingData)}
                onSubmit={handleAddTableSubmit}
            />
            {/* <DeleteTableModal
                isOpen={showModalRemove}
                onClose={() => setShowModalRemove(false)}
                onSubmit={() => toast.info('Chức năng này chưa được hỗ trợ')}
            /> */}
        </div>
    )
}
