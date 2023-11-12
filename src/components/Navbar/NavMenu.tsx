import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  ArrowLeftOnRectangleIcon,
  ListBulletIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Button from '@components/UI/Forms/Button';
import { logOut } from '@data/auth';

const solutions = [
  {
    name: 'Account',
    description: 'Manage your profile',
    href: '/account',
    icon: UserIcon,
  },
  {
    name: 'Saved Recipes',
    description: 'Keep track of your favorite dishes',
    href: '/saved-recipes',
    icon: ListBulletIcon,
  },
];

export default function NavMenu({ name }: { name: string | null }) {
  return (
    <Popover className='relative'>
      <Popover.Button className='inline-flex items-center gap-x-1 text-sm font-semibold leading-6 outline:none focus:outline-none text-gray-900 py-3 px-2'>
        <span className='text-lg'>{name}</span>
        <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel className='absolute left-0 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2'>
          <div className='w-screen max-w-sm flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
            <div className='p-4'>
              {solutions.map((item) => (
                <div
                  key={item.name}
                  className='group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50'
                >
                  <div className='mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
                    <item.icon
                      className='h-6 w-6 text-gray-600 group-hover:text-indigo-600'
                      aria-hidden='true'
                    />
                  </div>
                  <div>
                    <a href={item.href} className='font-semibold text-gray-900'>
                      {item.name}
                      <span className='absolute inset-0' />
                    </a>
                    <p className='mt-1 text-gray-600'>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant='naked'
              className='flex items-center gap-x-2 w-full rounded-none px-4 bg-gray-50 hover:bg-gray-100'
              onClick={logOut}
            >
              <ArrowLeftOnRectangleIcon
                className='h-5 w-5 flex-none text-primary-500'
                aria-hidden='true'
              />
              Logout
            </Button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
