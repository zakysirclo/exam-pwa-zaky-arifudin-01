import cx from 'classnames';
import React from 'react';

import Button from '@common_button';
import Popover from '@common_popover';
import Skeleton from '@common_skeleton';
import Typography from '@common_typography';

import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';

const ViewSwitcherCurrency = (props) => {
    const {
        currencyState, setDefaultCurrency, loading, app_cookies, open, setOpen, CustomButton,
    } = props;
    const cookies_currency = app_cookies?.cookies_currency;

    const isEmptyCookiesCurrency = currencyState === undefined || currencyState === null;

    if (!loading && currencyState !== null) {
        if (currencyState.exchange_rates.length <= 1) {
            return null;
        }
    }

    let finalDefaultCurrency = '';
    if (currencyState !== null) {
        finalDefaultCurrency = currencyState.default_display_currency_code;
    } else if (!isEmptyCookiesCurrency) {
        const currencyObject = JSON.parse(cookies_currency);
        finalDefaultCurrency = currencyObject.default_display_currency_code;
    }

    const PopoverContent = () => {
        if (!isEmptyCookiesCurrency) {
            return (
                <ul className={cx('currency-list__wrapper')}>
                    {currencyState !== null
                        && currencyState.exchange_rates.map((currency_item, index) => {
                            const { currency_to } = currency_item;
                            const currency_default = currencyState === null ? '' : currencyState.default_display_currency_code;
                            const isCurrent = currency_to === currency_default;
                            const default_display_currency_code = currency_to;
                            const default_currency_rate = currency_item.rate;
                            return isCurrent ? null : (
                                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                                <li
                                    key={`currency-${index}`}
                                    className={cx(
                                        'currency-list__item',
                                        'py-2',
                                        'px-2',
                                        'text-center',
                                        'hover:cursor-pointer',
                                        'hover:bg-neutral-100',
                                        'group',
                                    )}
                                    onClick={() =>
                                        setDefaultCurrency({
                                            default_display_currency_code,
                                            default_currency_rate,
                                        })}
                                >
                                    <Typography className={cx('currency-list__text', 'group-hover:text-primary-700')}>{`${currency_to}`}</Typography>
                                </li>
                            );
                        })}
                </ul>
            );
        }
        return null;
    };

    if (!loading && !isEmptyCookiesCurrency) {
        return (
            <Popover
                content={<PopoverContent />}
                open={open}
                setOpen={setOpen}
                className={cx('top-[100%]', 'p-0')}
                wrapperClassName={cx('self-end')}
                wrapperId="top-header__content--currency-language-changer-menu__currency-switcher"
            >
                {React.isValidElement(CustomButton) ? (
                    React.cloneElement(CustomButton, {
                        onClick: () => setOpen(!open),
                        icon: <ChevronDownIcon />,
                        children: <Typography className={cx('group-hover:text-primary-700')}>{`${finalDefaultCurrency}`}</Typography>,
                        iconPosition: 'right',
                        iconProps: { className: cx('text-neutral-700', 'w-[20px]', 'h-[20px]', 'group-hover:text-primary-700') },
                        classNameText: cx('!text-neutral-700'),
                    })
                ) : (
                    <Button
                        className={cx(
                            'm-2',
                            'mr-0',
                            '!px-0',
                            '!py-0',
                            'hover:shadow-none',
                            'focus:shadow-none',
                            'active:shadow-none',
                            'active:shadow-none',
                            'group',
                            'swift-currency-switcher',
                        )}
                        onClick={() => setOpen(!open)}
                        icon={<ChevronDownIcon />}
                        iconProps={{ className: cx('text-neutral-700', 'w-[20px]', 'h-[20px]', 'group-hover:text-primary-700') }}
                        iconPosition="right"
                        variant="tertiary"
                        classNameText={cx('!text-neutral-700')}
                    >
                        <Typography className={cx('group-hover:text-primary-700')}>{`${finalDefaultCurrency}`}</Typography>
                    </Button>
                )}
            </Popover>
        );
    }

    return (
        <div>
            <Skeleton width={128} className="mt-[10px]" />
        </div>
    );
};

export default ViewSwitcherCurrency;
