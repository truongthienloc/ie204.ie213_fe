import { Metadata } from 'next'

import { NavBar } from '~/components/NavBar'
import { Footer } from '~/components/Footer'
import { ScrollToTopButton } from '~/components/ScrollToTop'

type DefaultLayoutProps = Readonly<{
    children: React.ReactNode
}>

export const metadata: Metadata = {
    title: 'Bếp UIT - Let us cook',
    description: '',
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <NavBar />
            <main className="inner mt-header-height min-h-screen overflow-x-hidden box-border font-roboto text-second">
                {children}
            </main>
            <Footer />
            <ScrollToTopButton />
        </>
    )
}

export default DefaultLayout
