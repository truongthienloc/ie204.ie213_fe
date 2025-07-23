export interface ProductImage {
  _id: string;
  id: string;
  link: string;
}

export interface Product {
  _id: string;
  dishName: string;
  dishPrice: number;
  totalOrder?: number;
  dishDescription: string;
  menuId: string;
  rating?: number;
  dishImages: ProductImage[];
  slugName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Menu {
  _id: string;
  menuName: string;
}

export interface ProductComment {
  _id?: string;
  content: string;
  userId: string;
  dishId: string;
  rating: number;
  level: number;
  replies?: ProductComment[];
  createdAt?: string;
  updatedAt?: string;
}
