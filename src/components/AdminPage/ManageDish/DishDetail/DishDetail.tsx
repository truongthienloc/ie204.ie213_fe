import EditNoteIcon from '@mui/icons-material/EditNote'
import { ProductImage } from '~/interfaces/product.type'
import { formatCurrency } from '~/lib/utils'

type Props = {
    id: string
    isCheck: boolean
    kind: string
    name: string
    description: string
    price: number
    imgs: ProductImage[]
    onEditButtonClick: () => void
    onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function DishDetail({
    id,
    isCheck,
    kind,
    name,
    description,
    price,
    imgs,
    onEditButtonClick,
    onCheck,
}: Props) {
    return (
        <tr>
            <td className="border-b border-gray-200 px-2 py-4 text-lg text-primary">
                <div className="flex flex-row">
                    <input className="mr-4" type="checkbox" checked={isCheck} onChange={onCheck} />{' '}
                    <p className="w-32 break-words">{id}</p>
                </div>
            </td>
            <td className="border-b border-gray-200 px-2 py-4">{kind}</td>
            <td className="border-b border-gray-200 px-2 py-4">{name}</td>
            <td className="border-b border-gray-200 py-4 ">
                <div className="flex flex-wrap gap-1 ">
                    {imgs &&
                        imgs.map((img) => (
                            <img src={img.link} key={img.id} alt={img.link} className="w-[130px]" />
                        ))}
                </div>
            </td>
            <td className="border-b border-gray-200 px-2 py-4 ">
                <p className="">{description}</p>
            </td>
            <td className="border-b border-gray-200 px-2 py-4">
                <div className="flex gap-6 font-medium">
                    <p className=" text-primary">{formatCurrency(price)}</p>
                    <EditNoteIcon onClick={onEditButtonClick} className="hover:cursor-pointer" />
                </div>
            </td>
        </tr>
    )
}
