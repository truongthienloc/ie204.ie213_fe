'use client'
import ProductCard from '~/components/ProductCard'
import { PaginationSection } from '~/components/PaginationSection'
import { Menu, Product } from '~/interfaces/product.type'
import { getProducts, getMenu, filterDish } from '~/services/axios/actions/product.action'
import { useState, useEffect } from 'react'
import { Spinner } from '~/components/Spinner'
import { Metadata } from 'next'
import clsx from 'clsx'
import styles from '~/styles/products.module.scss'

function ProductPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8)
    const [isLoaded, setIsLoaded] = useState(false)
    const [choice, setChoice] = useState(1)
    const [products, setProducts] = useState<Product[]>([])

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentItemsProducts = products?.slice(firstItemIndex, lastItemIndex)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const productsData = await getProducts()
                setProducts(productsData)
            } catch (err) {
                console.error(err)
                setProducts([])
            }
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        const fetchFoodByKind = async () => {
            try {
                if (choice === 1) {
                    const products = await getProducts()
                    setProducts(products)
                } else if (choice === 2) {
                    const mainDishData = await filterDish(
                        0,
                        10000000,
                        '6608301dc11b247adbd84f28',
                        1,
                        20,
                    )
                    setProducts(mainDishData)
                } else if (choice === 3) {
                    const dessertData = await filterDish(
                        0,
                        10000000,
                        '66083088c11b247adbd84f29',
                        1,
                        20,
                    )
                    setProducts(dessertData)
                } else if (choice === 4) {
                    const drinksData = await filterDish(
                        0,
                        10000000,
                        '66083097c11b247adbd84f2a',
                        1,
                        20,
                    )
                    setProducts(drinksData)
                }
                console.log(products)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
                setIsLoaded(true)
            }
        }

        fetchFoodByKind()
    }, [choice])

    return (
        <>
            {isLoading ? (
                <div className="flex min-h-screen items-center">
                    <Spinner />
                </div>
            ) : (
                <>
                    {isLoaded && (
                        <div className={clsx('mt-10 flex justify-end gap-3', styles.category)}>
                            <button
                                className={clsx(styles.button, choice === 1 && styles.active)}
                                onClick={() => {
                                    setChoice(1)
                                    setCurrentPage(1)
                                    console.log(currentPage)
                                }}
                            >
                                Tất cả món ăn
                            </button>
                            <button
                                className={clsx(styles.button, choice === 2 && styles.active)}
                                onClick={() => {
                                    setChoice(2)
                                    setCurrentPage(1)
                                    console.log(currentPage)
                                }}
                            >
                                Thực đơn chính
                            </button>
                            <button
                                className={clsx(styles.button, choice === 3 && styles.active)}
                                onClick={() => {
                                    setChoice(3)
                                    setCurrentPage(1)
                                }}
                            >
                                Tráng miệng
                            </button>
                            <button
                                className={clsx(styles.button, choice === 4 && styles.active)}
                                onClick={() => {
                                    setChoice(4)
                                    setCurrentPage(1)
                                }}
                            >
                                Thức uống
                            </button>
                        </div>
                    )}
                    {choice === 1 && (
                        <section>
                            <div className="row mt-10">
                                {currentItemsProducts?.map((product) => (
                                    <div key={product?._id} className="col lg-3 md-6 sm-12">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>

                            {isLoaded && (
                                <section>
                                    <PaginationSection
                                        totalItems={products.length}
                                        itemsPerPage={itemsPerPage}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </section>
                            )}
                        </section>
                    )}

                    {choice === 2 && (
                        <section>
                            <div className="row mt-10">
                                {currentItemsProducts?.map((product) => (
                                    <div key={product?._id} className="col lg-3 md-6 sm-12">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>

                            {isLoaded && (
                                <section>
                                    <PaginationSection
                                        totalItems={products?.length}
                                        itemsPerPage={itemsPerPage}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </section>
                            )}
                        </section>
                    )}

                    {choice === 3 && (
                        <section>
                            <div className="row mt-10">
                                {currentItemsProducts?.map((product) => (
                                    <div key={product?._id} className="col lg-3 md-6 sm-12">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>

                            {isLoaded && (
                                <section>
                                    <PaginationSection
                                        totalItems={products?.length}
                                        itemsPerPage={itemsPerPage}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </section>
                            )}
                        </section>
                    )}

                    {choice === 4 && (
                        <section>
                            <div className="row mt-10">
                                {currentItemsProducts?.map((product) => (
                                    <div key={product?._id} className="col lg-3 md-6 sm-12">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>

                            {isLoaded && (
                                <section>
                                    <PaginationSection
                                        totalItems={products?.length}
                                        itemsPerPage={itemsPerPage}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </section>
                            )}
                        </section>
                    )}
                </>
            )}
        </>
    )
}
export default ProductPage
