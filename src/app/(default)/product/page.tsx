import { isEmpty } from 'lodash';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import ProductPageComponent from '~/components/layouts/ProductPage';
import ProductCard from '~/components/ProductCard';
import { Product } from '~/interfaces/product';
import { getProductsFromServer } from '~/services/axios/actions/product.action';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Bếp UIT - Danh sách sản phẩm',
  };
};

async function ProductPage() {
  let products: Product[] = await getProductsFromServer();

  if (isEmpty(products)) redirect('/not-found');

  return (
    <>
      <div className="hidden">{products?.map((product) => <ProductCard key={product?._id} product={product} />)}</div>
      <ProductPageComponent initProducts={products} />
    </>
  );
}

export default ProductPage;
