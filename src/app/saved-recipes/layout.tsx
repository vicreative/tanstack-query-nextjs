import Navbar from '@components/Navbar/index';
import Footer from '@components/Footer/Footer';
import { Metadata } from 'next';
import ProtectedRoute from '@components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Your Saved Recipes | Recipeshive',
  description: `Browse and manage your saved recipes. Save and organize your favorite recipes for quick access.`,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ProtectedRoute>
  );
}
