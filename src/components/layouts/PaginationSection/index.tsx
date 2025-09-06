'use client';

import Pagination from '@mui/material/Pagination';
import { useMemo } from 'react';

import colors from '~/constants/colors';

type PaginationProps = {
  totalCount: number;
  perPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  className?: string;
};

const PaginationSection: React.FC<PaginationProps> = ({
  totalCount,
  perPage,
  currentPage,
  setCurrentPage = () => {},
  className = '',
}) => {
  const pageQuantity = useMemo(() => Math.ceil(totalCount / perPage), [perPage, totalCount]);

  const handlePageSelect = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (!totalCount || !perPage || currentPage < 1) return null;

  return (
    <Pagination
      count={pageQuantity}
      page={currentPage}
      shape="rounded"
      variant="text"
      sx={{
        '& .MuiPaginationItem-root': {
          color: colors.secondary.DEFAULT,
          fontSize: '16px',
          padding: '8px',
          margin: '0 4px',
        },
        '& .MuiPaginationItem-root:hover': {
          backgroundColor: 'rgba(0,0,0,.05)',
          transition: 'all ease 0.2s',
        },
        '& .MuiPaginationItem-page.Mui-selected, & .MuiPaginationItem-page.Mui-selected:hover': {
          backgroundColor: colors.primary.DEFAULT,
          color: 'white',
        },
      }}
      className={className}
      onChange={handlePageSelect}
    />
  );
};

PaginationSection.displayName = 'PaginationSection';

export default PaginationSection;
