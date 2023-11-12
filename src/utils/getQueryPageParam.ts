const getNextPageParam = (lastPage: any, pageParam: number) => {
  if (
    lastPage.nextPage <= lastPage.totalPages &&
    lastPage.nextPage !== lastPage.currentPage
  )
    return pageParam;

  return false;
};

const getPreviousPageParam = (firstPage: any, pageParam: number) => {
  if (firstPage.prevPage >= 1 && firstPage.prevPage <= firstPage.totalPages)
    return pageParam;
  return false;
};

export { getNextPageParam, getPreviousPageParam };
