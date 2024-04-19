'use client'

import React from 'react'
import clsx from 'clsx'

type Props = {
    title: string
    data: any[]
    onTableClick: (value: any) => void
}

export default function ReservationGroup({ title, data, onTableClick }: Props) {
    return (
        <div className="flex w-96 flex-col items-center gap-4 border border-primary p-4 pb-8">
            <p className="font-bold">{title}</p>
            <div className="grid grid-cols-4 flex-wrap justify-center gap-5">
                {data.map((value) => (
                    <ReservationItem
                        key={value.id}
                        name={value.tablePosition}
                        status={value.tableStatus}
                        onClick={() => onTableClick(value)}
                    />
                ))}
            </div>
        </div>
    )
}

type ReservationItemProps = {
    name: string
    status: string
    onClick: () => void
}

function ReservationItem({ name, status, onClick }: ReservationItemProps) {
    return (
        <button
            disabled={status === 'Occupied'}
            className={clsx(
                'flex h-10 w-16 items-center justify-center rounded border-none bg-[#ECECEC] transition-opacity hover:opacity-80',
                {
                    'bg-unreserve text-white': status === 'Occupied',
                    'bg-reserved text-white': status === 'Chose',
                },
            )}
            onClick={onClick}
        >
            {name}
        </button>
    )
}

export function ReservationExp() {
    return (
        <div className="flex flex-col gap-4">
            <div className="mt-2 flex flex-row gap-4">
                <div className="flex flex-row items-center gap-1">
                    <div className="h-6 w-6 rounded border border-second bg-reserved"></div>
                    <p>Đang được chọn</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="h-6 w-6 rounded border border-second bg-unreserve"></div>
                    <p>Đã được đặt</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="h-6 w-6 rounded border border-second bg-[#ECECEC]"></div>
                    <p>Trống</p>
                </div>
            </div>

            <div className="flex flex-row gap-2">
                <p className="font-bold text-primary">*Lưu ý:</p>
                <p className="font-bold">Chỉ được chọn 1 bàn / 1 lần.</p>
            </div>
        </div>
    )
}
