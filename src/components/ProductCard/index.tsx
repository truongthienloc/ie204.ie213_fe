import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star'
import React from 'react'

import styles from '~/styles/product_card.module.scss'
import { formatCurrency } from '~/lib/utils'
import { Product } from '~/interfaces/product.type'

type Props = {
    product: Product
}

function ProductCard({ product }: Props) {
    const handleDisplayRating = () => {
        if (!product?.rating) return

        const roundedRating = Math.round(product?.rating * 2) / 2
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
            <Link href={`/product/${product?.slugName}`} className={styles.card}>
                <div className={styles['card__image']}>
                    <img src={product?.dishImages[0]?.link} alt={product?.dishName} />
                </div>
                <div className={styles.wrapper}>
                    <h4 className={styles.name}>{product?.dishName}</h4>
                    <p className={styles.desc}>
                        {product?.dishDescription.length > 110
                            ? product?.dishDescription.substring(0, 110) + '...'
                            : product?.dishDescription}
                    </p>
                    <p className={styles.price}>{`${formatCurrency(product?.dishPrice)} VNĐ`}</p>
                    <div className={styles.rating}>
                        <div>
                            <span style={{ display: 'inline-block', marginRight: '4px' }}>
                                {product?.rating}/5
                            </span>
                            {handleDisplayRating()?.map((star, index) => (
                                <React.Fragment key={index}>{star}</React.Fragment>
                            ))}
                        </div>

                        <span>{product?.totalOrder} lượt mua</span>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ProductCard
