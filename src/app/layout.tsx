import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '~/styles/globals.scss';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { Roboto } from 'next/font/google';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';

import { TanstackProvider } from '~/components/TanstackProvider';
import defaultConfigs from '~/configs/defaultConfigs';
import { actions, contact } from '~/configs/jsonLD';
import { AutoLogin } from '~/stores/auth';

import type { Metadata } from 'next';

const roboto = Roboto({ subsets: ['vietnamese'], weight: ['400'] });
const { appMetadata } = defaultConfigs;

export const metadata: Metadata = {
  ...appMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={roboto.className}>
        <TanstackProvider>{children}</TanstackProvider>
        <AutoLogin />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
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
      <GoogleAnalytics gaId="G-XWLJFZT5Z7" />
      <Analytics />
    </html>
  );
}
