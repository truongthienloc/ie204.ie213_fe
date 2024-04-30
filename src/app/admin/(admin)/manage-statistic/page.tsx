'use client'

import * as React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts'

const chartSetting = {
    yAxis: [
        {
            label: 'Doanh thu ( triệu đồng )',
        },
    ],
    width: 500,
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-10px, 0)',
        },
    },
}
const dataset = [
    {
        'Thực đơn chính': 32.8,
        'Tráng miệng': 7.6,
        'Thức uống': 13.1,
        month: 'Tháng 1',
    },
    {
        'Thực đơn chính': 40.1,
        'Tráng miệng': 6.8,
        'Thức uống': 12.3,
        month: 'Tháng 2',
    },
    {
        'Thực đơn chính': 34.1,
        'Tráng miệng': 8.3,
        'Thức uống': 14.2,
        month: 'Tháng 3',
    },
    {
        'Thực đơn chính': 40.9,
        'Tráng miệng': 11.1,
        'Thức uống': 17.3,
        month: 'Tháng 4',
    },
    {
        'Thực đơn chính': 39.6,
        'Tráng miệng': 8.2,
        'Thức uống': 12.6,
        month: 'Tháng 5',
    },
    {
        'Thực đơn chính': 27.6,
        'Tráng miệng': 5.1,
        'Thức uống': 8.2,
        month: 'Tháng 6',
    },
    {
        'Thực đơn chính': 30.5,
        'Tráng miệng': 8.3,
        'Thức uống': 10.4,
        month: 'Tháng 7',
    },
    {
        'Thực đơn chính': 35.4,
        'Tráng miệng': 9.8,
        'Thức uống': 6.3,
        month: 'Tháng 8',
    },
    {
        'Thực đơn chính': 42.6,
        'Tráng miệng': 12.1,
        'Thức uống': 11.5,
        month: 'Tháng 9',
    },
    {
        'Thực đơn chính': 36.5,
        'Tráng miệng': 8.4,
        'Thức uống': 12.6,
        month: 'Tháng 10',
    },
    {
        'Thực đơn chính': 45.2,
        'Tráng miệng': 10.5,
        'Thức uống': 18.3,
        month: 'Tháng 11',
    },
    {
        'Thực đơn chính': 60,
        'Tráng miệng': 15.2,
        'Thức uống': 20.6,
        month: 'Tháng 12',
    },
]

const valueFormatter = (value: number) => `${value} triệu`

export default function StatisticPage() {
    return (
        <div className="h-full w-[1200px] bg-[#f8f8f8] pl-10 pt-9">
            <div className=" flex justify-end"></div>

            <div className="mt-10 flex flex-col items-center">
                <BarChart
                    dataset={dataset}
                    xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                    series={[
                        {
                            dataKey: 'Thực đơn chính',
                            label: 'Thực đơn chính',
                            valueFormatter,
                        },
                        { dataKey: 'Tráng miệng', label: 'Tráng miệng', valueFormatter },
                        { dataKey: 'Thức uống', label: 'Thức uống', valueFormatter },
                    ]}
                    {...chartSetting}
                    width={1200}
                    height={500}
                />
                <p className="text-xl font-medium text-primary">Doanh thu của quán hàng tháng</p>
            </div>
        </div>
    )
}
