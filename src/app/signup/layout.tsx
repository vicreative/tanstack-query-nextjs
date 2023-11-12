import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Recipeshive',
  description: `Join RecipesHive, your culinary community. Sign up to access exclusive recipes, engage with fellow food enthusiasts, and embark on a flavorful journey.`,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
