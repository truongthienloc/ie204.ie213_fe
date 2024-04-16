import { NavBar } from '~/components/NavBar'
import { Footer } from '~/components/Footer'
import { ScrollToTopButton } from '~/components/ScrollToTop'

type DefaultLayoutProps = Readonly<{
    children: React.ReactNode
}>

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <NavBar />
            <main className="inner mt-header-height box-border min-h-screen overflow-x-hidden text-second">
                {children}
            </main>
            <Footer />
            <ScrollToTopButton />
        </>
    )
}

export default DefaultLayout
