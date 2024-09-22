import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import { cn as bem } from '@bem-react/classname';

function List({ children = <></> }) {
  const cn = bem('List');

  return <div className={cn()}>{children}</div>;
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  action: PropTypes.func,
};

export default React.memo(List);
