'use client';

import { isEmpty } from 'lodash';
import { memo, useEffect, useState } from 'react';

import styles from '~/styles/product_detail.module.scss';
import ProductCard from '~/components/ProductCard';
import { Product } from '~/interfaces/product';
import { getRelativeProducts } from '~/services/axios/actions/product.action';

type Props = {
  productId: string;
  quantity: number;
};

const RelativeProductSection = memo(({ productId, quantity }: Props) => {
  const [relativeProducts, setRelativeProducts] = useState<Product[]>([]);

  useEffect(() => {
    getRelativeProducts(productId, quantity).then((products) => {
      setRelativeProducts(products);
    });
  }, [productId, quantity]);

  if (isEmpty(relativeProducts)) return null;

  return (
    <section className={styles['relative-products']}>
      <h2 className={styles['sub-title']}>Sản phẩm liên quan</h2>
      <div className="row">
        {relativeProducts.map((product) => {
          return (
            <div key={product?._id} className="col col-lg-3 col-md-6 col-sm-12">
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </section>
  );
});

RelativeProductSection.displayName = 'RelativeProductSection';

export default RelativeProductSection;
