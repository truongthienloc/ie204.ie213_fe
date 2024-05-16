import { Metadata } from 'next'
import {
    getProductBySlugname,
    getProductComments,
    getRelativeProducts,
} from '~/services/axios/actions/product.action'
import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star'
import React from 'react'
import styles from '~/styles/product_detail.module.scss'
import ProductImageSlider from '~/components/ProductImageSlider'
import ProductDetailButtons from '~/components/ProductDetailButton'
import SocialsShare from '~/components/SocialsShare'
import CommentSection from '~/components/CommentSection'
import { formatCurrency } from '~/lib/utils'
import { Product, ProductComment } from '~/interfaces/product.type'
import ProductCard from '~/components/ProductCard'
import keywords from '~/configs/BrandKeywords'

type Props = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
    const product = await getProductBySlugname(slug)
    return {
        title: `Bếp UIT - ${product?.dishName}`,
        description: product?.dishDescription,
        keywords: [
            ...keywords,
            product?.dishName.toLowerCase(),
            product?.dishName.toLowerCase() + ' uit',
            product?.dishName.toLowerCase() + ' UIT',
            product?.dishName.toLowerCase() + ' bếp UIT',
            product?.dishName.toLowerCase() + ' Bếp UIT',
            product?.dishName.toLowerCase() + ' bếp uit',
            product?.dishName.toLowerCase() + ' tại bếp UIT',
            product?.dishName,
            product?.dishName + ' uit',
            product?.dishName + ' UIT',
            product?.dishName + ' bếp UIT',
            product?.dishName + ' Bếp UIT',
            product?.dishName + ' bếp uit',
            product?.dishName + ' tại bếp UIT',
        ],
        openGraph: {
            title: product?.dishName,
            countryName: 'Việt Nam',
            description: product?.dishDescription,
            images: [product?.dishImages?.[0].link],
        },
    }
}

const handleDisplayRating = (rating: number) => {
    if (!rating) return

    const roundedRating = Math.round(rating * 2) / 2
    const stars = []

    for (let i = 0; i < 5; i++) {
        if (i < roundedRating) stars.push(<StarIcon className={styles.icon} />)
        else stars.push(<StarIcon className={styles.icon} />)
    }

    return stars
}

async function ProductDetailPage({ params: { slug } }: Props) {
    const product: Product = await getProductBySlugname(slug)
    const comments: ProductComment[] = (await getProductComments(product?._id)) || []
    const relativeProducts: Product[] = await getRelativeProducts(product?._id, 4)
    return (
        <>
            <div className={styles.wrapper}>
                <p className={styles.breadcrumb}>
                    <Link href={'/'}>Trang chủ</Link> {' / '}
                    <Link href={'/product'}>sản phẩm</Link> {' / '}
                    <span>{product?.dishName.toLowerCase()}</span>
                </p>
                <section className="row">
                    <div className="col lg-6 md-6 sm-12">
                        <ProductImageSlider
                            images={product?.dishImages}
                            alt={product?.dishName + ' tại bếp UIT'}
                        />
                    </div>
                    <div className="col lg-6 md-6 sm-12">
                        <div className={styles['product__info']}>
                            <h1>{product?.dishName}</h1>
                            <div className={styles.price}>
                                <span>Giá: {formatCurrency(product?.dishPrice)} VNĐ</span>
                                <span> | {product?.totalOrder} lượt mua</span>
                            </div>
                            {product.rating && (
                                <div className={styles.rating}>
                                    <div className="flex items-center gap-2">
                                        <span>{product?.rating} / 5</span>
                                        <span>
                                            {handleDisplayRating(product.rating)?.map(
                                                (star, index) => (
                                                    <React.Fragment key={index}>
                                                        {star}
                                                    </React.Fragment>
                                                ),
                                            )}
                                        </span>
                                    </div>
                                    <SocialsShare />
                                </div>
                            )}
                            <p className={styles['product__desc']}>{product?.dishDescription}</p>
                            <ProductDetailButtons product={product} />
                        </div>
                    </div>
                </section>
                <CommentSection initComments={comments} dishId={product?._id} />
                <section className={styles['relative-products']}>
                    <h2 className={styles['sub-title']}>Sản phẩm liên quan</h2>
                    <div className="row">
                        {relativeProducts.map((product) => {
                            return (
                                <div key={product?._id} className="col lg-3 md-6 sm-12">
                                    <ProductCard product={product} />
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </>
    )
}

export default ProductDetailPage
