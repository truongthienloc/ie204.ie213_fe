'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from '~/styles/home.module.scss'
import Slider from '~/components/HomeSlider'
import ProductCard from '~/components/ProductCard'
import { Product } from '~/interfaces/product.type'
import { getProducts } from '~/services/axios/actions/product.action'

function HomePage() {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch (err) {
                console.error(err)
                setProducts([])
            }
        }

        fetchProducts()
    }, [])

    return (
        <>
            <Slider />
            <section className={styles.section}>
                <h1 className={styles.heading}>Bếp UIT - Let Us Cook</h1>
                <h2 className={styles.title}>Thực Đơn Hôm Nay</h2>
                <div className="row mt-10">
                    {products?.slice(0, 8).map((product) => (
                        <div key={product?._id} className="col lg-3 md-6 sm-12">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                <Link
                    href="/product"
                    className="m-auto mt-4 block w-[100px] text-center text-lg hover:text-primary"
                >
                    Xem thêm
                </Link>
            </section>
        </>
    )
}

export default HomePage
