/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import ArrowUp from '@heroicons/react/24/solid/ChevronUpIcon';
import ArrowDown from '@heroicons/react/24/solid/ChevronDownIcon';
import cx from 'classnames';
import { COLORS } from '@theme_vars';
import { useClickAway } from '@uidotdev/usehooks';
import { useState } from 'react';
import Show from '@common_show';

const Select = (props) => {
    const {
        label = '',
        name = '',
        value = '',
        onChange = () => {},
        options = [],
        placeholder = 'Please Select',
        className = '',
        classNameLabel = '',
        error = false,
        errorMessage = '',
        inputProps = {},
        textFiledProps = {},
        optionProps = {},
        required = false,
        multiple = false,
        itemChange = () => {},
        ...restProps
    } = props;

    const { className: inputPropsClass, ...restInputProps } = inputProps;
    const { className: textFiledClass, ...restTextFiledProps } = textFiledProps;
    const { className: optionClass, ...restOptionProps } = optionProps;

    const [open, setOpen] = useState(false);
    const ref = useClickAway(() => {
        setOpen(false);
    });

    const selectValue = options?.find((opt) => opt.value === value)?.label ?? value;

    const [multipleSelected, setMultipleSelected] = useState(selectValue);
    const handleOptionChange = (option) => {
        const selectedOptions = [...multipleSelected];
        const index = selectedOptions.indexOf(option);

        if (index !== -1) {
            selectedOptions.splice(index, 1);
        } else {
            selectedOptions.push(option);
        }

        setMultipleSelected(selectedOptions);
        onChange(selectedOptions);
        itemChange(option);
    };

    return (
        <div ref={ref} className={cx('swift-form-select', 'relative', open ? 'z-50' : '', className)} {...restProps}>
            {label && typeof label === 'string' ? (
                <Typography variant="bd-2" className={cx('mb-2 uppercase', classNameLabel)}>
                    {label.replace(/_/g, ' ')}
                    <Show when={required}>
                        <span className={cx('text-red-600')}> *</span>
                    </Show>
                </Typography>
            ) : null}
            {label && typeof label === 'object' ? label : null}

            {multiple ? (
                <ul
                    className={cx(
                        'w-full overflow-auto border border-neutral-200 hover:border-neutral-400',
                        'rounded-md px-3 py-2 h-44 overflow-auto',
                    )}
                >
                    {options.map((d, idx) => {
                        const isChecked = multipleSelected.includes(d.value);
                        return (
                            <li
                                key={idx}
                                className={cx(
                                    'px-2 py-3',
                                    isChecked ? 'bg-neutral-100 text-primary-600' : '',
                                    optionClass,
                                )}
                            >
                                <input
                                    type="checkbox"
                                    id={`option-${d.value}`}
                                    className="opacity-0 absolute"
                                    checked={multipleSelected.includes(d.value)}
                                    onChange={() => handleOptionChange(d.value)}
                                />
                                <label htmlFor={`option-${d.value}`} className="w-full flex">
                                    {d.label}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <>
                    <TextField
                        className={cx('cursor-pointer', textFiledClass || '')}
                        rightIcon={!open ? <ArrowDown /> : <ArrowUp />}
                        inputProps={{
                            readOnly: true,
                            className: cx('cursor-pointer', inputPropsClass || ''),
                            name,
                            ...restInputProps,
                        }}
                        hintProps={{
                            displayHintText: error,
                            hintType: error ? 'error' : '',
                            hintText: errorMessage,
                        }}
                        onClick={() => {
                            setOpen(!open);
                        }}
                        value={selectValue}
                        placeholder={placeholder}
                        {...restTextFiledProps}
                    />
                    {open && options?.length > 0 ? (
                        <div
                            className={cx(
                                'w-full',
                                'flex',
                                'flex-col',
                                'py-3',
                                'px-4',
                                'shadow-md',
                                'cursor-pointer',
                                'bg-neutral-white',
                                'absolute',
                                'z-50',
                                optionClass,
                            )}
                            {...restOptionProps}
                        >
                            {options.map((d, idx) => (
                                <div
                                    key={idx}
                                    className="dropdown-item py-3 px-4 hover:bg-neutral-50"
                                    onClick={() => {
                                        onChange(d.value);
                                        setOpen(false);
                                    }}
                                >
                                    <Typography variant="bd-2b" className="">
                                        {d.label}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </>
            )}
            <style jsx>
                {`
                    .dropdown-item:hover > :global(span) {
                        color: ${COLORS.primary.DEFAULT} !important;
                    }
                `}
            </style>
        </div>
    );
};

export default Select;
