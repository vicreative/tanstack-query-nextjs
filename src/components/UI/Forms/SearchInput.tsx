'use client';
import React, { forwardRef } from 'react';
import { BsSearch } from 'react-icons/bs';

interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {
  id?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const { id = 'search', ...rest } = props;

    return (
      <form role='search'>
        <div className='relative'>
          <input
            ref={ref}
            required
            name='q'
            id={id}
            type='search'
            minLength={1}
            autoComplete='on'
            onClick={(e) => e.stopPropagation()}
            className='min-w-200 w-full appearance-none rounded-full pl-10 pr-4 py-3 text-black placeholder-gray-200 focus:z-10 focus:border-indigo-500 focus:outline-none sm:text-sm bg-white'
            placeholder='Search for recipes or foods...'
            aria-label='Search through site content for recipes or foods...'
            {...rest}
          />
          <button className='absolute inset-y-0 left-0 pl-3 flex items-center'>
            <BsSearch className='gray-900' />
          </button>
        </div>
      </form>
    );
  }
);

export default SearchInput;
SearchInput.displayName = 'SearchInput';
