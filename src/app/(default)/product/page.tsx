'use client'
import ProductCard from '~/components/ProductCard'
import { PaginationSection } from '~/components/PaginationSection'
import { Product } from '~/interfaces/product.type'
import { getProducts } from '~/services/axios/actions/product.action'
import { useState, useEffect } from 'react'
import { Spinner } from '~/components/Spinner'

function ProductPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8)
    const [isLoaded, setIsLoaded] = useState(false)

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentItems = products.slice(firstItemIndex, lastItemIndex)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const data = await getProducts()
                setProducts(data)
            } catch (err) {
                console.error(err)
                setProducts([])
            } finally {
                setIsLoading(false)
                setIsLoaded(true)
            }
        }

        fetchProducts()
    }, [])

    return (
        <>
            {isLoading ? (
                <div className="flex min-h-screen items-center">
                    <Spinner />
                </div>
            ) : (
                <>
                    <section>
                        <div className="row mt-10">
                            {currentItems?.map((product) => (
                                <div key={product?._id} className="col lg-3 md-6 sm-12">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </section>
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
                </>
            )}
        </>
    )
}
export default ProductPage
