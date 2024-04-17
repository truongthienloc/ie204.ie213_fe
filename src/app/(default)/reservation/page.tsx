'use client'
import React, { useMemo, useState } from 'react'
import { ReservationGroup, ReservationExp } from '~/components/ReservationGroup'
import { ReservationForm } from '~/components/ReservationForm'
import { toast } from 'react-toastify'
import { api } from '~/services/axios'
import dayjs, { Dayjs } from 'dayjs'
import { generateTablesData } from '~/helpers/randoms/fakeTable.random'
import { groupDataByTableFloor } from '~/helpers/convert/reservation.convert'

const tableData = generateTablesData(20)

type Props = {}

export default function ReservationPage({}: Props) {
    const [tableId, setTableId] = useState(null)
    const [date, setDate] = useState<Dayjs | null>(dayjs())
    const [time, setTime] = useState<Dayjs | null>(dayjs())
    const [count, setCount] = useState('')
    const [tableName, setTableName] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => setCount(e.target.value)
    const handleClose = () => {
        const newTableData = tableData.map((value) =>
            value.id !== tableId ? value : { ...value, tableStatus: 'Available' },
        )
        // setTableData(newTableData)
        setIsOpen(false)
    }

    const handleSubmit = () => {
        // if (socket) {
        // 	if (!date || !time) {
        // 		toast.error('Không được để trống thời gian')
        // 		return
        // 	}
        // 	const bookingTime = `${dayjs(date).format('YYYY-MM-DD')} ${dayjs(time).format(
        // 		'HH:mm:ss'
        // 	)}`
        // 	socket.emit('BOOK_TABLE', {
        // 		table_id: tableId,
        // 		booking_time: dayjs(new Date(bookingTime)).toISOString(),
        // 	})
        // }
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
                            onTableClick={() => {}}
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
