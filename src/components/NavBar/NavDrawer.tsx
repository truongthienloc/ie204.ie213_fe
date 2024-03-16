'use client'

import React, { useState } from 'react'
import { cn } from '~/lib/utils'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import BookOnlineIcon from '@mui/icons-material/BookOnline'
import InfoIcon from '@mui/icons-material/Info'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const NavItemList = [
    {
        id: 1,
        href: '/home',
        text: 'TRANG CHỦ',
        icon: <HomeIcon />,
    },
    {
        id: 2,
        href: '/product',
        text: 'SẢN PHẨM',
        icon: <RestaurantIcon />,
    },
    {
        id: 3,
        href: '/reservation',
        text: 'ĐẶT BÀN',
        icon: <BookOnlineIcon />,
    },
    {
        id: 4,
        href: '/about',
        text: 'GIỚI THIỆU',
        icon: <InfoIcon />,
    },
]

type NavDrawerProps = {
    className: string
}

export default function NavDrawer({ className }: NavDrawerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const isAuth = false

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    return (
        <>
            <Button
                className={cn(
                    'border border-solid border-gray-500 transition-colors hover:border-primary [&_*]:hover:text-primary',
                    className,
                )}
                onClick={handleOpen}
            >
                <MenuIcon className="text-black transition-colors" />
            </Button>
            <Drawer anchor="right" open={isOpen} onClose={handleClose}>
                <Box sx={{ width: 250 }} role="presentation" onClick={handleClose}>
                    <List>
                        {NavItemList.map((value) => (
                            <ListItem key={value.id} disablePadding>
                                <Link className="w-[inherit]" href={value.href}>
                                    <ListItemButton>
                                        <ListItemIcon>{value.icon}</ListItemIcon>
                                        <ListItemText primary={value.text} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>

                    <Divider />

                    <List>
                        <ListItem disablePadding>
                            <Link className="w-[inherit]" href={'/cart'}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ShoppingCartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'GIỎ HÀNG'} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            {isAuth ? (
                                <Link className="w-[inherit]" href={'/user'}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <div className="w-[40px] h-[40px] rounded-full border-primary border flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={'' || '/images/default_profile_image.svg'}
                                                    alt="Profile Image"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </ListItemIcon>
                                        <ListItemText primary={'HỒ SƠ'} />
                                    </ListItemButton>
                                </Link>
                            ) : (
                                <Link
                                    className="py-1 px-3 mx-auto bg-primary text-center text-white font-bold rounded-lg transition-opacity hover:opacity-40 hover:text-white"
                                    href={'/login'}
                                >
                                    Đăng nhập
                                </Link>
                            )}
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    )
}
