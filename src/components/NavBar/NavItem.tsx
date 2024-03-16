import Link from 'next/link'

type NavItemProps = {
    href: string
    text: string
}

export default function NavItem({ href, text }: NavItemProps) {
    return (
        <Link
            href={href}
            className="uppercase text-secondary text-center font-bold hover:text-primary [&.active]:text-primary"
        >
            {text}
        </Link>
    )
}
