import WatchLaterIcon from '@mui/icons-material/WatchLater'
import CallIcon from '@mui/icons-material/Call'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Link from 'next/link'
import NavItem from './NavItem'
import NavDrawer from './NavDrawer'

function NavBar() {
    return (
        <div className="w-full flex flex-col shadow-md bg-third">
            <div className="bg-primary text-white">
                <div className="w-primary mx-auto max-w-full flex flex-row max-lg:pl-2 pl-24 py-1 gap-14">
                    <div className="max-[400px]:hidden flex flex-row gap-2 items-center ">
                        <WatchLaterIcon />
                        <p>7.30 AM - 9.30 PM</p>
                    </div>
                    <div className="max-[400px]:invisible flex flex-row gap-2 items-center">
                        <CallIcon />
                        <p className="text-nowrap">+84 344444404</p>
                    </div>
                </div>
            </div>

            <div>
                <div className="w-primary mx-auto max-w-full flex flex-row h-24 gap-12 py-3 px-16 max-lg:px-4 items-center max-lg:justify-between">
                    <div className="flex">
                        <Link href={'/'} className="my-0 mx-auto">
                            <img className="min-w-[111px]" src={'/logos/logo.svg'} alt="logo" />
                        </Link>
                    </div>

                    {/* Chỉ xuất hiện trong màn hình lớn */}
                    <div className="max-lg:hidden flex flex-row gap-12 items-center h-full">
                        {/* Update các endpoint vào của các trang vào đây */}
                        <NavItem href={'/home'} text={'TRANG CHỦ'} />
                        <NavItem href={'/product'} text={'SẢN PHẨM'} />
                        <NavItem href={'/reservation'} text={'ĐẶT BÀN'} />
                        <NavItem href={'/about'} text={'GIỚI THIỆU'} />
                        {/* Update endpoint của trang giỏ hàng vào đây */}
                        <Link
                            className="bg-secondary text-white w-14 h-14 rounded-full flex flex-col items-center justify-center transition-opacity hover:opacity-40 hover:text-white"
                            href={'/cart'}
                        >
                            <p className="font-bold">0</p>
                            <ShoppingCartIcon />
                        </Link>
                        <div className="hidden xl:flex flex-col text-second">
                            <p className="font-bold text-xl">Giao Hàng</p>
                            <p className="text-base text-nowrap">+84 344444404</p>
                        </div>
                        <img className="max-xl:hidden" src={'/icons/delivery.svg'} alt="delivery" />
                        <Link
                            className="py-1 px-3 bg-primary text-center text-white font-bold rounded-lg transition-opacity hover:opacity-40 hover:text-white"
                            href={'/login'}
                        >
                            Đăng nhập
                        </Link>
                    </div>

                    {/* Chỉ xuất hiện trong màn hình nhỏ */}
                    <NavDrawer className="lg:hidden" />
                </div>
            </div>
        </div>
    )
}

export default NavBar
