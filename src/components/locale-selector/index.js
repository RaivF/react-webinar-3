import PropTypes from 'prop-types';

const LocaleSelector = ({ onChange, option }) => {
  return (
    <select
      value={option ?? 'en'}
      onChange={e => onChange(e.target.value)}
    >
      <option value='ru'>Русский</option>
      <option value='en'>English</option>
    </select>
  );
};

LocaleSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  option: PropTypes.string,
};

export default LocaleSelector;
