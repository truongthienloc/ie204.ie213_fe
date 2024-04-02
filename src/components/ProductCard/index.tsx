import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star'

import styles from '~/styles/product_card.module.scss'
import { formatCurrency } from '~/lib/utils'
import { Product } from '~/types/Product'

type Props = {
    product: Product
    href: string
}

function ProductCard({ product, href }: Props) {
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

    return (
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
                            {handleDisplayRating(product?.dishRating)}
                        </div>

                        <span>{product?.dishTotalOrder} lượt mua</span>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ProductCard
