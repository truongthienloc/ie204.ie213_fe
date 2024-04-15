import Link from 'next/link'

import styles from '~/styles/home.module.scss'
import Slider from '~/components/HomeSlider'
import ProductCard from '~/components/ProductCard'
import { Menu, Product } from '~/interfaces/product.type'
import { getMenu, getProducts } from '~/services/axios/actions/product.action'

async function HomePage() {
    const products: Product[] = await getProducts()

    return (
        <>
            <Slider />
            <section className={styles.section}>
                <h1 className="text-center text-5xl font-bold text-primary">
                    Bếp UIT - Let us cook
                </h1>
                <h2 className={styles.title}>Thực Đơn Hôm Nay</h2>
                <div className="row mt-10">
                    {products?.splice(0, 8).map((product) => (
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
