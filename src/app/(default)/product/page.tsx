import ProductCard from '~/components/ProductCard'
import styles from '~/styles/products.module.scss'
import { Metadata } from 'next'
import { getMenu } from '~/services/axios/actions/product.action'

export function generateMetadata(): Metadata {
    return {
        title: 'Bếp UIT - Sản phẩm của chúng tôi',
    }
}

async function ProductPage() {
    const menu = await getMenu()

    return (
        <>
            <h1>Sản phẩm của chúng tôi</h1>
            {menu?.map((item) => <div key={item?._id}>{item?.menuName}</div>)}
        </>
    )
}

export default ProductPage
