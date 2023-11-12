import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Recipeshive',
  description: `Welcome back to RecipesHive. Log in to continue your culinary adventure, revisit your saved recipes, and connect with our vibrant food-loving community.`,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
