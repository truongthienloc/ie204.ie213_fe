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
import CloseIcon from '@mui/icons-material/Close'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import Login from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { usePathname, useRouter } from 'next/navigation'

import styles from '../../styles/navbar.module.scss'
import { navbarItems } from '~/data'
import { NavbarItem } from '~/types/NavbarItem'
import { useAuth } from '~/stores/auth'
import { clientInstance } from '~/services/axios'

export default function NavDrawer() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const { isLogin, avatar, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        clientInstance.removeAccessToken()
        logout()
        router.replace('/')
    }
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    return (
        <>
            <Button
                className={cn(
                    'border border-solid border-gray-500 transition-colors hover:border-primary [&_*]:hover:text-primary',
                    styles.bar,
                )}
                onClick={handleOpen}
            >
                <MenuIcon className="text-black transition-colors" />
            </Button>
            <Drawer anchor="right" open={isOpen} onClose={handleClose}>
                <div className={styles.closeDrawer}>
                    <button onClick={handleClose}>
                        <CloseIcon className={styles.icon} />
                    </button>
                </div>

                <Box sx={{ width: 260 }} role="presentation" onClick={handleClose}>
                    <List>
                        {navbarItems.map((item: NavbarItem) => {
                            let isActive = pathname.startsWith(item?.href)
                            if (item?.href === '/' && pathname !== '/') isActive = false

                            return (
                                <ListItem key={item?.id} disablePadding>
                                    <Link className="w-[inherit]" href={item?.href}>
                                        <ListItemButton>
                                            <ListItemIcon
                                                className={`${styles.icon} ${isActive ? styles.active : ''}`}
                                            >
                                                {item?.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item?.text}
                                                className={`${styles.text} ${isActive ? styles.active : ''}`}
                                            />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            )
                        })}
                        {isLogin ? (
                            <>
                                <ListItem disablePadding>
                                    <Link className="w-[inherit]" href={'/cart'}>
                                        <ListItemButton>
                                            <ListItemIcon className={styles.icon}>
                                                <ShoppingCartIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={'GIỎ HÀNG'}
                                                className={styles.text}
                                            />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link className="w-[inherit]" href={'/user/profile'}>
                                        <ListItemButton>
                                            <img
                                                src={avatar || '/images/default_user.png'}
                                                alt="User Avatar"
                                                width={28}
                                                height={28}
                                                className="mr-2"
                                            />
                                            <ListItemText
                                                primary={'HỒ SƠ'}
                                                className={styles.text}
                                            />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>

                                <Divider />

                                <ListItem disablePadding>
                                    <button
                                        className={cn(styles.btn, styles.drawerBtn)}
                                        onClick={handleLogout}
                                    >
                                        <LogoutOutlinedIcon className={styles.icon} />
                                        <span className={styles.text}>Đăng xuất</span>
                                    </button>
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <Divider />

                                <ListItem disablePadding>
                                    <Link
                                        className={cn(styles.btn, styles.drawerBtn)}
                                        href={'/login'}
                                    >
                                        <Login className={styles.icon} />
                                        <span className={styles.text}>Đăng nhập</span>
                                    </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link
                                        className={cn(styles.btn, styles.drawerBtn)}
                                        href={'/signup'}
                                    >
                                        <PersonAddIcon className={styles.icon} />
                                        <span className={styles.text}>Đăng ký</span>
                                    </Link>
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}
