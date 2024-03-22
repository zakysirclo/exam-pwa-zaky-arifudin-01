import CircularProgress from '@common_circularprogress';
import PropTypes from 'prop-types';

const Loading = ({ size }) => (
    <div className="full-center">
        <CircularProgress size={size} />
    </div>
);

Loading.defaultProps = {
    size: '25rem',
};

Loading.propTypes = {
    size: PropTypes.string,
};

export default Loading;
