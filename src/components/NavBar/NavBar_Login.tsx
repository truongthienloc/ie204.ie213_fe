import WatchLaterIcon from '@mui/icons-material/WatchLater'
import CallIcon from '@mui/icons-material/Call'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import logo from '~/assets/images/logo.svg'
import defaultProfileImg from '~/assets/images/default_profile_image.svg'
import Link from 'next/link'

function NavBar_Login() {
    // const cart = useSelector((state) => state.cart)
    // const user = useSelector((state) => state.user)
    return (
        <div className="w-full flex flex-col shadow-md bg-third">
            <div className="bg-primary text-white">
                <div className="w-primary mx-auto max-w-full flex flex-row pl-24 py-1 gap-14">
                    <div className="flex flex-row gap-2 items-center ">
                        <WatchLaterIcon />
                        <p>7.30 AM - 9.30 PM</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <CallIcon />
                        <p>+84 344444404</p>
                    </div>
                </div>
            </div>

            <div>
                <div className="w-primary mx-auto max-w-full flex flex-row h-24 gap-12 py-3 px-20 items-center">
                    <div className="flex flex-1">
                        <Link href={'/'} className="my-0 mx-auto">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    {/* Update các endpoint vào của các trang vào đây */}
                    <NavItem href={'/home'} text={'TRANG CHỦ'} />
                    <NavItem href={'/product'} text={'SẢN PHẨM'} />
                    <NavItem href={'/reservation'} text={'ĐẶT BÀN'} />
                    <NavItem href={'/about'} text={'GIỚI THIỆU'} />

                    {/* Update endpoint của trang giỏ hàng vào đây */}
                    <Link
                        className="bg-second text-white w-14 h-14 rounded-full flex flex-col items-center justify-center transition-opacity hover:opacity-70 hover:text-white"
                        href={'/cart'}
                    >
                        <p className="font-bold">{''}</p>
                        <ShoppingCartIcon />
                    </Link>

                    <div className="flex flex-1">
                        <div className="w-[65px] h-[65px] rounded-[50%] border-primary border-[1px] flex items-center justify-center overflow-hidden ml-auto">
                            <Link href={'/user'} className="my-0 mx-auto ">
                                <img
                                    src={'' || defaultProfileImg}
                                    alt="Profile Image"
                                    className="w-full h-full object-contain"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar_Login

type NavItemProps = {
    href: string
    text: string
}

function NavItem({ href, text }: NavItemProps) {
    return (
        <Link
            href={href}
            className="uppercase text-second font-bold hover:text-primary [&.active]:text-primary"
        >
            {text}
        </Link>
    )
}
