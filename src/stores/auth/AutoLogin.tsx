'use client';

import { useEffect } from 'react';
import useAuth from './useAuth';
import { clientInstance } from '~/services/axios';
import userAction from '~/services/axios/actions/user.action';
import { useCart } from '../cart/useCart';
import { getCart } from '~/services/axios/actions/cart.action';
import { CartProduct } from '~/interfaces/cart.type';
import { User, UserRole } from '~/interfaces/user';

export default function AutoLogin() {
  const auth = useAuth();
  const { loadProduct } = useCart();

  useEffect(() => {
    const accessToken = auth.accessToken;
    if (!accessToken) {
      auth.logout();
      return;
    }

    async function fetchUser() {
      try {
        const user: User = await userAction.getCurrentUser();

        auth.setAuth(user, accessToken as string);

        // load user cart when login
        if (user.role === UserRole.USER) {
          const cart: CartProduct[] = await getCart();
          loadProduct(cart);
        }
      } catch (error) {
        auth.logout();
        console.log('error: ', error);
      }
    }

    fetchUser();
  }, [loadProduct]);

  return null;
}
