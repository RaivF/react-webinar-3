import PropTypes from 'prop-types';
import PageLayout from '../page-layout';

function Loader({ title }) {
  return (
    <PageLayout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: 'xx-large' }}>{title}</h2>
      </div>
    </PageLayout>
  );
}

Loader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Loader;
