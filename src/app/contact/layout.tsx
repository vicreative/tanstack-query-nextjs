import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Recipeshive',
  description: `Get in touch with RecipesHive. Contact us for questions, feedback, or collaborations. We're here to assist you on your culinary journey.`,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
