import ProductPageComponent from '~/components/ProductPage'
import { Metadata } from 'next'
import { getProductsFromServer } from '~/services/axios/actions/product.action'
import { Product } from '~/interfaces/product.type'

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Bếp UIT - Danh sách sản phẩm',
    }
}

async function ProductPage() {
    const products: Product[] = await getProductsFromServer()

    return (
        <>
            <ProductPageComponent initProducts={products} />
        </>
    )
}

export default ProductPage
