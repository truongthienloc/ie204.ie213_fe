import React, { memo } from 'react';
import { isEmpty } from 'lodash';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';

import styles from '~/styles/product_detail.module.scss';
import { Product } from '~/interfaces/product';
import { getProductBySlugname } from '~/services/axios/actions/product.action';
import formatCurrency from '~/utils/formatCurrency';
import ProductDetailButtons from '~/components/ProductDetailButton';
import ProductImageSlider from '~/components/ProductImageSlider';
import SocialsShare from '~/components/SocialsShare';
import CommentSection from '~/components/layouts/CommentSection';
import defaultConfigs from '~/configs/defaultConfigs';
import RelativeProductSection from '~/components/layouts/RelativeProductsSection';
import { DEFAULT_RELATIVE_PRODUCT_QUANTITY } from './constant';

const { appMetadata } = defaultConfigs;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  const product = await getProductBySlugname(slug);
  return {
    title: `Bếp UIT - ${product?.dishName}`,
    description: product?.dishDescription,
    keywords: [
      ...(appMetadata?.keywords ?? []),
      product?.dishName.toLowerCase(),
      product?.dishName.toLowerCase() + ' uit',
      product?.dishName.toLowerCase() + ' UIT',
      product?.dishName.toLowerCase() + ' bếp UIT',
      product?.dishName.toLowerCase() + ' Bếp UIT',
      product?.dishName.toLowerCase() + ' bếp uit',
      product?.dishName.toLowerCase() + ' tại bếp UIT',
      product?.dishName,
      product?.dishName + ' uit',
      product?.dishName + ' UIT',
      product?.dishName + ' bếp UIT',
      product?.dishName + ' Bếp UIT',
      product?.dishName + ' bếp uit',
      product?.dishName + ' tại bếp UIT',
    ],
    openGraph: {
      title: product?.dishName,
      countryName: 'Việt Nam',
      description: product?.dishDescription,
      images: [product?.dishImages?.[0]?.link],
    },
  };
}

const handleDisplayRating = (rating: number) => {
  if (!rating) return;

  const roundedRating = Math.round(rating * 2) / 2;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < roundedRating) stars.push(<StarIcon className={styles.icon} />);
    else stars.push(<StarIcon className={styles.icon} />);
  }

  return stars;
};

const ProductDetailPage = memo(async ({ params: { slug } }: Props) => {
  const product: Product = await getProductBySlugname(slug);

  if (isEmpty(product)) {
    redirect('/not-found');
  }

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.breadcrumb}>
          <Link href={'/'}>Trang chủ</Link> {' / '}
          <Link href={'/product'}>sản phẩm</Link> {' / '}
          <span>{product?.dishName.toLowerCase()}</span>
        </p>

        <section className="row">
          <div className="col lg-6 md-6 sm-12">
            <ProductImageSlider images={product?.dishImages} alt={product?.dishName + ' tại bếp UIT'} />
          </div>
          <div className="col lg-6 md-6 sm-12">
            <div className={styles['product__info']}>
              <h1>{product?.dishName}</h1>
              <div className={styles.price}>
                <span>Giá: {formatCurrency(product?.dishPrice)} VNĐ</span>
                <span> | {product?.totalOrder} lượt mua</span>
              </div>
              {product.rating && (
                <div className={styles.rating}>
                  <div className="flex items-center gap-2">
                    <span>{product?.rating} / 5</span>
                    <span>
                      {handleDisplayRating(product.rating)?.map((star, index) => (
                        <React.Fragment key={index}>{star}</React.Fragment>
                      ))}
                    </span>
                  </div>
                  <SocialsShare />
                </div>
              )}
              <p className={styles['product__desc']}>{product?.dishDescription}</p>
              <ProductDetailButtons product={product} />
            </div>
          </div>
        </section>

        <CommentSection productId={product?._id} />

        <RelativeProductSection productId={product?._id} quantity={DEFAULT_RELATIVE_PRODUCT_QUANTITY} />
      </div>
    </>
  );
});

ProductDetailPage.displayName = 'ProductDetailPage';

export default ProductDetailPage;
