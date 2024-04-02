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

export const sliderBanners = [
    {
        id: 1,
        alt: 'Enjoy your chicken',
        image: '/images/banner1.svg',
    },
    {
        id: 2,
        alt: 'Thưởng thức beefsteak',
        image: '/images/banner2.svg',
    },
    {
        id: 3,
        alt: 'Cá hồi muối đặc biệt',
        image: '/images/banner3.svg',
    },
    {
        id: 4,
        alt: 'Mực chiên mắm',
        image: '/images/banner4.svg',
    },
]

// just for testing
export const mockProducts = [
    {
        id: 1,
        dishName: 'Spaghetti Carbonara',
        dishPrice: 12.99,
        dishDescription:
            'Classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
        dishTotalOrder: 35,
        dishRating: 4.5,
        dishImages: [
            {
                id: 1,
                link: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vb2R8ZW58MHx8MHx8fDA%3D',
            },
            { id: 2, link: 'https://example.com/images/spaghetti_carbonara_2.jpg' },
        ],
    },
    {
        id: 2,
        dishName: 'Chicken Tikka Masala',
        dishPrice: 14.99,
        dishDescription:
            'Tender chicken pieces marinated in yogurt and spices, cooked in a creamy tomato sauce.',
        dishTotalOrder: 42,
        dishRating: 4,
        dishImages: [
            {
                id: 1,
                link: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vb2R8ZW58MHx8MHx8fDA%3D',
            },
            { id: 2, link: 'https://example.com/images/chicken_tikka_masala_2.jpg' },
        ],
    },
    {
        id: 3,
        dishName: 'Sushi Combo',
        dishPrice: 18.5,
        dishDescription:
            'Assorted sushi rolls including California rolls, salmon nigiri, and tuna sashimi.',
        dishTotalOrder: 28,
        dishRating: 3,
        dishImages: [
            {
                id: 1,
                link: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vb2R8ZW58MHx8MHx8fDA%3D',
            },
            { id: 2, link: 'https://example.com/images/sushi_combo_2.jpg' },
        ],
    },
    {
        id: 4,
        dishName: 'Margherita Pizza',
        dishPrice: 10.99,
        dishDescription:
            'Classic Italian pizza topped with tomato sauce, fresh mozzarella, and basil leaves.',
        dishTotalOrder: 50,
        dishRating: 4,
        dishImages: [
            {
                id: 1,
                link: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vb2R8ZW58MHx8MHx8fDA%3D',
            },
            { id: 2, link: 'https://example.com/images/margherita_pizza_2.jpg' },
        ],
    },
    {
        id: 5,
        dishName: 'Pad Thai',
        dishPrice: 11.5,
        dishDescription:
            'Traditional Thai stir-fried rice noodles with shrimp, tofu, bean sprouts, and peanuts.',
        dishTotalOrder: 38,
        dishRating: 4.4,
        dishImages: [
            {
                id: 1,
                link: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vb2R8ZW58MHx8MHx8fDA%3D',
            },
            { id: 2, link: 'https://example.com/images/pad_thai_2.jpg' },
        ],
    },
    {
        id: 6,
        dishName: 'Steak Frites',
        dishPrice: 22.99,
        dishDescription:
            'Juicy steak served with crispy French fries and a side of peppercorn sauce.',
        dishTotalOrder: 31,
        dishRating: 4.9,
        dishImages: [
            {
                id: 1,
                link: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vb2R8ZW58MHx8MHx8fDA%3D',
            },
            { id: 2, link: 'https://example.com/images/steak_frites_2.jpg' },
        ],
    },
    {
        id: 7,
        dishName: 'Caesar Salad',
        dishPrice: 8.99,
        dishDescription:
            'Classic Caesar salad made with crisp romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.',
        dishTotalOrder: 45,
        dishRating: 4.3,
        dishImages: [
            {
                id: 1,
                link: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vb2R8ZW58MHx8MHx8fDA%3D',
            },
            { id: 2, link: 'https://example.com/images/caesar_salad_2.jpg' },
        ],
    },
    {
        id: 8,
        dishName: 'Pho Soup',
        dishPrice: 9.5,
        dishDescription:
            'Vietnamese noodle soup with beef or chicken, herbs, and rice noodles in a flavorful broth.',
        dishTotalOrder: 40,
        dishRating: 4.7,
        dishImages: [
            {
                id: 1,
                link: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vb2R8ZW58MHx8MHx8fDA%3D',
            },
            { id: 2, link: 'https://example.com/images/pho_soup_2.jpg' },
        ],
    },
    {
        id: 9,
        dishName: 'Tiramisu',
        dishPrice: 7.99,
        dishDescription:
            'Classic Italian dessert made with layers of coffee-soaked ladyfingers, mascarpone cheese, and cocoa.',
        dishTotalOrder: 55,
        dishRating: 4.8,
        dishImages: [
            {
                id: 1,
                link: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vb2R8ZW58MHx8MHx8fDA%3D',
            },
            { id: 2, link: 'https://example.com/images/tiramisu_2.jpg' },
        ],
    },
    {
        id: 10,
        dishName: 'Hamburger',
        dishPrice: 13.99,
        dishDescription:
            'Classic beef burger served with lettuce, tomato, onion, pickles, and choice of cheese on a toasted bun.',
        dishTotalOrder: 48,
        dishRating: 4.6,
        dishImages: [
            {
                id: 1,
                link: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vb2R8ZW58MHx8MHx8fDA%3D',
            },
            { id: 2, link: 'https://example.com/images/hamburger_2.jpg' },
        ],
    },
]
