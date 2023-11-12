import Navbar from '@components/Navbar/index';
import Footer from '@components/Footer/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Recipes | Recipeshive',
  description: `Our extensive recipe collection covers everything from comforting classics to exotic dishes, and we cater to various dietary preferences.`,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
