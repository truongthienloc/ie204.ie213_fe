import { NavBar } from '~/components/NavBar'
import { Footer } from '~/components/Footer'
import { ScrollToTopButton } from '~/components/ScrollToTop'

type DefaultLayoutProps = Readonly<{
    children: React.ReactNode
}>

function DefaultLayout({ children }: DefaultLayoutProps) {
    // const user = useSelector((state) => state.user)
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden box-border font-roboto text-second">
            <NavBar />
            {children}
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}

export default DefaultLayout
