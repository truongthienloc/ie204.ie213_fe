import Book from '@mui/icons-material/Book';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import HomeIcon from '@mui/icons-material/Home';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import InfoIcon from '@mui/icons-material/Info';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';

import ROUTES from '~/constants/routes';

export type NavbarItem = {
  id: number;
  href: string;
  text: string;
  icon?: JSX.Element;
};

export const navbarItems: NavbarItem[] = [
  {
    id: 1,
    href: ROUTES.HOME,
    text: 'TRANG CHỦ',
    icon: <HomeIcon />,
  },
  {
    id: 2,
    href: ROUTES.PRODUCT,
    text: 'SẢN PHẨM',
    icon: <RestaurantIcon />,
  },
  {
    id: 3,
    href: ROUTES.TABLE_RESERVATION,
    text: 'ĐẶT BÀN',
    icon: <BookOnlineIcon />,
  },
  {
    id: 4,
    href: ROUTES.ABOUT,
    text: 'GIỚI THIỆU',
    icon: <InfoIcon />,
  },
  {
    id: 5,
    href: ROUTES.BLOG,
    text: 'BÀI VIẾT',
    icon: <Book />,
  },
];

export const userSidebarItems: NavbarItem[] = [
  {
    id: 1,
    text: 'Thông tin khách hàng',
    href: ROUTES.USER_PROFILE,
    icon: <PermIdentityIcon />,
  },
  {
    id: 2,
    text: 'Quản lý đơn hàng',
    href: ROUTES.ORDER,
    icon: <LibraryBooksOutlinedIcon />,
  },
  {
    id: 3,
    text: 'Ưu đãi',
    href: ROUTES.DISCOUNT,
    icon: <LocalOfferOutlinedIcon />,
  },
  {
    id: 4,
    text: 'Thông tin đặt bàn',
    href: ROUTES.TABLE_ORDER,
    icon: <TableRestaurantOutlinedIcon />,
  },
  {
    id: 5,
    text: 'Đổi mật khẩu',
    href: ROUTES.CHANGE_PASSWORD,
    icon: <HttpsOutlinedIcon />,
  },
];
