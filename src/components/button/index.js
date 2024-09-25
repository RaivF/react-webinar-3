import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

const Button = ({ title, onClick, isActive }) => {
  const cn = bem('Button');

  return (
    <button
      onClick={() => onClick(title)}
      className={cn({ active: isActive })}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default Button;
