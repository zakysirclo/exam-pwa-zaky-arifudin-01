/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable max-len */
import cx from 'classnames';
import Button from '@common_button/index';
import propTypes from 'prop-types';
import Show from '@common_show';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { useEffect } from 'react';

const Dialog = ({
    open = false,
    variant = 'container',
    onClose,
    title,
    content,
    positiveLabel,
    positiveAction,
    positiveProps,
    negativeLabel,
    negativeAction,
    negativeProps,
    classTitle,
    classContent,
    classWrapper,
    classContainer,
    classContainerAction,
    backdrop,
    closeOnBackdrop,
    useCloseButton,
    onClickClose,
    useCloseTitleButton,
    onClickCloseTitle,
    children,
    classWrapperTitle,
}) => {
    const isVariantPlain = variant === 'plain';
    const isVariantContainer = variant === 'container';

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style = '';
        }
    }, [open]);

    return (
        <>
            <Show when={open && backdrop}>
                <div
                    role="presentation"
                    className={cx(
                        'fixed top-0 left-0 w-full h-full z-backdrop-dialog',
                        'bg-neutral-black bg-opacity-50',
                    )}
                    onClick={() => closeOnBackdrop && onClose()}
                />
            </Show>
            <div className={cx(
                'section-dialog',
                'fixed',
                'z-dialog',
                'w-[100%]',
                'h-[100%]',
                'left-0',
                'top-0',
                'justify-center',
                'flex',
                'items-center',
                open && 'visible',
                !open && 'hidden',
                classWrapper,
            )}
            >
                <Show when={isVariantPlain}>
                    {children}
                </Show>
                <Show when={isVariantContainer}>
                    <div className={cx(
                        'section-dialog-container',
                        'shadow-xl',
                        'sm:max-w-[328px]',
                        'md:max-w-[600px]',
                        'lg:max-w-[792px]',
                        'md:m-4 xs:m-4',
                        'w-[100%]',
                        classContainer,
                    )}
                    >
                        <div className={
                            cx(
                                'dialog-title',
                                'bg-neutral-white',
                                'text-neutral-700',
                                'rounded-t-[12px]',
                                'flex items-center justify-between',
                                'py-[16px]',
                                classWrapperTitle,
                            )
                        }
                        >
                            {/* TITLE */}
                            {
                                title && (
                                    <div className={cx(
                                        'font-semibold',
                                        'text-[16px]',
                                        'desktop:px-[32px] tablet:px-[32px] mobile:px-[16px]',
                                        classTitle,
                                    )}
                                    >
                                        {title}
                                    </div>
                                )
                            }
                            <Show when={useCloseTitleButton}>
                                <Button
                                    onClick={onClickCloseTitle}
                                    iconOnly
                                    className={
                                        cx(
                                            'swift-button-close-dialog',
                                            'desktop:!px-[32px] tablet:!px-[32px] mobile:!px-[16px]',
                                        )
                                    }
                                    variant="plain"
                                    icon={<XMarkIcon className="h-[24] w-[24]" />}
                                />
                            </Show>
                        </div>
                        {/* CONTENT */}
                        {
                            content && (
                                <div className={cx(
                                    'dialog-content',
                                    'bg-neutral-white',
                                    'text-neutral-600',
                                    'bg-white',
                                    'pt-[4px]',
                                    'desktop:px-[32px] tablet:px-[32px] mobile:px-[16px]',
                                    'pb-[32px]',
                                    'text-[14px]',
                                    (!positiveAction && !negativeAction) ? 'rounded-b-[12px]' : '',
                                    classContent,
                                )}
                                >
                                    {content}
                                </div>
                            )
                        }
                        {/* ACTION */}
                        {
                            (positiveAction || negativeAction) && (
                                <div className={cx(
                                    'dialog-action',
                                    'px-[24px]',
                                    'py-[16px]',
                                    'rounded-b-[12px]',
                                    'mobile:text-center',
                                    'tablet:text-right',
                                    'flex',
                                    'desktop:justify-end tablet:justify-end mobile:justify-center',
                                    'gap-[16px]',
                                    'bg-neutral-100',
                                    classContainerAction,
                                )}
                                >
                                    {
                                        negativeAction && (
                                            <Button
                                                variant="outlined"
                                                onClick={negativeAction}
                                                className="py-[12px] px-[22px] !border-0 xs:w-[50%] sm:w-[50%] md:w-auto"
                                                classNameText="justify-center"
                                                {...negativeProps}
                                            >
                                                {negativeLabel}
                                            </Button>
                                        )
                                    }
                                    {
                                        positiveAction && (
                                            <Button
                                                onClick={positiveAction}
                                                className={
                                                    cx(
                                                        'py-[12px] px-[22px] border-0 mobile:w-[50%] desktop:w-auto tablet:w-auto',
                                                        !negativeAction && '!w-[100%]',
                                                    )
                                                }
                                                classNameText="justify-center"
                                                {...positiveProps}
                                            >
                                                {positiveLabel}
                                            </Button>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </Show>
                <Show when={useCloseButton}>
                    <Button
                        onClick={onClickClose}
                        iconOnly
                        className={
                            cx(
                                'button-close-dialog absolute desktop:top-[50px] tablet:top-[24px] desktop:right-[50px] tablet:right-[24px] mobile:top-[10px] mobile:right-[0px]',
                                '!px-[20px] !py-[20px]',
                            )
                        }
                        variant="plain"
                        icon={<XMarkIcon className="h-[24] w-[24]" />}
                    />
                </Show>
            </div>
        </>
        );
};

Dialog.propTypes = {
    open: propTypes.bool,
    title: propTypes.string,
    content: propTypes.oneOfType([propTypes.string, propTypes.node, propTypes.func]),
    positiveLabel: propTypes.string,
    positiveAction: propTypes.func,
    positiveProps: propTypes.object,
    negativeLabel: propTypes.string,
    negativeAction: propTypes.func,
    negativeProps: propTypes.object,
    classContent: propTypes.string,
    classWrapper: propTypes.string,
    classContainer: propTypes.string,
    backdrop: propTypes.bool,
    closeOnBackdrop: propTypes.bool,
    onClose: propTypes.func,
    classWrapperTitle: propTypes.string,
};

Dialog.defaultProps = {
    open: false,
    title: undefined,
    content: undefined,
    positiveLabel: undefined,
    positiveAction: undefined,
    positiveProps: {},
    negativeLabel: undefined,
    negativeAction: undefined,
    negativeProps: {},
    classContent: '',
    classWrapper: '',
    classContainer: '',
    backdrop: true,
    closeOnBackdrop: false,
    onClose: () => {},
    classWrapperTitle: '',
};

export default Dialog;
