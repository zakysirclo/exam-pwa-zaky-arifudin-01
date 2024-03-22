/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-lonely-if */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import TextField from '@common_forms/TextField';
import Popover from '@common_popover';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';

const CustomAutocomplete = (props) => {
    const {
        disabled,
        label,
        labelKey,
        loading,
        onChange,
        value,
        primaryKey,
        className,
        inputClassName,
        popoverWrapperClassName,
        popoverClassName,
        popoverContentClassName,
        enableCustom,
        placeholder,
        CustomPopover,
        itemOptions,
        useKey,
        inputProps = {},
        openOnFocus = false,
    } = props;

    const { t } = useTranslation(['common']);

    const [open, setOpen] = React.useState(false);

    const [filteredItem, setFilteredItem] = React.useState(itemOptions);

    const { hintProps } = inputProps;

    const handleAutocomplete = (e) => {
        if (e.target.value !== '') {
            const isFound = filteredItem.find((item) => {
                if (useKey) {
                    return item[labelKey].toLowerCase().includes(e.target.value.toLowerCase());
                }
                return item.toLowerCase().includes(e.target.value.toLowerCase());
            });
            if (isFound) {
                const filteredArray = filteredItem.filter((item) => {
                    if (useKey) {
                        return item[labelKey].toLowerCase().includes(e.target.value.toLowerCase());
                    }
                    return item.toLowerCase().includes(e.target.value.toLowerCase());
                });
                setFilteredItem(filteredArray);
                setOpen(true);
            }
        } else {
            setFilteredItem(itemOptions);
        }
    };

    const PopoverContent = () => {
        const PopoverItem = (propsPopoverItem) => {
            let optionLabel;
            let optionValue;

            if (useKey) {
                optionLabel = propsPopoverItem.item[labelKey];
                optionValue = propsPopoverItem.item[primaryKey];
            } else {
                optionLabel = propsPopoverItem.optionLabel;
                optionValue = propsPopoverItem.optionValue;
            }

            const handleSelectItem = () => {
                if (useKey) {
                    onChange(propsPopoverItem.item);
                    setOpen(false);
                } else {
                    onChange(optionLabel);
                    setOpen(false);
                }
            };

            return (
                <div
                    className={cx(
                        'grid',
                        'py-4',
                        'text-neutral-300',
                        'hover:text-primary-300',
                        'hover:bg-neutral-50',
                        'hover:cursor-pointer',
                        popoverContentClassName,
                    )}
                    onClick={() => handleSelectItem(propsPopoverItem)}
                    role="presentation"
                >
                    <div className={cx('title-category', 'block', 'text-sm', 'uppercase')} aria-current={optionValue}>
                        {optionLabel}
                    </div>
                </div>
            );
        };

        return (
            <>
                {/* {open && (value.length !== 0) && (filteredItem === null || (typeof filteredItem === 'object' && filteredItem.length === 0)) ? ( */}
                {open && (filteredItem === null || (typeof filteredItem === 'object' && filteredItem.length === 0)) ? (
                    <div className={cx('breadcrumbs', 'block', 'text-sm', 'text-neutral-200', 'uppercase', 'italic')}>
                        {t('common:error:notFound')}
                    </div>
                ) : (
                    filteredItem !== null && filteredItem.map((items, index) => <PopoverItem item={items} key={index} />)
                )}
            </>
        );
    };

    return (
        <div cx={className}>
            <Popover
                content={enableCustom ? <CustomPopover /> : <PopoverContent />}
                open={open && !loading}
                setOpen={setOpen}
                className={popoverClassName}
                wrapperClassName={popoverWrapperClassName}
                contentClassName={popoverContentClassName}
            >
                <TextField
                    value={value}
                    placeholder={placeholder || t('common:search:title')}
                    onChange={(e) => {
                        onChange(e.target.value);
                        handleAutocomplete(e);
                    }}
                    onFocus={() => {
                        if (openOnFocus) {
                            setOpen(true);
                        }
                    }}
                    rightIcon={<MagnifyingGlassIcon />}
                    rightIconProps={{
                        className: 'text-neutral-300 h-10 w-10',
                    }}
                    disabled={disabled}
                    label={label}
                    className={inputClassName}
                    hintProps={hintProps}
                />
            </Popover>
        </div>
    );
};

export default CustomAutocomplete;
