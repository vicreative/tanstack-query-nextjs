import React from 'react';
import { usePagination, DOTS } from '@hooks/usePagination';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type PaginationProps = {
  onPageChange: (pageParam: number | string) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
  totalPages,
}: PaginationProps) => {
  const siblingCount = 1;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    if (currentPage !== totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul className='flex flex-row justify-between items-center w-full pt-24 pb-2 overflow-x-scroll'>
      <li
        className={`${
          currentPage === 1 ? 'opacity-20 cursor-not-allowed' : ''
        } flex items-center gap-1 md:gap-2 text-sm md:text-xl`}
        role='button'
        onClick={onPrevious}
      >
        <IoIosArrowBack />
        <p>Previous</p>
      </li>

      <div className={'flex gap-1 md:gap-4'}>
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li className='text-sm md:text-xl' key={index}>
                &#8230;
              </li>
            );
          }

          return (
            <li
              className={`${
                pageNumber === currentPage ? 'bg-white' : ''
              } text-sm md:text-xl px-2 md:px-3 py-0 md:py-1 rounded-md `}
              role='button'
              key={index}
              onClick={() => onPageChange(pageNumber)}
            >
              <p>{pageNumber}</p>
            </li>
          );
        })}
      </div>

      <li
        className={`${
          currentPage === lastPage ? 'opacity-20 cursor-not-allowed' : ''
        } flex items-center gap-1 md:gap-2 text-sm md:text-xl`}
        role='button'
        onClick={onNext}
      >
        <p>Next</p>
        <IoIosArrowForward />
      </li>
    </ul>
  );
};

export default Pagination;
