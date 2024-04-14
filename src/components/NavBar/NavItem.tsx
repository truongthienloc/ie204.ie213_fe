import Link from 'next/link'
import { NavbarItem } from '~/types/NavbarItem'

type NavItemProps = {
    item: NavbarItem
    className: string
    isActive?: boolean
}

export default function NavItem({ isActive, item, className }: NavItemProps) {
    return (
        <li className={className}>
            <Link
                href={item?.href}
                className={`text-nowrap text-center font-bold uppercase hover:text-primary ${isActive ? 'text-primary' : 'text-secondary'}`}
            >
                {item?.text}
            </Link>
        </li>
    )
}
