import { Footer } from '~/components/Footer';
import { NavBar } from '~/components/NavBar';
import ScrollToTopButton from '~/components/ui/ScrollToTop';

type DefaultLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <NavBar />
      <main className="inner min-h-screen overflow-x-hidden text-second">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default DefaultLayout;
