'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '~/stores/auth'

type Props = {}

export default function AdminPage({}: Props) {
    const { isAdmin } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (isAdmin) {
            router.replace('/admin/manage-client')
        }
    }, [isAdmin, router])
    return null
}
