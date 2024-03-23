'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import { toast } from 'react-toastify'
import { AdminSidebar } from '~/components/AdminSidebar'
import { ScrollToTopButton } from '~/components/ScrollToTop'
import { useAuth } from '~/stores/auth'

type Props = {
    children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
    const { isAdmin } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAdmin) {
            router.replace('/admin/login')
        } else {
            router.replace('/admin/manage-client')
        }
    }, [isAdmin, router])

    return (
        <div className="flex flex-col bg-[#fafafa] text-second">
            <div className="bg-primary text-white w-full mx-auto max-w-full flex flex-row pl-24 py-1 gap-14 justify-center">
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
