/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typography from '@common_typography';
import Arrow from '@heroicons/react/24/outline/ChevronDownIcon';
import cx from 'classnames';
import propTypes from 'prop-types';
import React from 'react';

const Accordion = (props) => {
    const {
        label,
        open,
        handleOpen,
        handleClose,
        className = '',
        classLabel = '',
        classSummary,
        CustomAccordionSummary,
        classContent = '',
        children,
        CustomIcon,
        classIcon = '',
    } = props;

    const handleShow = (e) => {
        if (typeof handleOpen === 'function' || typeof handleClose === 'function') {
            e.preventDefault();
            if (open && typeof handleClose === 'function') {
                handleClose();
            } else if (typeof handleOpen === 'function') {
                handleOpen();
            }
        }
    };

    return (
        <details className={cx('group flex flex-col swift-common-accordion', className)} open={open}>
            <summary
                onClick={handleShow}
                className={cx(
                    'swift-accordion-title flex justify-between',
                    'items-center font-medium cursor-pointer list-none w-full',
                    classSummary,
                )}
            >
                {React.isValidElement(CustomAccordionSummary) ? (
                    React.cloneElement(CustomAccordionSummary, {
                        className: classSummary,
                        label,
                        classLabel,
                    })
                ) : (
                    <>
                        <Typography className={cx('capitalize font-semibold', classLabel)}>{label}</Typography>
                        {React.isValidElement(CustomIcon) ? (
                            React.cloneElement(CustomIcon)
                        ) : (
                            <span className="transition group-open:rotate-180">
                                <Arrow className={cx('w-5 h-5', classIcon)} />
                            </span>
                        )}
                    </>
                )}
            </summary>
            <div
                className={cx(
                    'swift-accordion-content text-neutral-600 mt-4',
                    'group-open:animate-fadeIn group-open:duration-700',
                    classContent,
                )}
            >
                {children}
            </div>
        </details>
    );
};

Accordion.propTypes = {
    label: propTypes.string,
    open: propTypes.bool,
    handleOpen: propTypes.func,
    handleClose: propTypes.func,
    classSummary: propTypes.string,
    CustomAccordionSummary: propTypes.element,
    classContent: propTypes.string,
    classLabel: propTypes.string,
    className: propTypes.string,
};

Accordion.defaultProps = {
    label: '',
    open: false,
    handleOpen: undefined,
    handleClose: undefined,
    classSummary: '',
    CustomAccordionSummary: false,
    classContent: '',
    classLabel: '',
    className: '',
};

export default Accordion;
