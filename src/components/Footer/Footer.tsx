import Link from 'next/link';
import Image from 'next/image';

interface socialLinks {
  imgSrc: string;
  link: string;
  width: number;
}

type ProductLink = {
  name: string;
  href: string;
  target?: string;
};

interface ProductType {
  id: number;
  section: string;
  link: ProductLink[];
}

const socialLinks: socialLinks[] = [
  {
    imgSrc: '/images/Footer/facebook.svg',
    link: 'https://facebook.com',
    width: 10,
  },
  {
    imgSrc: '/images/Footer/insta.svg',
    link: 'https://instagram.com',
    width: 14,
  },
  {
    imgSrc: '/images/Footer/twitter.svg',
    link: 'https://twitter.com',
    width: 14,
  },
];

const products: ProductType[] = [
  {
    id: 1,
    section: 'Company',
    link: [
      { name: 'About Us', href: '/about', target: '_self' },
      { name: 'Recipes', href: '/recipes', target: '_self' },
    ],
  },
  {
    id: 2,
    section: 'More',
    link: [
      { name: 'Support', href: '/contact', target: '_blank' },
      { name: 'Privacy Policy', href: '/privacy-policy', target: '_blank' },
    ],
  },
];

const footer = () => {
  return (
    <footer className='mx-auto max-w-2xl pt-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
      <div className='my-12 grid grid-cols-1 gap-y-10 sm:grid-cols-6 lg:grid-cols-12'>
        {/* COLUMN-1 */}
        <div className='sm:col-span-6 lg:col-span-6'>
          <div className='flex flex-shrink-0 items-center border-right'>
            <Image
              src='/images/Logo/Logo.svg'
              alt='logo'
              width={56}
              height={56}
            />
            <Link href='/' className='text-2xl font-semibold text-black ml-4'>
              Recipeshive
            </Link>
          </div>
          <h3 className='gray-900 text-xs font-medium mt-5 mb-4 lg:mb-16'>
            {' '}
            Your Culinary Destination for Endless Inspiration
          </h3>
          <div className='flex gap-4'>
            {socialLinks.map((items, i) => (
              <Link href={items.link} key={i}>
                <div className='bg-white h-10 w-10 shadow-xl text-base rounded-full flex items-center justify-center footer-icons hover:bg-primary-500'>
                  <Image
                    src={items.imgSrc}
                    alt={items.imgSrc}
                    width={20}
                    height={20}
                    className='sepiaa w-4 h-4'
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CLOUMN-2/3/4 */}
        {products.map((product) => (
          <div key={product.id} className='sm:col-span-3'>
            <p className='text-black text-xl font-semibold mb-9'>
              {product.section}
            </p>
            <ul>
              {product.link.map((link, index: number) => (
                <li key={index} className='mb-5'>
                  <Link
                    href={link.href}
                    target={link.target}
                    className='text-footerlinks text-base font-normal mb-6 space-links'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* All Rights Reserved */}

      <div className='py-10 md:flex items-center justify-between border-t border-t-bordertop'>
        <h4 className='text-rootBrew text-sm text-center md:text-start font-normal'>
          @2023 - Recipeshive. All Rights Reserved by{' '}
          <Link href='/'> Recipeshive.com</Link>
        </h4>
        <div className='flex gap-5 mt-5 md:mt-0 justify-center md:justify-start'>
          <h4 className='text-rootBrew text-sm font-normal'>
            <Link href='/privacy-policy' target='_blank'>
              Privacy policy
            </Link>
          </h4>
          {/* <div className='h-5 bg-bordertop w-0.5'></div>
          <h4 className='text-rootBrew text-sm font-normal'>
            <Link href='/terms' target='_blank'>
              Terms & conditions
            </Link>
          </h4> */}
        </div>
      </div>
    </footer>
  );
};

export default footer;
