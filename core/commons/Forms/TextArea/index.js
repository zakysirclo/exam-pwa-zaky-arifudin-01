import Typography from '@common_typography';
import cx from 'classnames';
import { useState } from 'react';
import propTypes from 'prop-types';

const TextArea = (props) => {
    const {
        placeholder = '', label = '', disabled, value, onChange = () => {}, hintProps = {}, inputProps = {}, className = '',
    } = props;
    const [isFocus, setIsFocus] = useState(false);

    const { displayHintText = false, hintType = '', hintText = '' } = hintProps;

    if (value) inputProps.value = value;
    if (onChange) inputProps.onChange = onChange;
    const { className: inputClassName, ...restInputProps } = inputProps;

    return (
        <div className={cx('flex', 'flex-col', className)}>
            {label ? (
                <label className="mb-2">
                    <Typography variant="h4">{label}</Typography>
                </label>
            ) : null}
            <textarea
                placeholder={placeholder}
                className={cx(
                    'items-center',
                    'w-[320px]',
                    'bg-neutral-white',
                    'border-[1px]',
                    'border-neutral-100',
                    'rounded-lg',
                    'text-base',
                    'hover:border-primary-100',
                    'py-[10px]',
                    'px-4',
                    {
                        '!border-primary-200': isFocus && !hintType,
                        '!bg-neutral-50 border-none placeholder:!text-neutral-100': disabled,
                        '!border-red hover:!border-red': hintType === 'error',
                        '!border-yellow': hintType === 'warning',
                        '!border-green': hintType === 'success',
                    },
                    inputClassName,
                )}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                {...restInputProps}
            />
            {displayHintText && hintType && hintText ? (
                <Typography
                    variant="bd-2b"
                    className={cx('my-2', {
                        '!text-red': hintType === 'error',
                        '!text-yellow': hintType === 'warning',
                        '!text-green': hintType === 'success',
                    })}
                >
                    {hintText}
                </Typography>
            ) : null}
        </div>
    );
};

TextArea.propTypes = {
    placeholder: propTypes.string,
    label: propTypes.string,
    disabled: propTypes.bool,
    value: propTypes.string.isRequired,
    onChange: propTypes.func,
    hintProps: propTypes.shape({
        displayHintText: propTypes.bool,
        hintType: propTypes.oneOf(['error', 'warning', 'success', '']),
        hintText: propTypes.string,
    }),
    inputProps: propTypes.shape({
        value: propTypes.string,
        onChange: propTypes.func,
        className: propTypes.string,
    }),
    className: propTypes.string,
};

TextArea.defaultProps = {
    placeholder: '',
    label: '',
    disabled: false,
    onChange: () => {},
    hintProps: {
        displayHintText: false,
        hintType: '',
        hintText: '',
    },
    inputProps: {
        value: '',
        onChange: () => {},
        className: '',
    },
    className: '',
};

export default TextArea;
