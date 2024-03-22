import cx from 'classnames';
import propTypes from 'prop-types';
import ArrowPath from '@heroicons/react/24/outline/ArrowPathIcon';

const CircularProgress = (props) => {
    const { className = {}, size = 'small', color = 'primary' } = props;

    let sizeClasses;
    let colorClasses;

    switch (size) {
    case 'small':
        sizeClasses = 'w-[20px] h-[20px]';
        break;
    case 'large':
        sizeClasses = 'w-[44px] h-[44px]';
        break;
    default:
        sizeClasses = 'w-[20px] h-[20px]';
        break;
    }

    switch (color) {
    case 'primary':
        colorClasses = 'text-primary-700';
        break;
    case 'secondary':
        colorClasses = 'text-secondary-700';
        break;
    case 'neutral':
        colorClasses = 'text-neutral-700';
        break;
    default:
        colorClasses = 'text-primary-700';
        break;
    }

    const classes = cx(sizeClasses, colorClasses, 'animate-spin-with-opacity');

    return (
        <div className={cx(className)}>
            <ArrowPath className={cx(classes, 'animate-spin')} />
            <style jsx>
                {`
                    .animate-spin-with-opacity {
                        animation: spin-with-opacity 1s linear infinite;
                    }

                    @keyframes spin-with-opacity {
                        0% {
                            opacity: 1;
                            rotate: 0deg;
                        }
                        25% {
                            opacity: 0.9;
                            rotate: 90deg;
                        }
                        50% {
                            opacity: 0.8;
                            rotate: 180deg;
                        }
                        75% {
                            opacity: 0.9;
                            rotate: 270deg;
                        }
                        100% {
                            opacity: 1;
                            rotate: 360deg;
                        }
                    }
                `}
            </style>
        </div>
    );
};

CircularProgress.propTypes = {
    className: propTypes.oneOfType([propTypes.string, propTypes.object]),
    size: propTypes.oneOf(['small', 'large', 'medium']),
    color: propTypes.oneOf(['primary', 'secondary', 'neutral', 'default']),
};

CircularProgress.defaultProps = {
    className: {},
    size: 'small',
    color: 'primary',
};

export default CircularProgress;
