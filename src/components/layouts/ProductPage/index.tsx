'use client';
import { useState, useEffect, useMemo } from 'react';

import ProductCard from '~/components/ProductCard';
import { PaginationSection } from '~/components/PaginationSection';
import { Spinner } from '~/components/Spinner';
import { Product } from '~/interfaces/product';
import { filterDish, getProductsFromServer } from '~/services/axios/actions/product.action';
import { INT_ONE } from '~/constants/number';

import ProductFilter from './ProductFilter';
import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE,
  PRODUCT_FILTER_OPTIONS,
} from './constant';
import { EMPTY_ARRAY } from '~/constants';

type Props = {
  initProducts: Product[];
};

function ProductPageComponent({ initProducts = EMPTY_ARRAY }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(INT_ONE);
  const [choice, setChoice] = useState<number>(INT_ONE);
  const [products, setProducts] = useState<Product[]>(EMPTY_ARRAY);

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
          setCurrentPage(INT_ONE);

          let newProducts: Product[] = EMPTY_ARRAY;

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
        <section>
          <div className="row mt-10">
            {currentItemsProducts?.map((product) => (
              <div key={product?._id} className="col lg-3 md-6 sm-12">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <section>
            <PaginationSection
              totalItems={products?.length}
              itemsPerPage={PAGE_SIZE}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </section>
        </section>
      )}
    </>
  );
}
export default ProductPageComponent;
