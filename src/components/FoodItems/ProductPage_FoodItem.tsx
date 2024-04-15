import { useDispatch, useSelector } from 'react-redux'
import { increasement } from '../../features/cartSlice'
import { toast } from 'react-toastify'
import { Url } from 'next/dist/shared/lib/router/router'
import { Root } from 'postcss'
import { RootState } from '~/app/store'

export type TImage = {
    id: number
    link: string
}

export type TItem = {
    id: number
    dishName: string
    dishPrice: number
    dishDescription: string
    dishTotalOrder: number
    dishRating: number
    dishImages: TImage[]
}

function FoodItems({ item }: { item: TItem }) {
    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    // Chưa có state user
    // const user = useSelector<RootState>((state) => state.user)
    const onNavigate = () => {
        // Chưa chỉnh lại navigate
        // navigate(`/product-detail/${item.id}`)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    const onAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        // if (!user.id) {
        // 	toast.error('Bạn cần đăng nhập để thực hiện chức năng này!!!', {
        // 		toastId: 'needLoginID',
        // 	})
        // 	// navigate('/login')
        // 	return
        // }
        // dispatch(increasement(item))
        // toast.success(`Thêm ${item.dishName.toUpperCase()} vào giỏ hàng`)
    }
    const formattedMoney = (number: number) => {
        let res = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return `${res} VND`
    }

    return (
        <div
            onClick={onNavigate}
            className="flex h-[180px] w-[590px] cursor-pointer flex-row items-center justify-center gap-5 rounded-2xl border border-third bg-fourth shadow-xl hover:opacity-90
			"
        >
            <div className="flex w-[400px] flex-col gap-8">
                <p className="text-2xl font-normal uppercase text-primary">{item.dishName}</p>
                <div className="flex justify-between">
                    <p className="pt-3 text-xl font-normal text-second">
                        Giá {formattedMoney(item.dishPrice)}
                    </p>
                    <button
                        onClick={onAdd}
                        className="flex h-[50px] w-[150px] items-center justify-center bg-primary text-2xl font-normal text-third hover:opacity-80"
                    >
                        Thêm
                    </button>
                </div>
            </div>

            <div className="flex h-[150px] w-[150px] overflow-hidden rounded-xl">
                <img className="object-fill" src={item.dishImages[0].link} alt={item.dishName} />
            </div>
        </div>
    )
}

export default FoodItems
