/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import cx from 'classnames';
import propTypes from 'prop-types';
import React, { useEffect } from 'react';

import Button from '@common_button';

import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

const Drawer = ({ open, handleClose, backdrop, position, backdropClass, className = '', children, customButtonClose = false }) => {
    let classPosition = 'fixed top-0 left-0 z-drawer w-11/12 h-full -translate-x-full md:w-96';
    if (position === 'right') {
        classPosition = 'fixed top-0 right-0 z-drawer w-11/12 h-full translate-x-full md:w-96';
    }
    if (position === 'bottom') {
        classPosition = 'fixed bottom-0 left-0 z-20 h-96 translate-y-full w-full';
    }
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style = '';
        }
    }, [open]);
    return (
        <>
            {open && backdrop && (
                <div
                    role="presentation"
                    className={cx('fixed top-0 left-0 w-full h-full bg-neutral-black bg-opacity-50 z-backdrop-drawer', backdropClass)}
                    onClick={handleClose}
                />
            )}
            <div
                className={cx(
                    classPosition,
                    'transition-all duration-500 transform shadow-lg',
                    'bg-neutral-white',
                    {
                        'translate-x-0': open && position === 'left',
                        '-translate-x-0.5': open && position === 'right',
                        'translate-y-0.5': open && position === 'bottom',
                    },
                    className,
                )}
            >
                {children}
                {open && customButtonClose && (
                    <Button
                        onClick={handleClose}
                        className="desktop:hidden absolute tablet:top-[10px] tablet:right-[-44px] mobile:top-[10px] mobile:right-[-34px] z-[1001] bg-neutral-white/40 tablet:!p-1 mobile:max-tablet:p-[2px]"
                        variant="plain"
                        iconOnly
                        icon={<XMarkIcon />}
                        iconProps={{ className: '!text-neutral-white !opacity-100 mobile:max-tablet:h-[20px] mobile:max-tablet:w-[20px]' }}
                    />
                )}
            </div>
        </>
    );
};
Drawer.propTypes = {
    open: propTypes.bool.isRequired,
    handleClose: propTypes.func.isRequired,
    backdrop: propTypes.bool,
    position: propTypes.oneOf(['left', 'right', 'bottom']),
};
Drawer.defaultProps = {
    backdrop: true,
    position: 'left',
};
export default Drawer;
