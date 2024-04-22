'use server'

import { cookies } from 'next/headers'

export async function setAccessToken(accessToken: string) {
    cookies().set('access_token', accessToken, {
        httpOnly: true,
        maxAge: 24 * 3600,
    })
}
