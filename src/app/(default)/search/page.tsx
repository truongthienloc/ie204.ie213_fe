'use client'
import ProductCard from '~/components/ProductCard'
import { Product } from '~/interfaces/product.type'
import { getProductBySearching, getProducts } from '~/services/axios/actions/product.action'
import { useSearchParams } from 'next/navigation'
import styles from '~/styles/search.module.scss'
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

function SearchPage() {
    const searchParams = useSearchParams()
    const [keyword, setKeyWord] = useState<string>('')
    const [products, setProducts] = useState<Product[]>([])
    const [suggestProducts, setSuggestProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const keyword = searchParams.get('keyword')
            if (keyword) {
                const products: Product[] = await getProductBySearching(keyword)
                const suggestProducts: Product[] = await getProducts()
                setKeyWord(keyword)
                setProducts(products)
                setSuggestProducts(suggestProducts)
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <div className={styles.wrapper}>
                <div className={clsx(styles.filter, 'col lg-4 my-8')}>filter here</div>

                <div className={clsx(styles.result, 'col lg-8')}>
                    <div className="my-8 flex gap-4 text-lg">
                        <TipsAndUpdatesOutlinedIcon />
                        <div>
                            <strong className="text-primary">{products?.length} </strong>
                            <span>Kết quả tìm kiếm cho từ khóa </span>
                            <strong className="text-primary">{`"${keyword}"`}</strong>
                        </div>
                    </div>

                    {products?.length > 0 ? (
                        <div className="row">
                            {products?.map((product) => {
                                return (
                                    <div key={product?._id} className="col lg-6 mb">
                                        <ProductCard product={product} />
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <img
                                src="http://res.cloudinary.com/ddexbqgmg/image/upload/v1714460802/bepUIT-blogImages/x3om4a27v2xvybx7pszu.png"
                                alt="no-result"
                                className="flex h-[268px] w-[268px] justify-center"
                            />
                            <p className="py-2 text-xl text-black opacity-100">
                                Không tìm thấy kết quả nào
                            </p>
                            <p className="py-2 text-xl opacity-80">
                                Bạn hãy thử sử dụng các từ khóa khác nhé 🤗
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {products?.length > 0 ? (
                <span></span>
            ) : (
                <div className="my-12">
                    <p className="text-left text-2xl text-primary">Có thể bạn sẽ thích đó nha</p>
                    <div className="row mt-4">
                        {suggestProducts?.slice(0, 4).map((product) => (
                            <div key={product?._id} className="col lg-3 md-6 sm-12">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
export default SearchPage
