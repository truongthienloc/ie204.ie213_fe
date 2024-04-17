import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import Script from 'next/script'
import { TanstackProvider } from '~/components/TanstackProvider'
import keyword from '../configs/BrandKeywords'
import './globals.scss'
import { contact, actions } from '~/data/jsonLDConfig'
import 'react-toastify/dist/ReactToastify.css'

const roboto = Roboto({ subsets: ['vietnamese'], weight: ['400'] })

export const metadata: Metadata = {
    title: 'Bếp UIT - Let us cook',
    description:
        'Bếp UIT - Nhà hàng đạt chuẩn 4food đầu tiên tại Việt Nam. Chúng tôi mang đến cho bạn những món ăn truyền thống Việt Nam, đậm đà hương vị quê hương. Với không gian ấm cúng và phục vụ chuyên nghiệp, chúng tôi cam kết mang đến cho quý khách hàng một trải nghiệm ẩm thực độc đáo và tuyệt vời nhất.',

    keywords: keyword,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={roboto.className}>
                <TanstackProvider>{children}</TanstackProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />
                <Script
                    type="application/ld+json"
                    id="ld__contact"
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(contact) }}
                />
                <Script
                    type="application/ld+json"
                    id="ld__action"
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(actions) }}
                />
            </body>
        </html>
    )
}
