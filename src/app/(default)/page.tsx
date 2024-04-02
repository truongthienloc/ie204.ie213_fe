import styles from '~/styles/home.module.scss'
import Slider from '~/components/HomeSlider'
import { mockProducts } from '~/data'
import ProductCard from '~/components/ProductCard'
import Link from 'next/link'

function HomePage() {
    return (
        <>
            <Slider />
            <section className={styles.section}>
                {/* <h2 className={styles.title}>Món Ăn Phổ Biến</h2> */}
                <h2 className={styles.title}>Thực Đơn Của Chúng Tôi</h2>
                <div className="row mt-10">
                    {mockProducts.map((product) => (
                        <div key={product?.id} className="col lg-3 md-6 sm-12">
                            <ProductCard product={product} href="#" />
                        </div>
                    ))}
                </div>
                <Link
                    href="/product"
                    className="m-auto mt-4 block text-center w-[100px] hover:text-primary"
                >
                    Xem thêm
                </Link>
            </section>
        </>
    )
}

export default HomePage
