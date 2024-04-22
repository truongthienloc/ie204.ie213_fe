'use client'

import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { clientInstance } from '~/services/axios'
import userAction from '~/services/axios/actions/user.action'

type Props = {}

export default function AutoLogin({}: Props) {
    const auth = useAuth()

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
            } catch (error) {
                // console.log('logout from auto login');
                // throw new Error(error)
                auth.logout()
            }
        }

        fetchUser()
    }, [])

    return null
}
