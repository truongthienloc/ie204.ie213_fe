import HomeIcon from '@mui/icons-material/Home'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import BookOnlineIcon from '@mui/icons-material/BookOnline'
import Book from '@mui/icons-material/Book'
import InfoIcon from '@mui/icons-material/Info'
import { NavbarItem } from '~/types/NavbarItem'

export const navbarItems: NavbarItem[] = [
    {
        id: 1,
        href: '/',
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
    {
        id: 5,
        href: '/blog',
        text: 'BÀI VIẾT',
        icon: <Book />,
    },
]
