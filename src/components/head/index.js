import PropTypes from 'prop-types';
import { memo } from 'react';
import LocaleSelector from '../locale-selector';
import './style.css';

function Head({ title, onChangeLocale, defaultLocale }) {
  return (
    <div className="Head">
      <h1>{title}</h1>

      <LocaleSelector onChange={onChangeLocale} option={defaultLocale} />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  onChangeLocale: PropTypes.func.isRequired,
  defaultLocale: PropTypes.string,
};

export default memo(Head);
