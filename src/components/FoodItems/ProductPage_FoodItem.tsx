import { useDispatch, useSelector } from 'react-redux'
import { increasement } from '../../features/cartSlice'
import { toast } from 'react-toastify'
import { Url } from 'next/dist/shared/lib/router/router'
import { Root } from 'postcss'
import { RootState } from '~/app/store'
import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star'
import React from 'react'

import styles from '~/styles/product_card.module.scss'
import { formatCurrency } from '~/lib/utils'
import { Product } from '~/types/Product'

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

type Props = {
    product: Product
    href: string
}

function FoodItems({ product, href }: Props) {
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
    const handleDisplayRating = (rating: number | undefined) => {
        if (!rating) return

        const roundedRating = Math.round(rating * 2) / 2
        const stars = []

        for (let i = 0; i < 5; i++) {
            if (i < roundedRating)
                stars.push(<StarIcon style={{ color: 'yellow', fontSize: '0.8rem' }} />)
            else stars.push(<StarIcon style={{ fontSize: '0.8rem' }} />)
        }

        return stars
    }
    const formattedMoney = (number: number) => {
        let res = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return `${res} VND`
    }

    return (
        // <div
        //     onClick={onNavigate}
        //     className="flex h-[180px] w-[590px] cursor-pointer flex-row items-center justify-center gap-5 rounded-2xl border border-third bg-fourth shadow-xl hover:opacity-90
        // 	"
        // >
        //     <div className="flex w-[400px] flex-col gap-8">
        //         <p className="text-2xl font-normal uppercase text-primary">{item.dishName}</p>
        //         <div className="flex justify-between">
        //             <p className="pt-3 text-xl font-normal text-second">
        //                 Giá {formattedMoney(item.dishPrice)}
        //             </p>
        //             <button
        //                 onClick={onAdd}
        //                 className="flex h-[50px] w-[150px] items-center justify-center bg-primary text-2xl font-normal text-third hover:opacity-80"
        //             >
        //                 Thêm
        //             </button>
        //         </div>
        //     </div>

        //     <div className="flex h-[150px] w-[150px] overflow-hidden rounded-xl">
        //         <img className="object-fill" src={item.dishImages[0].link} alt={item.dishName} />
        //     </div>
        // </div>

        <>
            <Link href={href} className={styles.card}>
                <div className={styles['card__image']}>
                    <img src={product?.dishImages[0]?.link} alt={product?.dishName} />
                </div>
                <div className={styles.wrapper}>
                    <h4 className={styles.name}>{product?.dishName}</h4>
                    <p className={styles.desc}>{product?.dishDescription}</p>
                    <p className={styles.price}>{`${formatCurrency(product?.dishPrice)} VNĐ`}</p>
                    <div className={styles.rating}>
                        <div>
                            <span style={{ display: 'inline-block', marginRight: '4px' }}>
                                {product?.dishRating}/5
                            </span>
                            {handleDisplayRating(product?.dishRating)?.map((star, index) => (
                                <React.Fragment key={index}>{star}</React.Fragment>
                            ))}
                        </div>

                        <span>{product?.dishTotalOrder} lượt mua</span>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default FoodItems
