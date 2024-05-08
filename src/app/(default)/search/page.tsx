'use client'
import ProductCard from '~/components/ProductCard'
import { Product } from '~/interfaces/product.type'
import {
    getProductBySearching,
    getProducts,
    getProductByNamePrice,
} from '~/services/axios/actions/product.action'
import { useSearchParams } from 'next/navigation'
import styles from '~/styles/search.module.scss'
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined'
import clsx from 'clsx'
import { useState, useEffect, Suspense } from 'react'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Spinner } from '~/components/Spinner'
import { priceFilters } from '~/data'

function SearchPage() {
    const searchParams = useSearchParams()
    const [keyword, setKeyWord] = useState<string>('')
    const [products, setProducts] = useState<Product[]>([])
    const [suggestProducts, setSuggestProducts] = useState<Product[]>([])
    const [active, setActive] = useState('')
    const [choice, setChoice] = useState('0')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [prevSearchParams, setPrevSearchParams] = useState<string>()

    useEffect(() => {
        const fetchData = async () => {
            const keyword = searchParams.get('keyword')

            try {
                setIsLoading(true)
                const currentSearchParams = searchParams.toString()
                if (currentSearchParams !== prevSearchParams) {
                    setPrevSearchParams(currentSearchParams)
                    setChoice('0')
                }

                const suggestProducts: Product[] = await getProducts()
                setSuggestProducts(suggestProducts)

                if (keyword) {
                    let products: Product[] = []
                    if (choice === '0') {
                        products = await getProductBySearching(keyword)
                    } else if (choice === '1') {
                        products = await getProductByNamePrice(keyword, 0, 19999)
                    } else if (choice === '2') {
                        products = await getProductByNamePrice(keyword, 20000, 49999)
                    } else if (choice === '3') {
                        products = await getProductByNamePrice(keyword, 50000, 99999)
                    }
                    setKeyWord(keyword)
                    setProducts(products)
                }
            } catch (err) {
                console.error(err)
                setProducts([])
            } finally {
                setIsLoading(false)
                setIsLoaded(true)
            }
        }
        fetchData()
    }, [searchParams, choice])

    return (
        <>
            {isLoading ? (
                <div className="flex min-h-screen items-center">
                    <Spinner />
                </div>
            ) : (
                <>
                    {isLoaded && (
                        <div className={styles.wrapper}>
                            <div className="col lg-3">
                                <div className="mb-8 flex items-center gap-3 text-xl font-bold">
                                    <FilterAltOutlinedIcon />
                                    <p>Bộ lọc tìm kiếm</p>
                                </div>
                                <div>
                                    <p className="text-xl font-semibold">Đánh giá: </p>
                                    <div className="mt-4 flex flex-col gap-2 ">
                                        <button
                                            className={clsx(
                                                'flex gap-1 text-2xl',
                                                styles.button,
                                                active === '1' && styles.active,
                                            )}
                                            onClick={() => setActive('1')}
                                        >
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                        </button>
                                        <button
                                            className={clsx(
                                                'flex gap-1 text-2xl',
                                                styles.button,
                                                active === '2' && styles.active,
                                            )}
                                            onClick={() => setActive('2')}
                                        >
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarBorderIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <p className="ml-2 text-base">trở lên</p>
                                        </button>
                                        <button
                                            className={clsx(
                                                'flex gap-1 text-2xl',
                                                styles.button,
                                                active === '3' && styles.active,
                                            )}
                                            onClick={() => setActive('3')}
                                        >
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarBorderIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarBorderIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <p className="ml-2 text-base">trở lên</p>
                                        </button>
                                        <button
                                            className={clsx(
                                                'flex gap-1 text-2xl',
                                                styles.button,
                                                active === '4' && styles.active,
                                            )}
                                            onClick={() => setActive('4')}
                                        >
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarBorderIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarBorderIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarBorderIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <p className="ml-2 text-base">trở lên</p>
                                        </button>
                                        <button
                                            className={clsx(
                                                'flex gap-1 text-2xl',
                                                styles.button,
                                                active === '5' && styles.active,
                                            )}
                                            onClick={() => setActive('5')}
                                        >
                                            <StarIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarBorderIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarBorderIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarBorderIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <StarBorderIcon
                                                style={{
                                                    color: 'rgb(255, 167, 39)',
                                                    fontSize: '1.5rem',
                                                }}
                                            />
                                            <p className="ml-2 text-base">trở lên</p>
                                        </button>
                                    </div>
                                    <div className={styles.line}></div>
                                </div>
                                <div className="pt-9">
                                    <p className="text-xl font-semibold">Khoảng giá: </p>
                                    <div className="mt-4 flex flex-col gap-3 text-base">
                                        {priceFilters.map((filter) => (
                                            <div className="flex gap-4" key={filter?.id}>
                                                <input
                                                    type="checkbox"
                                                    className="w-[20px]"
                                                    id={filter?.id}
                                                    checked={choice === filter?.id}
                                                    onChange={() => {
                                                        setChoice(filter?.id)
                                                    }}
                                                />
                                                <label
                                                    htmlFor={filter?.id}
                                                    className="cursor-pointer hover:text-primary"
                                                >
                                                    {filter?.title}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={clsx(styles.result, 'col lg-9')}>
                                <div className="mb-8 flex gap-4 text-lg">
                                    <TipsAndUpdatesOutlinedIcon />
                                    <div>
                                        <strong className="text-primary">
                                            {products?.length}{' '}
                                        </strong>
                                        <span>Kết quả tìm kiếm cho từ khóa </span>
                                        <strong className="text-primary">{`"${keyword}"`}</strong>
                                    </div>
                                </div>

                                {products?.length > 0 ? (
                                    <div className="row">
                                        {products?.map((product) => {
                                            return (
                                                <div key={product?._id} className="col lg-4 mb">
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
                                            Bạn hãy thử sử dụng các từ khóa hoặc khoảng giá khác nhé
                                            🤗
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {!products?.length && isLoaded && (
                        <div className="my-12">
                            <p className="text-left text-2xl text-primary">
                                Có thể bạn sẽ thích đó nha
                            </p>
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
            )}
        </>
    )
}

export default function SearchPageWithSuspense() {
    return (
        <Suspense>
            <SearchPage />
        </Suspense>
    )
}
