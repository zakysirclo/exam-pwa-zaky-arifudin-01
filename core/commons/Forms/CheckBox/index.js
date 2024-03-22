/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Typography from '@common_typography';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

const CheckBox = (props) => {
    const {
        variant = 'multiple',
        type,
        label = '',
        checked,
        data = [],
        value = [],
        CustomItem, // todo: readd this, need to review first
        disabled = false,
        onChange = () => {},
        onClick = () => {},
        classNames = {},
        useLoadMore = false,
        size = 'md',
        flex = 'col',
        children,
        ...other
    } = props;

    const { t } = useTranslation(['common']);
    const { checkboxClasses = '', checkboxGroupClasses = '', checkboxContainerClasses = '' } = classNames;
    const [selected, setSelected] = React.useState(value);
    const [more, setMore] = React.useState(7);
    const dataItems = useLoadMore ? data?.slice(0, more) : data;
    const isVariantSingle = variant === 'single';

    let flexClass = 'flex-col';

    if (flex === 'row') {
        flexClass = 'flex-row';
    }

    // handle load more and load less list data
    const handleMore = () => {
        setMore(more + 7);
    };

    const handleLess = () => {
        setMore(more - 7);
    };

    React.useEffect(() => {
        if (value && !isVariantSingle) {
            setSelected(value);
        }
    }, [value, isVariantSingle]);

    const setCheckedFilter = (v) => {
        if (!isVariantSingle) {
            if (selected.indexOf(v) !== -1) {
                selected.splice(selected.indexOf(v), 1);
            } else {
                selected.push(v);
            }
            onChange(selected);
            setSelected([...selected]);
        }
    };

    if (isVariantSingle) {
        return (
            <div className={cx('common-checkbox-container', checkboxContainerClasses)}>
                <input
                    {...other}
                    type="checkbox"
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    onClick={onClick}
                    checked={checked}
                    className={cx(
                        'swift-form-checkbox',
                        'w-4',
                        'h-4',
                        'mr-2',
                        'rounded-[4px]',
                        'text-primary',
                        'border-solid',
                        'border-[1px]',
                        'border-neutral-400',
                        'hover:border-primary',
                        'hover:bg-primary-100',
                        'focus:ring-0',
                        'focus:border-primary',
                        'focus:shadow-[0_0_0_4px]',
                        'focus:shadow-primary-100',
                        'focus:ring-offset-0',
                        {
                            'hover:!border-neutral-400 hover:!bg-neutral-white': disabled,
                            'w-5 h-5': size === 'md',
                            'w-6 h-6': size === 'lg',
                        },
                        checkboxClasses,
                    )}
                />
                {children}
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {label ? (
                <Typography variant="bd-2" className="uppercase">
                    {label}
                </Typography>
            ) : null}
            <div className={cx('flex', flexClass, 'mt-2', checkboxGroupClasses)}>
                {dataItems.map((item, idx) => {
                    if (CustomItem) {
                        return (
                            <CustomItem
                                variant={type}
                                key={idx}
                                label={item.label ? item.label : item}
                                value={item.value ? item.value : item}
                                dataValues={selected}
                                onChange={(val) => !disabled && setCheckedFilter(val)}
                                disabled={item.disabled || disabled}
                                {...item}
                            />
                        );
                    }
                    return (
                        <div key={idx} className="flex items-center mb-1">
                            <input
                                type="checkbox"
                                disabled={item.disabled || disabled}
                                className={cx(
                                    'swift-form-checkbox',
                                    'w-4',
                                    'h-4',
                                    'mr-2',
                                    'rounded-[4px]',
                                    'text-primary',
                                    'border-solid',
                                    'border-[1px]',
                                    'border-neutral-400',
                                    'hover:border-primary',
                                    'hover:bg-primary-100',
                                    'focus:ring-0',
                                    'focus:border-primary',
                                    'focus:shadow-[0_0_0_4px]',
                                    'focus:shadow-primary-100',
                                    'focus:ring-offset-0',
                                    {
                                        'hover:!border-neutral-400 hover:!bg-neutral-white': disabled,
                                        'w-5 h-5': size === 'md',
                                        'w-6 h-6': size === 'lg',
                                    },
                                    checkboxClasses,
                                )}
                                value={item.value}
                                onChange={(e) => setCheckedFilter(e.target.value)}
                                checked={selected.indexOf(item.value) !== -1}
                                id={item.id || `${item.value.replace(/ /g, '')}_${idx}`}
                            />
                            <label htmlFor={item.id || `${item.value.replace(/ /g, '')}_${idx}`}>
                                <Typography
                                    variant="bd-1b"
                                    className={cx({
                                        '!text-neutral-300': disabled,
                                    })}
                                >
                                    {item.label}
                                </Typography>
                            </label>
                        </div>
                    );
                })}
            </div>
            {useLoadMore && data.length > 7 && more <= 7 && (
                <a onClick={handleMore} className="mt-[10px] text-right cursor-pointer">
                    <Typography className="underline">{t('common:label:seeMore')}</Typography>
                </a>
            )}
            {useLoadMore && more > 7 && (
                <a onClick={handleLess} className="mt-[10px] text-right cursor-pointer">
                    <Typography className="underline">{t('common:label:seeLess')}</Typography>
                </a>
            )}
        </div>
    );
};

export default CheckBox;
