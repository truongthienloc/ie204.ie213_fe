import { ProductImage } from './product';

export type CartProduct = {
  _id: string;
  dishName: string;
  dishPrice: number;
  dishImages: ProductImage[];
  dishAmount: number;
};
