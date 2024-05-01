import EditNoteIcon from '@mui/icons-material/EditNote'
import dayjs from 'dayjs'

type Props = {
    id: string
    isCheck: boolean
    name: string
    description: string
    percent: number
    startDay: string
    endDay: string
    onEditClick?: () => void
    onCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function DiscountDetail({
    id,
    name,
    isCheck,
    description,
    percent,
    startDay,
    endDay,
    onEditClick,
    onCheck,
}: Props) {
    return (
        <tr>
            <td className="border-b border-gray-200 px-2 py-4">
                <input className="" type="checkbox" checked={isCheck} onChange={onCheck} />
            </td>
            <td className="border-b border-gray-200 px-2 py-4 text-center text-lg text-primary">
                {id}
            </td>
            <td className="border-b border-gray-200 px-2 py-4 text-center">{name}</td>
            <td className="border-b border-gray-200 px-2 py-4">{description}</td>
            <td className="border-b border-gray-200 px-2 py-4">
                <center>{percent}%</center>
            </td>
            <td className="border-b border-gray-200 px-2 py-4 ">
                <center>{dayjs(startDay).format('DD/MM/YYYY')}</center>
            </td>
            <td className="border-b border-gray-200 px-2 py-4 text-center">
                <p className="">{dayjs(endDay).format('DD/MM/YYYY')}</p>
            </td>
            <td className="border-b border-gray-200 px-2 py-4">
                <EditNoteIcon onClick={onEditClick} className="hover:cursor-pointer" />
            </td>
        </tr>
    )
}
