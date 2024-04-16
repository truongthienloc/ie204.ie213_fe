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
import Login from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import styles from '../../styles/navbar.module.scss'
import { navbarItems } from '~/data'
import { NavbarItem } from '~/types/NavbarItem'

export default function NavDrawer() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const isAuth = false // lấy từ store

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
                    </List>

                    <Divider />

                    <List>
                        <ListItem disablePadding>
                            <Link className="w-[inherit]" href={'/cart'}>
                                <ListItemButton>
                                    <ListItemIcon className={styles.icon}>
                                        <ShoppingCartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'GIỎ HÀNG'} className={styles.text} />
                                </ListItemButton>
                            </Link>
                        </ListItem>

                        {isAuth ? (
                            <ListItem disablePadding>
                                <Link className="w-[inherit]" href={'/user'}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Image
                                                src={'' || '/images/default_profile_image.svg'}
                                                alt="User Avatar"
                                                width={10}
                                                height={10}
                                                className={styles.avatar}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={'HỒ SƠ'} className={styles.text} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ) : (
                            <>
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
