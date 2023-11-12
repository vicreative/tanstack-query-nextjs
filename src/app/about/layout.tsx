import Navbar from '@components/Navbar/index';
import Footer from '@components/Footer/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Recipeshive',
  description: `We're committed to providing a wide range of delicious, easy-to-follow recipes and fostering a vibrant community of food lovers who connect, share, and celebrate their love for food.`,
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
