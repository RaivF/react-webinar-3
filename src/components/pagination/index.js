import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import { usePagination } from '../../hooks/use-pagination';
import { codeGenerator } from '../../utils';
import Button from '../button';
import './style.css';

const createCode = codeGenerator(Math.floor(Math.random() * 1000));

const Pagination = ({ start = 1, currentPage, size, total, onClick }) => {
  const { controls } = usePagination({ start, currentPage, size, total });
  const cn = bem('Pagination');

  return (
    <div className={cn()}>
      {controls.map(({ type, page }) => {
        if (type === 'button') {
          return (
            <Button
              key={createCode()}
              title={page}
              isActive={page === currentPage}
              onClick={() => onClick(page)}
            />
          );
        } else {
          return (
            <span key={createCode()} className={cn('ellipsis')}>
              {page}
            </span>
          );
        }
      })}
    </div>
  );
};

Pagination.propTypes = {
  start: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Pagination);
