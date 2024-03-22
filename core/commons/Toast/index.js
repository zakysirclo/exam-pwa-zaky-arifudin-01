/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from 'react';
import cx from 'classnames';
import Typography from '@common_typography/index';
import useMediaQuery from '@hook/useMediaQuery';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

const Toast = ({
    open,
    close = true,
    setOpen, // handle close
    message = 'Title',
    variant = 'success',
    position = 'bottom-right', // top or bottom
    positionNumber = 0,
    className,
    classNameIcon,
    autoHideDuration = 3000,
}) => {
    const timerRef = React.useRef(null);
    const { isXl } = useMediaQuery();

    React.useEffect(() => {
        if (open) {
            if (autoHideDuration && autoHideDuration > 0) {
                timerRef.current = setTimeout(() => {
                    setOpen();
                }, autoHideDuration);
            }
        }

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [open]);

    let classNamesText = 'text-green-600';
    let classNamesToast = cx(
        'bg-green-50',
        'border-l-green-600',
        'border-green-600',
    );

    if (variant === 'warning') {
        classNamesText = 'text-yellow-600';
        classNamesToast = cx(
            'bg-yellow-50',
            'border-l-yellow-600',
            'border-yellow-600',
        );
    }

    if (variant === 'error') {
        classNamesText = 'text-red-600';
        classNamesToast = cx(
            'bg-red-50',
            'border-l-red-600',
            'border-red-600',
        );
    }

    const scrollTopEl = document?.getElementById('swift-action-scrolltotop');
    const scrollTopHeight = scrollTopEl?.parentNode?.parentNode?.offsetHeight || 0;

    return (
        <div
            role="alert"
            style={{
                ...(!open ? { zIndex: -9999 } : null),
                ...(position === 'bottom' ? (isXl ? { bottom: positionNumber, marginLeft: 'auto', marginRight: 'auto' } : { bottom: positionNumber }) : null),
                ...(position === 'bottom-right' ? (isXl ? { bottom: positionNumber + scrollTopHeight, marginLeft: 'auto' } : { bottom: positionNumber }) : null),
                ...(position === 'bottom-left' ? (isXl ? { bottom: positionNumber, marginRight: 'auto' } : { bottom: positionNumber }) : null),
                ...(position === 'top' ? (isXl ? { top: positionNumber, marginLeft: 'auto', marginRight: 'auto' } : { top: positionNumber }) : null),
                ...(position === 'top-right' ? (isXl ? { top: positionNumber, marginLeft: 'auto' } : { top: positionNumber }) : null),
                ...(position === 'top-left' ? (isXl ? { top: positionNumber, marginRight: 'auto' } : { top: positionNumber }) : null),
            }}
            className={
                cx(
                    'section-toast',
                    'fixed',
                    'inset-x-0',
                    'p-[16px]',
                    'transition-opacity ease-in duration-200',
                    'border-l-[10px]',
                    'shadow-lg',
                    'flex',
                    'justify-between',
                    'align-middle',
                    'rounded-[4px]',
                    'lg:m-4 sm:m-4 xs:m-4',
                    'lg:max-w-[18.75rem]',
                    'items-center',
                    open && 'z-toast opacity-100',
                    !open && 'opacity-0',
                    classNamesToast,
                    className,
                )
            }
        >
            <div className="section-toast-title font-sans">
                <Typography variant="bd-2a" color={classNamesText}>{message}</Typography>
            </div>
            {
                close && (
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label
                    <button type="button" className="section-toast-action flex items-center" onClick={setOpen}>
                        <XMarkIcon className={classNameIcon} />
                    </button>
                )
            }
        </div>
    );
};

export default Toast;
