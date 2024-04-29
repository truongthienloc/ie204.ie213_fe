import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogoutModal } from '../Modal/LogoutModal'
import { api, clientInstance } from '~/services/axios'
import { useAuth } from '~/stores/auth'

const menu = [
    {
        href: '/admin/manage-sales',
        label: 'Thông tin bán hàng',
        src: '/icons/admin-sidebar/Money.svg',
    },
    {
        href: '/admin/manage-statistic',
        label: 'Thống kê',
        src: '/icons/admin-sidebar/line - chart 24.svg',
    },
    {
        href: '/admin/blog',
        label: 'Bài viết',
        src: '/icons/admin-sidebar/blog-icon.svg',
    },
    {
        href: '/admin/manage-booking',
        label: 'Đặt bàn',
        src: '/icons/admin-sidebar/clipboard-tick.svg',
    },
    {
        href: '/admin/manage-dish',
        label: 'Món ăn',
        src: '/icons/admin-sidebar/Noodle.svg',
    },
    {
        href: '/admin/manage-staff',
        label: 'Nhân viên',
        src: '/icons/admin-sidebar/Icon.svg',
    },
    {
        href: '/admin/manage-client',
        label: 'Khách hàng',
        src: '/icons/admin-sidebar/Accepted Profile.svg',
    },
    {
        href: '/admin/manage-promotion',
        label: 'Khuyến mãi',
        src: '/icons/admin-sidebar/Subtract.svg',
    },
    {
        href: '/admin/change-password',
        label: 'Đổi mật khẩu',
        src: '/icons/admin-sidebar/setting-2 (1).svg',
    },
]

export default function AdminSidebar() {
    const router = useRouter()
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const auth = useAuth()

    const handleLogout = async () => {
        try {
            // api.post('/auth/logout')
            auth.logout()
            setTimeout(() => {
                clientInstance.removeAccessToken()
            }, 500)
            setShowLogoutModal(false)
            router.push('/admin/login')
        } catch (error) {}
    }

    return (
        <div className="mb-20 flex h-full w-[300px] flex-col gap-10 bg-[#f8f8f8] pl-8 pr-4 pt-8">
            <div className=" flex gap-5 ">
                <img src={'/icons/admin-sidebar/element-3.svg'} alt="" />
                <p className="text-2xl font-normal text-primary">Admin</p>
            </div>

            <div className="flex flex-col">
                {menu.map((item) => {
                    return (
                        <Link
                            id="admin-sidebar"
                            key={item.href}
                            href={item.href}
                            className={
                                'flex gap-4 text-nowrap rounded-sm px-[5px] py-4 text-lg font-normal text-second hover:text-primary'
                            }
                        >
                            <img
                                className="aspect-square w-[25px]"
                                src={item.src}
                                alt={item.label}
                            />
                            {item.label}
                        </Link>
                    )
                })}
            </div>

            <button
                className={
                    'flex gap-4 rounded-sm px-[5px] py-[10px] text-lg font-normal text-second hover:text-primary'
                }
                onClick={() => setShowLogoutModal(true)}
            >
                <img className="" src={'/icons/admin-sidebar/Log Out.svg'} alt="Đăng xuất" />
                Đăng xuất
            </button>

            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onLogout={handleLogout}
            />
        </div>
    )
}
