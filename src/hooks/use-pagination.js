import { useMemo } from 'react';

export const usePagination = ({ start = 1, currentPage, size, total }) => {
  const controls = useMemo(() => {
    const totalPages = Math.ceil(total / size);

    let offset = 0;
    if (currentPage === start) offset = start + 1;
    if (currentPage === totalPages) offset = totalPages - 1;

    const PaginationControls = [
      {
        type: 'button',
        label: 'Start',
        page: start,
        show: true,
      },
      {
        page: '...',
        show: currentPage > start + 2 && totalPages > start + 3,
      },
      {
        type: 'button',
        label: 'Prev',
        page:
          currentPage === totalPages
            ? Math.min(currentPage - 1, offset - 1)
            : Math.max(currentPage - 1, offset - 1),
        show: currentPage > start + 1 && totalPages > start + 2,
      },
      {
        type: 'button',
        label: 'Middle',
        page:
          currentPage === totalPages && currentPage > 2
            ? Math.min(currentPage, offset)
            : Math.max(currentPage, offset),
        show: totalPages > start,
      },
      {
        type: 'button',
        label: 'Next',
        page: Math.max(currentPage + 1, offset + 1),
        show: currentPage < totalPages - 1 && totalPages > start + 2,
      },
      {
        page: '...',
        show: currentPage < totalPages - 2 && totalPages > start + 3,
      },
      {
        type: 'button',
        label: 'End',
        page: totalPages,
        show: totalPages > start + 1,
      },
    ].filter(({ show }) => show);

    return PaginationControls;
  }, [start, currentPage, size, total]);

  return {
    controls,
  };
};
