import Link from 'next/link'
import { NavbarItem } from '~/types/NavbarItem'

type NavItemProps = {
    item: NavbarItem
    active?: boolean
    className: string
}

export default function NavItem({ item, active, className }: NavItemProps) {
    return (
        <li className={className}>
            <Link
                href={item?.href}
                className="text-nowrap text-center font-bold uppercase text-secondary hover:text-primary"
            >
                {item?.text}
            </Link>
        </li>
    )
}
