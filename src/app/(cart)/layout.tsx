import { NavBar } from '~/components/NavBar'
import { Metadata } from 'next'
import { Footer } from '~/components/Footer'
import { ScrollToTopButton } from '~/components/ScrollToTop'

type CartLayoutProps = Readonly<{
    children: React.ReactNode
}>

export function generateMetadata(): Metadata {
    return {
        title: 'Bếp UIT - Giỏ hàng',
    }
}

function CartLayout({ children }: CartLayoutProps) {
    return (
        <>
            <NavBar />
            <main className="mt-header-height box-border flex min-h-screen flex-col overflow-x-hidden text-second">
                {children}
            </main>
            <Footer />
            <ScrollToTopButton />
        </>
    )
}

export default CartLayout
