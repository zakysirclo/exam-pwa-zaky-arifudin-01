import Typography from '@common/Typography';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon';
import cx from 'classnames';
import Show from '@common_show';

const Alert = ({
    children, severity, withIcon = false, className = '', classChildren = '', iconClassName = '',
}) => {
    let classNamesText = 'text-green-600';
    let classNamesAlert = cx('bg-green-50', 'border-l-green-600', 'border-green-600');

    if (severity === 'warning') {
        classNamesText = 'text-yellow-600';
        classNamesAlert = cx('bg-yellow-50', 'border-l-yellow-600', 'border-yellow-600');
    }

    if (severity === 'error') {
        classNamesText = 'text-red-600';
        classNamesAlert = cx('bg-red-50', 'border-l-red-600', 'border-red-600');
    }

    // Icon
    let Icon = <></>;
    if (withIcon) {
        Icon = <CheckCircleIcon />;

        if (severity === 'warning') {
            Icon = <ExclamationTriangleIcon />;
        } else if (severity === 'error') {
            Icon = <ExclamationCircleIcon />;
        }
    }

    return (
        <div
            className={cx(
                'section-alert',
                'inset-x-0',
                'p-[16px]',
                'transition-opacity ease-in duration-200',
                'border-l-[10px]',
                'shadow-md',
                'flex',
                'justify-between',
                'align-middle',
                'rounded-[4px]',
                'items-center',
                classNamesAlert,
                className,
            )}
        >
            <div className="section-toast-title font-sans">
                <Typography className={classChildren} variant="bd-2a" color={classNamesText}>
                    <Show when={withIcon}>
                        <div className="flex flex-row items-center">
                            <div className={cx('w-[24px] h-[24px] mr-[6px]', iconClassName)}>
                                {Icon}
                            </div>
                            <div className="text-left">{children}</div>
                        </div>
                    </Show>
                    <Show when={!withIcon}>{children}</Show>
                </Typography>
            </div>
        </div>
    );
};

export default Alert;
