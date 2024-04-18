'use client'

import React from 'react'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { OutlinedInput } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'

type Props = {
    isOpen: boolean
    onClose: () => void
    date: Dayjs | null
    onDateChange: (value: Dayjs | null) => void
    time: Dayjs | null
    onTimeChange: (value: Dayjs | null) => void
    count: string
    onCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    tableName: string
    onSubmit: () => void
}

export default function ReservationForm({
    isOpen,
    onClose,
    date,
    onDateChange,
    time,
    onTimeChange,
    count,
    onCountChange,
    tableName,
    onSubmit,
}: Props) {
    return (
        <div className="flex min-w-[425px] flex-col gap-8 rounded border-2 border-primary p-8">
            <div className="flex flex-col gap-4">
                <p className="font-bold">Chọn thời gian đặt bàn:</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="flex flex-row items-center justify-between gap-2">
                        <label htmlFor="" className="flex-1">
                            Chọn ngày:{' '}
                        </label>
                        <DatePicker
                            className="flex-[2]"
                            format="DD/MM/YYYY"
                            value={date}
                            onChange={onDateChange}
                        />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-2">
                        <label htmlFor="" className="flex-1">
                            Chọn giờ:{' '}
                        </label>
                        <TimePicker
                            className="flex-[2]"
                            format="HH:mm"
                            value={time}
                            onChange={onTimeChange}
                        />
                    </div>
                </LocalizationProvider>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-2">
                    <label htmlFor="" className="flex-1 font-bold">
                        Số lượng khách:
                    </label>
                    <OutlinedInput
                        className="flex-[2] [&_input]:text-center"
                        placeholder="0"
                        value={count}
                        onChange={onCountChange}
                    />
                </div>
                <div className="flex flex-row items-center gap-2">
                    <label htmlFor="" className="flex-1 font-bold">
                        Mã bàn:
                    </label>
                    <OutlinedInput
                        className="flex-[2] [&_input]:text-center"
                        placeholder="15"
                        value={tableName}
                        disabled
                    />
                </div>
            </div>
            <button
                className="border-none bg-primary py-2 text-white transition-opacity hover:opacity-80"
                onClick={onSubmit}
            >
                Đặt bàn
            </button>
        </div>
    )
}
