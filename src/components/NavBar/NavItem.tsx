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
                className="uppercase text-secondary text-center text-nowrap font-bold hover:text-primary"
            >
                {item?.text}
            </Link>
        </li>
    )
}
