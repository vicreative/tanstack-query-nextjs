import Navbar from '@components/Navbar/index';
import Footer from '@components/Footer/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Recipeshive',
  description: `Learn about RecipesHive's commitment to your privacy. Our Privacy Policy explains how we protect your data and ensure a secure and enjoyable experience on our website.`,
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
