import ProductPageComponent from '~/components/layouts/ProductPage';
import { Metadata } from 'next';
import { getProductsFromServer } from '~/services/axios/actions/product.action';
import { Product } from '~/interfaces/product';
import ProductCard from '~/components/ProductCard';
import { redirect } from 'next/navigation';
import { isEmpty } from 'lodash';

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
