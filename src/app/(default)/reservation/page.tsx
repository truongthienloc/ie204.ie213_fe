'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { ReservationGroup, ReservationExp } from '~/components/ReservationGroup'
import { ReservationForm } from '~/components/ReservationForm'
import { toast } from 'react-toastify'
import dayjs, { Dayjs } from 'dayjs'
// import { generateTablesData } from '~/helpers/randoms/fakeTable.random'
import { groupDataByTableFloor } from '~/helpers/convert/reservation.convert'
import { Table, Tables } from '~/interfaces/table.type'
import tableAction from '~/services/axios/actions/table.action'
import useSocket from '~/hooks/useSocket.hook'
import { useAuth } from '~/stores/auth'
import { useRouter } from 'next/navigation'

// const tableData = generateTablesData(20)

type Props = {}

export default function ReservationPage({}: Props) {
    const { socket } = useSocket()
    const [tableData, setTableData] = useState<Tables>([])
    const [tableId, setTableId] = useState<string | null>(null)
    const [date, setDate] = useState<Dayjs | null>(null)
    const [time, setTime] = useState<Dayjs | null>(null)
    const [count, setCount] = useState('')
    const [tableName, setTableName] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const auth = useAuth()
    const router = useRouter()

    useEffect(() => {
        async function fetchTable() {
            try {
                const res = await tableAction.getAllTable()
                setTableData(res)
            } catch (error) {}
        }
        fetchTable()
    }, [])

    useEffect(() => {
        if (auth.isLoading) {
            return
        }
        if (!auth.isLogin) {
            router.replace('/login')
            toast.info('Bạn cần phải đăng nhập để sử dụng chức năng này')
        }
    }, [auth])

    useEffect(() => {
        if (socket) {
            function handleBookFail(message: string, tableId: string) {
                if (message === 'Table is already booked') {
                    toast.error('Bàn không có sẵn')
                }
            }

            socket.on('BOOK_TABLE', handleBookFail)

            return () => {
                socket.off('BOOK_TABLE', handleBookFail)
            }
        }
    }, [socket])

    useEffect(() => {
        if (socket) {
            function handleBookSuccess(message: string, { tableId }: { tableId: string }) {
                if (message === 'Book table successfully') {
                    // User book successfully
                    toast.success('Đặt bàn thành công')
                    const newTable = tableData.map((value) =>
                        value._id !== tableId
                            ? value
                            : ({ ...value, tableStatus: 'Occupied' } as Table),
                    )
                    setTableId(null)
                    setIsOpen(false)
                    setTableData(newTable)
                } else if (message === 'A table has been booked') {
                    // Broadcast book successfully
                    const newTable = tableData.map((value) =>
                        value._id !== tableId
                            ? value
                            : ({ ...value, tableStatus: 'Occupied' } as Table),
                    )
                    setTableData(newTable)
                }
            }

            function handleCancelSuccess(message: string, { tableId }: { tableId: string }) {
                if (message === 'A table has been canceled') {
                    // Broadcast cancel successfully
                    const newTable = tableData.map((value) =>
                        value._id !== tableId
                            ? value
                            : ({ ...value, tableStatus: 'Available' } as Table),
                    )
                    setTableData(newTable)
                }
            }

            socket.on('BOOK_TABLE', handleBookSuccess)
            socket.on('CANCEL_TABLE', handleCancelSuccess)

            return () => {
                socket.off('BOOK_TABLE', handleBookSuccess)
                socket.off('CANCEL_TABLE', handleCancelSuccess)
            }
        }
    }, [socket, tableData])

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => setCount(e.target.value)
    const handleClose = () => {
        const newTableData = tableData.map((value) =>
            value._id !== tableId ? value : { ...value, tableStatus: 'Available' },
        )
        // setTableData(newTableData)
        setIsOpen(false)
    }

    const handleSubmit = () => {
        if (socket) {
            if (!date || !time) {
                toast.error('Không được để trống thời gian')
                return
            }
            const bookingTime = `${dayjs(date).format('YYYY-MM-DD')} ${dayjs(time).format(
                'HH:mm:ss',
            )}`
            socket.emit('BOOK_TABLE', {
                tableId: tableId,
                bookingTime: dayjs(new Date(bookingTime)).toISOString(),
            })
        }
    }

    const handleTableClick = (data: Table) => {
        const newTableData = tableData.map((value) =>
            value._id !== data._id ? value : ({ ...value, tableStatus: 'Chose' } as Table),
        )
        setTableData(
            newTableData.map((value) =>
                value._id !== tableId ? value : { ...value, tableStatus: 'Available' },
            ),
        )
        setTableId(data._id)
        setDate(null)
        setTime(null)
        setCount('')
        setTableName(data.tablePosition)
        setIsOpen(true)
    }

    const groupData = useMemo(() => groupDataByTableFloor(tableData), [tableData])

    return (
        <div className="grid grid-cols-2 p-8">
            <div className="flex flex-col items-center gap-4">
                {groupData.length > 0 &&
                    groupData.map((floorData) => (
                        <ReservationGroup
                            key={floorData[0].tableFloor}
                            title={floorData[0].tableFloor}
                            data={floorData}
                            onTableClick={handleTableClick}
                        />
                    ))}

                <ReservationExp />
            </div>
            <div className="flex flex-col pt-16">
                <ReservationForm
                    isOpen={isOpen}
                    date={date}
                    time={time}
                    count={count}
                    tableName={tableName}
                    onDateChange={setDate}
                    onTimeChange={setTime}
                    onCountChange={handleCountChange}
                    onSubmit={handleSubmit}
                    onClose={handleClose}
                />
            </div>
        </div>
    )
}
