import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | Recipeshive',
  description: `Reset your RecipesHive password. Use our Forgot Password page to regain access to your account. We've got you covered.`,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
