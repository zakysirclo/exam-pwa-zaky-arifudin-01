import Show from '@common_show';
import Typography from '@common_typography';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';
import propTypes from 'prop-types';
import { isValidElement, useState } from 'react';

const TextField = React.forwardRef((props, ref) => {
    const {
        absolute = true,
        multiline,
        placeholder = '',
        disabled = false,
        onChange = () => {},
        value = '',
        name = '',
        className = '',
        classNameLabel = '',
        label = '',
        hintProps = {},
        inputProps = {},
        type = 'text',
        onBlur = () => {},
        onKeyPress = () => {},
        leftIcon,
        leftIconProps,
        rightIcon,
        rightIconProps,
        onFocusGoogleMap = false,
        classWrapper = '',
        required = false,
        propsLabelText = {},
        ...restProps
    } = props;

    const [isFocus, setIsFocus] = useState(false);

    const {
        className: hintClassName, displayHintText = false, hintType = '', hintText = '',
    } = hintProps;
    const { className: leftIconClasses, ...otherLeftIconProps } = leftIconProps;
    const { className: rightIconClasses, ...otherRightIconProps } = rightIconProps;

    const generateRightIcon = () => {
        const rightIconClassName = cx(
            'pr-4',
            'pl-[6px]',
            'text-neutral-300',
            'h-10',
            'w-10',
            {
                '!text-red-600': hintType === 'error',
                '!text-green': hintType === 'success',
                '!text-neutral-400': hintType === 'info',
            },
            rightIconClasses,
        );

        if (!isValidElement) {
            if (hintType === 'error') {
                return <ExclamationTriangleIcon className={rightIconClassName} {...otherRightIconProps} />;
            }
            if (hintType === 'success') {
                return <CheckCircleIcon className={rightIconClassName} {...otherRightIconProps} />;
            }

            return null;
        }

        return React.cloneElement(rightIcon, {
            className: rightIconClassName,
            ...otherRightIconProps,
        });
    };

    if (onChange) inputProps.onChange = onChange;
    if (onKeyPress) inputProps.onKeyPress = onKeyPress;
    const { className: inputClassName, ...restInputProps } = inputProps;

    return (
        <div className={cx('flex flex-col relative', classWrapper)}>
            {label ? (
                <label className={cx('mb-2', classNameLabel)}>
                    <Typography {...propsLabelText}>{label}</Typography>
                    <Show when={required}>
                        <span className={cx('text-red-600')}> *</span>
                    </Show>
                </label>
            ) : null}
            <div
                className={cx(
                    'flex',
                    'items-center',
                    'w-[320px]',
                    'bg-neutral-white',
                    'border-[1px]',
                    'border-neutral-300',
                    'rounded-lg',
                    'text-base',
                    'hover:border-neutral-400',
                    'focus:border-primary focus:shadow-[0_0_0_4px] focus:shadow-primary-200',
                    {
                        '!border-primary': isFocus && !hintType,
                        '!bg-neutral-50 border-none placeholder:!text-neutral-100': disabled,
                        '!border-red hover:!border-red focus:shadow-red-200': displayHintText && hintType === 'error',
                        '!border-green hover:!border-green focus:shadow-green-100': hintType === 'success',
                    },
                    className,
                )}
                {...restProps}
            >
                {leftIcon
                    ? React.cloneElement(leftIcon, { className: cx('pl-4', 'pr-[6px]', 'text-neutral-300', leftIconClasses), ...otherLeftIconProps })
                    : null}
                <Show when={multiline}>
                    <textarea
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}
                        onFocus={(e) => {
                            setIsFocus(true);
                            if (onFocusGoogleMap) {
                                e.target.setAttribute('autocomplete', 'off');
                                e.target.setAttribute('autocorrect', 'false');
                                e.target.setAttribute('aria-autocomplete', 'both');
                                e.target.setAttribute('aria-haspopup', 'false');
                                e.target.setAttribute('spellcheck', 'off');
                                e.target.setAttribute('autocapitalize', 'off');
                                e.target.setAttribute('autofocus', '');
                                e.target.setAttribute('role', 'combobox');
                            }
                        }}
                        onBlur={() => {
                            setIsFocus(false);
                            onBlur();
                        }}
                        value={value}
                        name={name}
                        onChange={onChange}
                        className={cx(
                            'pr-4',
                            'py-[10px]',
                            'w-full',
                            'rounded-lg',
                            'focus:outline-0',
                            'placeholder:text-neutral-200',
                            'text-neutral',
                            'focus:shadow-[0_0_0_1px] focus:shadow-primary',
                            {
                                'placeholder:!text-neutral-400': isFocus,
                                '!pl-4': !leftIcon,
                                '!pr-0': rightIcon,
                            },
                            inputClassName,
                        )}
                        defaultValue={value}
                        {...restInputProps}
                    />
                </Show>
                <Show when={!multiline}>
                    <input
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}
                        onFocus={(e) => {
                            setIsFocus(true);
                            if (onFocusGoogleMap) {
                                e.target.setAttribute('autocomplete', 'off');
                                e.target.setAttribute('autocorrect', 'false');
                                e.target.setAttribute('aria-autocomplete', 'both');
                                e.target.setAttribute('aria-haspopup', 'false');
                                e.target.setAttribute('spellcheck', 'off');
                                e.target.setAttribute('autocapitalize', 'off');
                                e.target.setAttribute('autofocus', '');
                                e.target.setAttribute('role', 'combobox');
                            }
                        }}
                        onBlur={() => {
                            setIsFocus(false);
                            onBlur();
                        }}
                        value={value}
                        name={name}
                        onChange={onChange}
                        className={cx(
                            'pr-4',
                            'py-[10px]',
                            'w-full',
                            'rounded-lg',
                            'focus:outline-0',
                            'placeholder:text-neutral-200',
                            'text-neutral',
                            {
                                'placeholder:!text-neutral-400': isFocus,
                                '!pl-4': !leftIcon,
                                '!pr-0': rightIcon,
                            },
                            inputClassName,
                        )}
                        {...restInputProps}
                    />
                </Show>
                {rightIcon ? generateRightIcon() : null}
            </div>
            {displayHintText && hintType && hintText ? (
                <Typography
                    variant="bd-2b"
                    className={cx(
                        absolute && 'absolute -bottom-[50%] -z-10',
                        'my-1',
                        {
                            '!text-red': hintType === 'error',
                            '!text-green': hintType === 'success',
                            '!text-neutral-400': hintType === 'info',
                        },
                        hintClassName,
                    )}
                >
                    {hintText}
                </Typography>
            ) : null}
        </div>
    );
});

TextField.propTypes = {
    placeholder: propTypes.string,
    disabled: propTypes.bool,
    onChange: propTypes.func,
    value: propTypes.string,
    className: propTypes.string,
    label: propTypes.string,
    hintProps: propTypes.shape({
        displayHintText: propTypes.bool,
        hintType: propTypes.string,
        hintText: propTypes.string,
    }),
    inputProps: propTypes.object,
    type: propTypes.string,
    onBlur: propTypes.func,
    onKeyPress: propTypes.func,
    leftIcon: propTypes.element,
    leftIconProps: propTypes.object,
    rightIcon: propTypes.element,
    rightIconProps: propTypes.object,
};

TextField.defaultProps = {
    placeholder: '',
    disabled: false,
    onChange: () => {},
    value: '',
    className: '',
    label: '',
    hintProps: {
        displayHintText: false,
        hintType: '',
        hintText: '',
    },
    inputProps: {},
    type: 'text',
    onBlur: () => {},
    onKeyPress: () => {},
    leftIcon: undefined,
    leftIconProps: {},
    rightIcon: undefined,
    rightIconProps: {},
};

export default TextField;
