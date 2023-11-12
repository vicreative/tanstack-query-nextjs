import '@styles/global.css';
import { Crimson_Pro } from 'next/font/google';
import Providers from '@providers';
import { Metadata } from 'next';
import app from '@config/firebase';
import { getAnalytics, isSupported } from 'firebase/analytics';

export const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3005'),
  title: 'Recipeshive - Your Ultimate Destination for Food and Drink Recipes',
  description:
    'Explore a variety of flavors and delectable recipes - your go-to culinary companion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  isSupported().then((yes) => (yes ? getAnalytics(app) : null));

  return (
    <html lang='en'>
      <body className={crimsonPro.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
