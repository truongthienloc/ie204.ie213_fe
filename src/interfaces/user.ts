import { Image } from './image';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  tables?: [];
  discounts?: [];
  createdAt?: string;
  updatedAt?: string;
  avatar: Image;
}
