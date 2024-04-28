import dayjs from 'dayjs'
import { TableStatus } from '~/interfaces/table.type'

type Props = {
    id: string
    isCheck: boolean
    tableFloor: string
    tableName: string
    status: TableStatus
    time?: string
    numOfClients?: number
    clientName?: string
    email?: string
    onCheck?: () => void
}

export default function BookingDetail({
    id,
    isCheck,
    tableName,
    tableFloor,
    status,
    time,
    numOfClients,
    clientName,
    email,
    onCheck,
}: Props) {
    return (
        <tr>
            <td className="border-b border-gray-200  px-4 py-4 text-lg text-primary">
                <input className="mr-6" type="checkbox" checked={isCheck} onChange={onCheck} /> {id}
            </td>
            <td className="border-b border-gray-200 px-4 py-4 text-center">{tableName}</td>
            <td className="border-b border-gray-200 px-4 py-4 text-center">{tableFloor}</td>
            <td className="border-b border-gray-200 px-4 py-4 text-center">
                {status === 'Available' ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-base text-green-800">
                        Còn trống
                    </span>
                ) : (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-base text-red-800">
                        Đã được đặt
                    </span>
                )}
            </td>
            <td className="border-b border-gray-200 px-4 py-4 text-center">
                {time ? (
                    <pre className="font-roboto">{`${dayjs(time).format(
                        'DD/MM/YYYY',
                    )}\n${dayjs(time).format('HH:mm')}`}</pre>
                ) : (
                    <div className="m-auto h-[1px] w-10 bg-black"></div>
                )}
            </td>
            <td className="border-b border-gray-200 px-4 py-4 text-center">
                {numOfClients || <div className="m-auto h-[1px] w-10 bg-black"></div>}
            </td>
            <td className="border-b border-gray-200 px-4 py-4 text-center">
                {clientName || <div className="m-auto h-[1px] w-10 bg-black"></div>}
            </td>
            <td className="border-b border-gray-200 px-4 py-4 text-center">
                {email || <div className="m-auto h-[1px] w-10 bg-black"></div>}
            </td>
        </tr>
    )
}
