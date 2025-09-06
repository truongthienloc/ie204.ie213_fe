'use client';

import CloseIcon from '@mui/icons-material/Close';
import Login from '@mui/icons-material/Login';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { type NavbarItem, navbarItems } from '~/configs/navbar';
import ROUTES from '~/constants/routes';
import cn from '~/lib/cn';
import { useAuth } from '~/stores/auth';
import { useCart } from '~/stores/cart/useCart';

import styles from '../../styles/navbar.module.scss';

export default function NavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const { removeAll } = useCart();

  const handleLogout = () => {
    logout();
    removeAll();
    router.replace(ROUTES.HOME);
  };
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

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
              let isActive = pathname.startsWith(item?.href);
              if (item?.href === ROUTES.HOME && pathname !== ROUTES.HOME) isActive = false;

              return (
                <ListItem key={item?.id} disablePadding>
                  <Link className="w-[inherit]" href={item?.href}>
                    <ListItemButton>
                      <ListItemIcon className={`${styles.icon} ${isActive ? styles.active : ''}`}>
                        {item?.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item?.text}
                        className={`${styles.text} ${isActive ? styles.active : ''}`}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              );
            })}
            {isAuthenticated ? (
              <>
                <ListItem disablePadding>
                  <Link className="w-[inherit]" href={ROUTES.CART}>
                    <ListItemButton>
                      <ListItemIcon className={styles.icon}>
                        <ShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText primary={'GIỎ HÀNG'} className={styles.text} />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link className="w-[inherit]" href={ROUTES.USER_PROFILE}>
                    <ListItemButton>
                      <img
                        src={user?.avatar.link ?? '/images/default_user.png'}
                        alt="User Avatar"
                        width={28}
                        height={28}
                        className="mr-2"
                      />
                      <ListItemText primary={'HỒ SƠ'} className={styles.text} />
                    </ListItemButton>
                  </Link>
                </ListItem>

                <Divider />

                <ListItem disablePadding>
                  <button className={cn(styles.btn, styles.drawerBtn)} onClick={handleLogout}>
                    <LogoutOutlinedIcon className={styles.icon} />
                    <span className={styles.text}>Đăng xuất</span>
                  </button>
                </ListItem>
              </>
            ) : (
              <>
                <Divider />

                <ListItem disablePadding>
                  <Link className={cn(styles.btn, styles.drawerBtn)} href={ROUTES.LOGIN}>
                    <Login className={styles.icon} />
                    <span className={styles.text}>Đăng nhập</span>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link className={cn(styles.btn, styles.drawerBtn)} href={ROUTES.SIGNUP}>
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
  );
}
