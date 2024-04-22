'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress'
// import { toast } from 'react-toastify'
import { AdminSidebar } from '~/components/AdminSidebar'
import { ScrollToTopButton } from '~/components/ScrollToTop'
import { useAuth } from '~/stores/auth'

type Props = {
    children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
    const { isAdmin, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isLoading) {
            return
        }

        if (!isAdmin) {
            router.replace('/admin/login')
        }

        // setIsLoading(false)
    }, [isAdmin, router, isLoading])

    if (isLoading) {
        return (
            <div className="flex h-dvh">
                <CircularProgress className="m-auto" />
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-[#fafafa] text-second">
            <div className="mx-auto flex w-full max-w-full flex-row justify-center gap-14 bg-primary py-1 pl-24 text-white">
                <p>4Food&#39;s Administrator</p>
            </div>
            <div className="flex">
                <AdminSidebar />
                {children}
                <ScrollToTopButton />
            </div>
        </div>
    )
}
