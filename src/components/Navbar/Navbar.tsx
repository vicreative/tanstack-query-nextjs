import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Drawer from './Drawer';
import Drawerdata from './Drawerdata';
import Image from 'next/image';
import usePathname from '@hooks/usePathname';
import SearchInput from '@components/UI/Forms/SearchInput';
import Button from '@components/UI/Forms/Button';
import { useUser } from '@hooks/context/useUser';
import NavMenu from './NavMenu';
import { logOut } from '@data/auth';

interface NavigationItem {
  name: string;
  href: string;
  variant?: 'filled' | 'outline' | 'accent' | 'naked' | 'link';
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About us', href: '/about' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Contact Us', href: '/contact' },
];

const btnLinks: NavigationItem[] = [
  { name: 'Sign Up', href: '/signup', variant: 'accent' },
  { name: 'Login', href: '/login', variant: 'outline' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const {
    state: { user },
  } = useUser();
  const pathname = usePathname();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <Disclosure
      as='nav'
      className='flex justify-center relative w-full min-h-100 z-50'
    >
      <div className='navbar w-full'>
        <div className='mx-auto w-full max-w-7xl p-3 md:p-2 lg:px-8'>
          <div className='relative flex h-12 sm:h-20 items-center'>
            <div className='flex flex-1 items-center sm:justify-between'>
              {/* LOGO */}
              <div className='flex sm:hidden flex-shrink-0 items-center border-right'>
                <Image
                  src='/images/Logo/Logo.svg'
                  alt='logo'
                  width={36}
                  height={36}
                />
                <Link
                  href='/'
                  className='text-2xl font-semibold text-black ml-4'
                >
                  Recipeshive
                </Link>
              </div>
              <div className='hidden sm:flex flex-shrink-0 items-center border-right'>
                <Image
                  src={'/images/Logo/Logo.svg'}
                  alt='logo'
                  width={48}
                  height={48}
                />
                <Link
                  href='/'
                  className='text-2xl font-semibold text-black ml-4'
                >
                  Recipeshive
                </Link>
              </div>

              {/* LINKS */}
              <div className='hidden lg:flex items-center border-right '>
                <div className='flex justify-end space-x-3'>
                  {navigation.map((item) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== '/' && pathname.includes(item.href));

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          active
                            ? 'text-black hover:opacity-100'
                            : 'navlinks opacity-50 hover:opacity-70',
                          'px-3 py-4 rounded-md text-lg font-normal hover:text-black space-links'
                        )}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className='gap-3 hidden lg:flex'>
                <SearchInput />
                {user ? (
                  <div>
                    <NavMenu name={user.displayName} />
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    {btnLinks.map((link) => (
                      <Link key={link.name} href={link.href}>
                        <Button
                          colorScheme='primary'
                          variant={link.variant}
                          type='button'
                          className='min-w-90'
                          onClick={logOut}
                        >
                          {link.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* DRAWER FOR MOBILE VIEW */}

            {/* DRAWER ICON */}
            <div className='block lg:hidden'>
              <Bars3Icon
                className='block h-8 w-8'
                aria-hidden='true'
                onClick={() => setOpenDrawer(true)}
              />
            </div>

            {/* DRAWER LINKS DATA */}
            <Drawer isOpen={openDrawer} setIsOpen={setOpenDrawer}>
              <Drawerdata user={user} />
            </Drawer>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
