import dayjs, { Dayjs } from 'dayjs'
import { formatCurrency } from '~/lib/utils'

type Props = {
    billId: string
    time: string
    name: string
    price: number
    status: boolean
    onStatusClick: () => void
}

export default function SaleDetail({ billId, time, name, price, status, onStatusClick }: Props) {
    return (
        <tr>
            <td className="border-b border-gray-200 text-left">
                <input className="mr-6" type="checkbox" />
            </td>
            <td className="border-b border-gray-200 py-4 text-center text-lg text-primary">
                {billId}
            </td>
            <td className="border-b border-gray-200 py-4 text-center">
                <p>{dayjs(time).format('DD/MM/YYYY')}</p>
                <p>({dayjs(time).format('HH:mm')})</p>
            </td>
            <td className="border-b border-gray-200 py-4 text-center">{name}</td>
            <td className="border-b border-gray-200 py-4 text-right">
                <center>{formatCurrency(price)}</center>
            </td>
            <td className="border-b border-gray-200 py-4 text-center">
                {status === false ? (
                    <span
                        className="cursor-pointer text-nowrap rounded-full bg-red-100 px-1 py-2 text-base text-red-800 hover:underline"
                        onClick={onStatusClick}
                    >
                        Chưa thanh toán
                    </span>
                ) : (
                    <span className="text-nowrap rounded-full bg-green-100 px-1 py-2 text-base text-green-800">
                        Đã thanh toán
                    </span>
                )}
            </td>
        </tr>
    )
}
