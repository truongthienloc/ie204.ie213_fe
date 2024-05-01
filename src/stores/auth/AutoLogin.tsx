'use client'

import { useEffect } from 'react'
import useAuth from './useAuth'
import { clientInstance } from '~/services/axios'
import userAction from '~/services/axios/actions/user.action'
import { useCart } from '../cart/useCart'
import { getCart } from '~/services/axios/actions/cart.action'
import { CartProduct } from '~/interfaces/cart.type'

type Props = {}

export default function AutoLogin({}: Props) {
    const auth = useAuth()
    const { loadProduct } = useCart()

    // console.log('auth: ', auth);

    useEffect(() => {
        const accessToken = clientInstance.getAccessToken()
        if (!accessToken) {
            auth.logout()
            return
        }

        async function fetchUser() {
            try {
                const res = await userAction.getCurrentUser()

                auth.login({
                    id: res._id,
                    email: res.email,
                    username: res.username,
                    avatar: res.avatar?.link,
                    isAdmin: res.role === 'admin',
                })

                // load user cart when login
                if (res.role === 'user') {
                    const cart: CartProduct[] = await getCart()
                    loadProduct(cart)
                }
            } catch (error) {
                auth.logout()
                console.log('error: ', error)
            }
        }

        fetchUser()
    }, [])

    return null
}
