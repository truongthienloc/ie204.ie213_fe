import HomeIcon from '@mui/icons-material/Home'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import BookOnlineIcon from '@mui/icons-material/BookOnline'
import Book from '@mui/icons-material/Book'
import InfoIcon from '@mui/icons-material/Info'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined'
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined'
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

export const sliderBanners = [
    {
        id: 1,
        alt: 'Món gà thơm ngon tại bếp UIT',
        image: '/images/banner1.svg',
    },
    {
        id: 2,
        alt: 'Thưởng thức beefsteak ở bếp UIT',
        image: '/images/banner2.svg',
    },
    {
        id: 3,
        alt: 'Cá hồi muối đặc biệt chỉ có ở bếp UIT',
        image: '/images/banner3.svg',
    },
    {
        id: 4,
        alt: 'Món mực chiên mắm mới nhất của bếp UIT',
        image: '/images/banner4.svg',
    },
]

export const userSidebarItems = [
    {
        id: 1,
        title: 'Thông tin khách hàng',
        href: '/profile',
        icon: <PermIdentityIcon />,
    },
    {
        id: 2,
        title: 'Quản lý đơn hàng',
        href: '/order',
        icon: <LibraryBooksOutlinedIcon />,
    },
    {
        id: 3,
        title: 'Ưu đãi',
        href: '/discount',
        icon: <LocalOfferOutlinedIcon />,
    },
    {
        id: 4,
        title: 'Thông tin đặt bàn',
        href: '/table-order',
        icon: <TableRestaurantOutlinedIcon />,
    },
    {
        id: 5,
        title: 'Đổi mật khẩu',
        href: '/change-password',
        icon: <HttpsOutlinedIcon />,
    },
]

export const priceFilters = [
    {
        id: '1',
        title: 'Dưới 20.000 VNĐ',
    },
    {
        id: '2',
        title: 'Từ 20.000 VNĐ - 50.000 VNĐ',
    },
    {
        id: '3',
        title: 'Trên 50.000 VNĐ',
    },
]
