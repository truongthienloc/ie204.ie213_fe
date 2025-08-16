'use client';

import { useState, useEffect, useMemo } from 'react';

import ProductCard from '~/components/ProductCard';
import ProductFilter from './ProductFilter';
import PaginationSection from '~/components/layouts/PaginationSection';
import { Spinner } from '~/components/ui/Spinner';
import { Product } from '~/interfaces/product';
import { filterDish, getProductsFromServer } from '~/services/axios/actions/product.action';

import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE,
  PRODUCT_FILTER_OPTIONS,
} from './constant';

type Props = {
  initProducts: Product[];
};

function ProductPageComponent({ initProducts = [] }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [choice, setChoice] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(initProducts);
  }, [setProducts, initProducts]);

  const currentItemsProducts = useMemo(() => {
    const lastItemIndex = currentPage * PAGE_SIZE;
    const firstItemIndex = lastItemIndex - PAGE_SIZE;

    return products?.slice(firstItemIndex, lastItemIndex);
  }, [currentPage, products]);

  const filterOptions = useMemo(
    () =>
      PRODUCT_FILTER_OPTIONS.map((option) => ({
        ...option,
        onClick: async () => {
          setIsLoading(true);
          setChoice(option.id);
          setCurrentPage(1);

          let newProducts: Product[] = [];

          if (option.menuId) {
            newProducts = await filterDish(
              DEFAULT_MIN_PRICE,
              DEFAULT_MAX_PRICE,
              option.menuId,
              DEFAULT_PAGE,
              DEFAULT_PAGE_SIZE,
            );
          } else {
            newProducts = await getProductsFromServer();
          }

          setProducts(newProducts);
          setIsLoading(false);
        },
      })),
    [setProducts, setIsLoading, setChoice, setCurrentPage],
  );

  return (
    <>
      <ProductFilter filterOptions={filterOptions} currentChoice={choice} />

      {isLoading ? (
        <div className="flex min-h-screen items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="row mt-10">
            {currentItemsProducts?.map((product) => (
              <div key={product?._id} className="col col-lg-3 col-md-6 col-sm-12">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {Boolean(currentItemsProducts.length) && (
            <PaginationSection
              className="mx-auto my-8 flex w-full cursor-pointer justify-center text-4xl"
              totalCount={products?.length}
              perPage={PAGE_SIZE}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </>
  );
}
export default ProductPageComponent;
