import Navbar from '@components/Navbar/index';
import Footer from '@components/Footer/Footer';
import { Metadata } from 'next';
import ProtectedRoute from '@components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Acccount - Manage Your Profile | Recipeshive',
  description: `Access and personalize your RecipesHive account. Manage your profile and saved recipes all in one place.`,
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
