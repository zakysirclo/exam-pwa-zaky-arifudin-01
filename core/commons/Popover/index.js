/* eslint-disable consistent-return */
import cx from 'classnames';
import React from 'react';

const Popover = (props) => {
    const {
        children, content, open, setOpen = () => {}, className = '', contentClassName, wrapperClassName = '', wrapperId = '',
    } = props;
    const wrapperRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [open, wrapperRef]);

    return (
        <div ref={wrapperRef} className={cx('w-fit h-fit relative flex justify-center', wrapperClassName)} id={wrapperId || null}>
            {open && (
                <div hidden={!open} className={cx('min-w-fit w-[100%] h-fit absolute top-[120%] z-[1000] transition-all', className)}>
                    <div
                        className={cx(
                            'rounded-lg',
                            'shadow-md',
                            'mb-[10px]',
                            'border-neutral-300',
                            'border-[1px]',
                            'bg-neutral-white',
                            'max-h-[50vh]',
                            'z-[1000]',
                            'overflow-y-auto',
                            'popover-content',
                            contentClassName,
                        )}
                    >
                        {content}
                    </div>
                    <style jsx>
                        {`
                            .popover-content::-webkit-scrollbar {
                                display: none;
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }
                        `}
                    </style>
                </div>
            )}
            <div>{children}</div>
        </div>
    );
};

export default Popover;
