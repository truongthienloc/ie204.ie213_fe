'use client';

import React, { useEffect } from 'react';

import useAuth from './useAuth';
import userAction from '~/services/axios/actions/user.action';
import { useCart } from '../cart/useCart';
import { getCart } from '~/services/axios/actions/cart.action';
import { CartProduct } from '~/interfaces/cart.type';
import { User, UserRole } from '~/interfaces/user';

const AutoLogin: React.FC = () => {
  const { setAuth, accessToken, logout } = useAuth();
  const { loadProduct } = useCart();

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    async function fetchUser() {
      try {
        const user: User = await userAction.getCurrentUser();

        setAuth(user, accessToken as string);

        // load user cart when login
        if (user.role === UserRole.USER) {
          const cart: CartProduct[] = await getCart();
          loadProduct(cart);
        }
      } catch (error) {
        logout();
        console.error(error);
      }
    }

    fetchUser();
  }, [accessToken, logout, setAuth, loadProduct]);

  return null;
};

export default AutoLogin;
