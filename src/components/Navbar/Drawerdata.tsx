import React from 'react';
import Link from 'next/link';
import usePathname from '@hooks/usePathname';
import SearchInput from '@components/UI/Forms/SearchInput';
import Button from '@components/UI/Forms/Button';
import { User } from 'firebase/auth';

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Contact Us', href: '/contact' },
];

const userRoutes: NavigationItem[] = [
  { name: 'Account', href: '/account' },
  { name: 'Saved Recipes', href: '/saved-recipes' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Data = ({ user }: { user: User | null }) => {
  const pathname = usePathname();

  return (
    <div className='rounded-md max-w-sm w-full mx-auto'>
      <div className='flex-1 space-y-4 py-1'>
        <div className='sm:block'>
          <div className='space-y-1 px-5 pt-2 pb-3'>
            {user && (
              <p className='text-2xl pb-4 font-medium'>{`Hi, ${user.displayName}`}</p>
            )}

            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    active
                      ? 'text-black cursor-default'
                      : 'text-black hover:bg-primary-25',
                    'block py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
            {userRoutes.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    active
                      ? 'text-black cursor-default'
                      : 'text-black hover:bg-primary-25',
                    'block py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className='pt-2 flex flex-col gap-3'>
              <SearchInput />
              {!user && (
                <div className='flex flex-col gap-2'>
                  <Link href='/signup'>
                    <Button variant='accent' type='button' className='w-full'>
                      Sign Up
                    </Button>
                  </Link>
                  <Link href='/login'>
                    <Button variant='outline' type='button' className='w-full'>
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
